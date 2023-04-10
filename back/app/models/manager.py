from django.contrib.auth.models import User
from django.db import models

from ..models.work_group import WorkGroup

ROLES = (('a', 'admin'), ('b', 'user'))


class Manager(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=1, choices=ROLES)
    work_group = models.ForeignKey(WorkGroup, on_delete=models.RESTRICT,
                                   null=False)
    name = models.CharField(max_length=250)
