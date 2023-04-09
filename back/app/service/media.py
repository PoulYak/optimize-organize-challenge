import base64
import uuid

from django.conf import settings

from ..models.media import Media
from django.utils.timezone import make_aware
from datetime import datetime


def create_from_bytes(**kwargs):
    uid = str(uuid.uuid4())
    ext = '.' + kwargs['name'].split('.')[-1]
    img_path = str((settings.MEDIA_ROOT / uid)) + ext
    with open(img_path, "wb+") as fh:
        fh.write(base64.decodebytes(kwargs['content'].encode()))
    img_path = f'/media/{uid + ext}'
    file_obj = Media.objects.create(name=file['name'],
                                    type=file['type'],
                                    path=img_path,
                                    facility=facility)
    file_obj.save()
