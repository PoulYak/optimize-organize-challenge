import base64
import uuid
from datetime import datetime

from django.utils.timezone import make_aware

from ..models.facility import Facility
from ..models.media import Media
from ..models.tag import TagValue
from django.conf import settings


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
        uid = str(uuid.uuid4())
        ext = '.' + file['name'].split('.')[-1]
        img_path = str((settings.MEDIA_ROOT / uid)) + ext
        with open(img_path, "wb+") as fh:
            fh.write(base64.decodebytes(file['content'].encode()))
        img_path = f'/media/{uid + ext}'
        file_obj = Media.objects.create(name=file['name'],
                                        type=file['type'],
                                        path=img_path,
                                        facility=facility)
        file_obj.save()


def update_by_id(id: int, **kwargs):
    facility = Facility.objects.get(id=id)
    for arg in kwargs:
        if arg == 'next_meeting_date':
            facility.next_meeting_date = make_aware(datetime.fromtimestamp(
                kwargs[arg]))

        setattr(facility, arg, kwargs[arg])
    facility.save()
