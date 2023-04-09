import base64
import uuid

from django.conf import settings

from ..models.media import Media
from django.utils.timezone import make_aware
from datetime import datetime


def create_from_bytes(**kwargs):
    ext = kwargs['name'].split('.')[-1]
    uid = str(uuid.uuid4())
    img_path = str((settings.MEDIA_ROOT / uid)) + "." + ext
    with open(img_path, "wb+") as fh:
        fh.write(kwargs['bin_data'])
    Media.objects.create(name=kwargs['name'],
                         id=kwargs['id'],
                         )
    file_obj.save()
