import {Tag, TagType, TagValue} from "./TagTypes";

export const tagNames: {[key: number]: string} = {
    [-1]: "region",
    [-2]: "district",
    [-3]: "address",
    [-4]: "facility_type",
    [-5]: "status",
    [-6]: "area",
    [-7]: "owner",
    [-8]: "fact_user",
}

const tags: Tag[] = [
    {
        id: -1,
        name: "Регион",
        type: TagType.Enum,
        required: true,
        options: [
            "ЦАО",
            "САО",
            "СВАО",
            "ВАО",
            "ЮВАО",
            "ЮАО",
            "ЮЗАО",
            "ЗАО",
            "СЗАО",
        ]
    },
    {
        id: -2,
        name: "Район",
        type: TagType.Enum,
        required: true,
        options: [
            "Тропарево-Никулино",
            "Биберево",
            "Зюзино",
            "Коптево",
            "Ново-Переделкино",
            "Медведково",
            "Чертаново"
        ]
    },
    {
        id: -3,
        name: "Адресс",
        type: TagType.String,
        required: true
    },
    {
        id: -4,
        name: "Тип Объекта",
        type: TagType.Enum,
        required: true,
        options: [
            "Жилая",
            "Коммерческая",
            "Незаконные строения",
            "Технические сооружения",
            "Прочее",
        ]
    },
    {
        id: -5,
        name: "Состояние",
        type: TagType.Enum,
        required: true,
        options: [
            "Идеальное",
            "Обладает признаками СС",
            "Разрушено"
        ]
    },
    {
        id: -6,
        name: "Площадь",
        type: TagType.Number,
        required: true
    },
    {
        id: -7,
        name: "Собственник",
        type: TagType.String,
        required: true
    },
    {
        id: -8,
        name: "Фактический Пользователь",
        type: TagType.String,
        required: true
    },
]

export default tags