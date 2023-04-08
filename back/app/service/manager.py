from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist


def get(username: str):
    try:
        user = User.objects.get(username=username)
    except ObjectDoesNotExist:
        return None
    return user.manager
