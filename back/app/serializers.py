from datetime import datetime
from django.core.serializers.json import Serializer
from django.forms import model_to_dict

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
            'required': obj.required,
        }

        if obj.type == 'e':
            options = obj.option_set.all()
            mapped_object.update(
                {'options': [option.name for option in options]})

        return mapped_object


class FacilitySerializer(Serializer):
    def get_dump_object(self, obj: Facility):
        mapped_object = {
            'id': obj.id,
            'region': obj.region,
            'district': obj.district,
            'address': obj.address,
            'facility_type': obj.facility_type,
            'status': obj.status,
            'area': obj.area,
            'owner': obj.owner,
            'fact_user ': obj.fact_user,
            'lat': obj.lat,
            'lng': obj.lng,
            'media': [],
            'obj_status': obj.obj_status,
            'work_group': None,
        }
        if obj.next_meeting_date is not None:
            mapped_object.update(
                {'next_meeting_date': obj.next_meeting_date.timestamp()})
        if obj.work_group is not None:
            mapped_object.update({'work_group': obj.work_group.name})
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
                    tag_dto.update({'value': float(tag_value.value)})
                case 'b':
                    value = True
                    falsish_values = ['false', False, 'False', '', 'FALSE', '0',
                                      0,
                                      None]
                    if tag_value.value in falsish_values:
                        value = False
                    tag_dto.update({'value': value})
                case 'd':
                    date, time = tag_value.value.split()
                    d, m, y = date.split(".")
                    hours, mins, secs = time.split(":")
                    dt = datetime(int(y), int(m), int(d), int(hours), int(mins))
                    tag_dto.update({'value': dt.timestamp()})
            tags.append(tag_dto)
        mapped_object.update({'tags': tags})
        sols = []
        asgs = []
        for sol in obj.solution_set.all():
            sol_dto = model_to_dict(sol)
            sol_dto.pop('facility')
            sol_dto.update({'deadline': sol_dto.get('deadline').timestamp()})
            sols.append(sol_dto)
        mapped_object.update({'solutions': sols})
        for asg in obj.assignment_set.all():
            asg_dto = model_to_dict(asg)
            asg_dto.pop('facility')
            asg_dto.update({'deadline': asg_dto.get('deadline').timestamp()})
            asg_dto['assignee'] = asg.assignee
            asgs.append(asg_dto)
        mapped_object.update({'assignments': asgs})
        for media in obj.media_set.all():
            mapped_object['media'].append(
                {'path': media.path, 'name': media.name, 'type': media.type})
        return mapped_object
