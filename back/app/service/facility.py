import base64
import uuid

from ..models.facility import Facility
from ..models.media import Media
from ..models.tag import TagValue
from django.conf import settings


def all():
    return Facility.objects.all()


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
    )
    facility.save()
    for tag_value in kwargs['tags']:
        tag_value_obj = TagValue.objects.create(tag_id=tag_value['id'],
                                                value=tag_value['value'],
                                                facility=facility)
        tag_value_obj.save()
    for file in kwargs['media']:
        uid = str(uuid.uuid4())
        ext = '.' + file['name'].split('.')[-1]
        img_path = str((settings.STATICFILES_DIRS[0] / uid)) + ext
        with open(img_path, "wb+") as fh:
            fh.write(base64.decodebytes(file['content'].encode()))
        file_obj = Media.objects.create(name=file['name'],
                                        type=file['type'],
                                        path=img_path,
                                        facility=facility)
        file_obj.save()
