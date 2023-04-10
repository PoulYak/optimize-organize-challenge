from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist

from ..models.manager import Manager
from .work_group import get_by_name


def get(username: str):
    try:
        user = User.objects.get(username=username)
    except ObjectDoesNotExist:
        return None
    return user.manager


def create(**kwargs):
    us = User.objects.create_user(username=kwargs['email'],
                                  password=kwargs['password'])
    us.save()
    mng = Manager.objects.create(user=us,
                                 name=kwargs['name'],
                                 work_group=get_by_name(kwargs['work_group']),
                                 role=kwargs['role'])
    mng.save()
    return mng
