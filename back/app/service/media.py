import base64
import uuid

from django.conf import settings

from ..models.media import Media


def create(**kwargs):
    uid = str(uuid.uuid4())
    kwargs.update({'facility_id': kwargs.get('facility_id', None)})
    kwargs.update({'assignment_id': kwargs.get('assignment_id', None)})
    kwargs.update({'solution_id': kwargs.get('solution_id', None)})

    ext = '.' + kwargs['name'].split('.')[-1]
    img_path = str((settings.MEDIA_ROOT / uid)) + ext
    with open(img_path, "wb+") as fh:
        fh.write(base64.decodebytes(kwargs['content'].encode()))
    img_path = f'/media/{uid + ext}'
    file_obj = Media.objects.create(name=kwargs['name'],
                                    type=kwargs['type'],
                                    path=img_path,
                                    facility_id=kwargs['facility_id'],
                                    assignment_id=kwargs['assignment_id'],
                                    solution_id=kwargs['solution']

                                    )
    file_obj.save()
