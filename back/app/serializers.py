from datetime import datetime
from django.core.serializers.json import Serializer

from .models.tag import Tag


class ManagerSerializer(Serializer):
    def get_dump_object(self, obj):
        mapped_object = {
            'email': obj.user.username,
            'role': obj.role,
        }
        return mapped_object


class TagSerializer(Serializer):
    def get_dump_object(self, obj: Tag):
        mapped_object = {
            'name': obj.name,
            'type': obj.type
        }
        mapped_object.update({'value': obj.value})
        if obj.type == 'e':
            options = obj.option_set.all()
            mapped_object.update(
                {'options': [option.name for option in options]})

        if obj.value is None:
            return mapped_object

        match obj.type:
            case 'n':
                mapped_object.update({'value': float(obj.value)})
            case 'b':
                value = True
                falsish_values = ['false', False, 'False', '', 'FALSE', '0', 0,
                                  None]
                if obj.value in falsish_values:
                    value = False
                mapped_object.update({'value': value})
            case 'd':
                date, time = obj.value.split()
                d, m, y = date.split(".")
                hours, mins, secs = time.split(":")
                dt = datetime(int(y), int(m), int(d), int(hours), int(mins))
                mapped_object.update({'value': dt.timestamp()})
        return mapped_object
