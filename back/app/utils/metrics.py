import json

import seaborn as sns
import pandas as pd
import matplotlib.pyplot as plt
import datetime
from django.conf import settings

from ..serializers import FacilitySerializer
from ..service import facility


def create_chart(data_js):
    dataset = {"facility_type": [],
               "obj_status": []}
    for i in data_js["facilities"]:  # loop in object
        dataset["facility_type"].append(i["facility_type"])
        dataset["obj_status"].append(i["obj_status"])

    data = pd.DataFrame(dataset)
    temp_data = data[data["obj_status"] == "w"].groupby("facility_type").agg(
        "count")

    plt.figure(figsize=(4, 12))
    data_color = temp_data.sort_values(by="obj_status")
    plt.subplot(3, 1, 1)
    data_color["colors"] = sns.color_palette('light:#5A9')[1:len(temp_data) + 1]
    h = plt.barh([str(i) for i in range(0, len(temp_data))][::-1],
                 temp_data["obj_status"][::-1],
                 color=data_color.sort_index()["colors"][::-1])
    plt.legend(h, list(temp_data.index.values), loc="upper right")
    plt.xlabel("Количество объектов")
    plt.title(
        "Объекты недвижимости в работе")  # График распределения типов объектов недвижимости: этот график позволит визуализировать количество объектов недвижимости, находящихся под контролем инспекции, по типам (например, жилые дома, коммерческие здания, земельные участки и т.д.).

    #############################
    plt.subplot(3, 1, 2)
    temp_data = data.groupby("obj_status").agg("count")
    temp_data = temp_data.merge(
        pd.DataFrame({"obj_status": ["n", "w", "c", "d"]}), how="outer",
        on="obj_status").fillna(0)

    temp_data["obj_status"] = temp_data["obj_status"].replace(
        {"n": "новые", "c": "завершено", "w": "в работе", "d": "просрочено"})
    temp_data = temp_data.sort_values("obj_status")
    temp_data["color"] = sns.color_palette('light:#5A9')[1:4] + ["red"]

    # print(temp_data)

    plt.pie(temp_data["facility_type"].values, colors=temp_data['color'],
            autopct='%1.1f%%')
    plt.legend(temp_data["obj_status"], loc="upper right")
    #############################
    plt.subplot(3, 1, 3)

    current_month = datetime.datetime.now().month
    dataset = {"status": [], "date": []}

    for i in data_js["facilities"]:
        for j in i["assignments"]:
            dt = datetime.datetime.fromtimestamp(int(float(j["deadline"])))
            if current_month == dt.month:
                dataset["status"].append(j["status"])
                dataset["date"].append(dt.day)
    data = pd.DataFrame(dataset)
    data = data[(data["status"] == "w") | (data["status"] == "d")]
    data = data.merge(pd.DataFrame({"date": list(range(1, 32, 3))}),
                      how="outer", on="date")
    sns.countplot(data=data, x="date", hue="status", palette=['#8ecaac', "red"])
    plt.title("Состояние объектов на текущий месяц")
    plt.legend(["Выполнено", "Просрочено"], loc="upper right")
    path_to_image = str(settings.MEDIA_ROOT / "chart.png")
    plt.savefig(path_to_image, facecolor="#f8f9fd")
    image = plt.imread(path_to_image)
    image = image[100:-100, :, :]
    plt.imsave(path_to_image, image)
    return path_to_image


def load_chart():
    serializer = FacilitySerializer()
    s = serializer.serialize(facility.all())
    create_chart(json.loads('{"facilities" :' + s + "}"))
