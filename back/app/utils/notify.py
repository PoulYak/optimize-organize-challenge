import json
import sched

import pandas as pd
import datetime

from .mail import send_event_created, send_event_reminder
from ..service.facility import get_by_id, update_by_id, all
from ..serializers import FacilitySerializer


def load_emails(data):
    rg_mails = {}
    for i in data['facilities']:
        facility = get_by_id(i['id'])
        emails = [mng.user.username for mng in
                  facility.work_group.manager_set.all()]
        rg_mails.update({facility.work_group.name: emails})
    return rg_mails


# TODO: скедул, который должен вызывать это
def event_scheduler(data):
    dataset = {"facility_type": [], "status": [], "obj_status": [],
               "have_solutions": [], "work_group": [], "id": [],
               "address": []}
    for i in data["facilities"]:
        if (i["next_meeting_date"] is not None) and float(
                i["next_meeting_date"]) < datetime.datetime.timestamp(
            datetime.datetime.now()
        ):
            dataset["facility_type"].append(i["facility_type"])
            dataset["status"].append(i["status"])
            dataset["obj_status"].append(i["obj_status"])
            dataset["id"].append(i["id"])
            dataset["address"].append(i["address"])
            dataset["have_solutions"].append(int(len(i[
                                                         "solutions"]) != 0))  # членим объекты на те, у которых нет решений
            dataset["work_group"].append(i["work_group"])
    df = pd.DataFrame(dataset)
    temp_df = df.groupby(["work_group", "facility_type"])["status"].agg("count")
    events = []
    for w_g, fac_type in temp_df[temp_df >= 10].index:
        events.append([list(i) for i in list(
            df[(df["work_group"] == w_g) & (df["facility_type"] == fac_type)][
                ["id", "address", "work_group"]].values)])

    # множество объектов, у которых назначена встреча
    set_of_ids = set()
    for event in events:
        for j in event:
            set_of_ids.add(j[0])

    time_of_meeting = datetime.datetime.now() + datetime.timedelta(days=10)
    time_of_remind = datetime.datetime.now() + datetime.timedelta(days=8)

    for i in range(
            len(data["facilities"])):  # обновляю  next meeting date в data
        if data["facilities"][i]["id"] in set_of_ids:
            # data["facilities"][i]["next_meeting_date"] = str(
            # апплайнуть в датабазу
            #   datetime.datetime.timestamp(time_of_meeting))
            update_by_id(data["facilities"][i]["id"],
                         next_meeting_date=datetime.datetime.timestamp(
                             time_of_meeting))

    time_of_meeting_str = ".".join(str(time_of_meeting.date()).split("-")[::-1])
    rg_mails = load_emails(data)
    for event in events:
        text = ", ".join([i[1] for i in event])
        for person in rg_mails[event[0][-1]]:
            send_event_created(person, time_of_meeting_str, text)

    time_of_remind = datetime.datetime.timestamp(
        time_of_remind)  # запускать в это время

    scheduler = sched.scheduler()

    for event in events:
        text = ", ".join([i[1] for i in event])
        for person in rg_mails[event[0][-1]]:
            # send_event_reminder(person, time_of_meeting_str, text)
            scheduler.enter(
                time_of_remind - datetime.datetime.now().timestamp(), 1,
                send_event_reminder,
                argument=(person, time_of_meeting_str, text))
    scheduler.run()


def notify():
    facilities = all()
    serializer = FacilitySerializer()
    event_scheduler(
        json.loads('{"facilities":' + serializer.serialize(facilities) + '}'))
