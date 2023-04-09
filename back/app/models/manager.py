from django.contrib.auth.models import User
from django.db import models

from ..models.work_group import WorkGroup


class Manager(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=100)
    work_group = models.ForeignKey(WorkGroup, on_delete=models.RESTRICT,
                                   null=True)
