import json
import uuid

import xlsxwriter
import datetime
from django.conf import settings
from ..service.facility import get_by_id


def make_fst_line(ws, type_ws):
    ws.write(0, 0, "Id объекта")
    ws.write(0, 1, "Регион")
    ws.write(0, 2, "Улица")
    ws.write(0, 3, "Адрес")
    ws.write(0, 4, "Тип здания")
    ws.write(0, 5, "Статус")
    ws.write(0, 6, "Площадь")
    ws.write(0, 7, "Владелец")
    ws.write(0, 8, "Пользователь")
    ws.write(0, 9, "Теги")
    if type_ws:
        ws.write(0, 10, "Назначенные работники")
        ws.write(0, 11, "Срок")


def make_i_line(ws, type_ws, list_args, ws_cou, dl):
    ws.write(ws_cou, 0, list_args['id'])
    ws.write(ws_cou, 1, list_args["region"])
    ws.write(ws_cou, 2, list_args["district"])
    ws.write(ws_cou, 3, list_args["address"])
    ws.write(ws_cou, 4, list_args["facility_type"])
    ws.write(ws_cou, 5, list_args["status"])
    ws.write(ws_cou, 6, list_args["area"])
    ws.write(ws_cou, 7, list_args["owner"])
    ws.write(ws_cou, 8, list_args["fact_user"])
    tags = ""
    for aaa in list_args["tags"]:
        tags += str(aaa["name"]) + ": " + str(aaa["value"]) + "; "
    tags = tags[:-2]
    ws.write(ws_cou, 9, tags)
    if type_ws:
        names = ""
        for aaa in list_args["solutions"]:
            names += aaa["assignee"] + ", "
        names = names[:-2]
        ws.write(ws_cou, 10, names)
        ws.write(ws_cou, 11, dl)


def make_report(facilities):
    reports_json = json.loads(facilities)
    uid = uuid.uuid4()
    img_path = str((settings.MEDIA_ROOT / str(uid))) + ".xlsx"
    workbook = xlsxwriter.Workbook(img_path)
    ns = workbook.add_worksheet("ПРОЕКТЫ БЕЗ ПОРУЧЕНИЙ")
    st = workbook.add_worksheet("ПРОЕКТЫ В РАБОТЕ")
    fn = workbook.add_worksheet("ПРОСРОЧЕННЫЕ ПРОЕКТЫ")
    cou_ns = 0
    cou_st = 0
    cou_fn = 0
    make_fst_line(ns, 0)
    make_fst_line(st, 1)
    make_fst_line(fn, 1)
    for i in range(len(reports_json["facilities"])):
        facil = get_by_id(reports_json['facilities'][i]['id'])
        obj_status = facil.obj_status
        if obj_status == 'n':
            cou_ns += 1
            make_i_line(ns, 0, reports_json["facilities"][i], cou_ns, 0)
        elif obj_status == 'd':
            for j in facil.assignment_set.all():
                if j.status == 'd':
                    deadline = j.deadline.timestamp()
                    break
            cou_fn += 1
            make_i_line(fn, 1, reports_json["facilities"][i], cou_fn,
                        str(datetime.datetime.fromtimestamp(deadline)))
        elif obj_status == 'w':
            cou_st += 1
            make_i_line(st, 1, reports_json["facilities"][i], cou_st,
                        str(datetime.datetime.fromtimestamp(
                            facil.assignment_set.first().deadline.timestamp())))
    workbook.close()
    img_path = '/media/' + str(uid) + '.xlsx'
    return img_path
