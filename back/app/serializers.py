from datetime import datetime
from django.core.serializers.json import Serializer

from .models.tag import Tag
from .models.manager import Manager
from .models.facility import Facility


class ManagerSerializer(Serializer):
    def get_dump_object(self, obj: Manager):
        mapped_object = {
            'email': obj.user.username,
            'role': obj.role,
        }
        return mapped_object


class TagSerializer(Serializer):
    def get_dump_object(self, obj: Tag):
        mapped_object = {
            'id': obj.id,
            'name': obj.name,
            'type': obj.type,

        }

        if obj.type == 'e':
            options = obj.option_set.all()
            mapped_object.update(
                {'options': [option.name for option in options]})

        return mapped_object


class FacilitySerializer(Serializer):
    def get_dump_object(self, obj: Facility):
        mapped_object = {
            'region': obj.region,
            'district': obj.district,
            'address': obj.address,
            'facility_type': obj.facility_type,
            'status': obj.status,
            'area': obj.area,
            'owner': obj.owner,
            'fact_user ': obj.fact_user
            # добавить медиа
        }
        tags = []
        tag_serializer = TagSerializer()
        for tag_value in obj.tagvalue_set.all():
            tag = tag_value.tag
            tag_dto = tag_serializer.get_dump_object(tag)
            tag_dto.update({'value': tag_value.value})
            if tag_value.value is None:
                tags.append(tag_dto)
                continue

            match tag.type:
                case 'n':
                    mapped_object.update({'value': float(tag_value.value)})
                case 'b':
                    value = True
                    falsish_values = ['false', False, 'False', '', 'FALSE', '0',
                                      0,
                                      None]
                    if tag_value.value in falsish_values:
                        value = False
                    mapped_object.update({'value': value})
                case 'd':
                    date, time = tag_value.value.split()
                    d, m, y = date.split(".")
                    hours, mins, secs = time.split(":")
                    dt = datetime(int(y), int(m), int(d), int(hours), int(mins))
                    mapped_object.update({'value': dt.timestamp()})
            tags.append(tag_dto)
        mapped_object.update({'tags': tags})
        return mapped_object
