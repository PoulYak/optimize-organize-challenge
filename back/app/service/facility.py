from datetime import datetime

from django.contrib.auth.models import User
from django.utils.timezone import make_aware

from ..models.facility import Facility
from ..models.tag import TagValue
from ..service import media
from ..service import work_group


def all():
    return Facility.objects.all()


def get_by_id(id: int):
    return Facility.objects.get(id=id)


def create(**kwargs):
    facility = Facility.objects.create(
        region=kwargs['region'],
        district=kwargs['district'],
        address=kwargs['address'],
        facility_type=kwargs['facility_type'],
        status=kwargs['status'],
        area=kwargs['area'],
        owner=kwargs['owner'],
        fact_user=kwargs['fact_user'],
        lat=kwargs['lat'],
        lng=kwargs['lng'],
        work_group=work_group.get_by_name(kwargs['work_group'])
    )
    facility.save()
    for tag_value in kwargs['tags']:
        tag_id = tag_value['id']
        if type(tag_id) == str:
            tag_id = int(tag_id)
        tag_value_obj = TagValue.objects.create(tag_id=tag_id,
                                                value=tag_value['value'],
                                                facility=facility)
        tag_value_obj.save()
    for file in kwargs['media']:
        media.create(facility_id=facility.id, **file)


def update_by_id(id: int, **kwargs):
    facility = Facility.objects.get(id=id)
    for arg in kwargs:
        if arg == 'next_meeting_date':
            facility.next_meeting_date = make_aware(datetime.fromtimestamp(
                kwargs[arg]))

        setattr(facility, arg, kwargs[arg])
    facility.save()


def get_accessible(user: User):
    if user.manager.role == "a":
        return all()
    facilities = Facility.objects.all().filter(
        work_group=user.manager.work_group)
    return facilities
