from django.db import models

from ..models.facility import Facility


class Media(models.Model):
    path = models.CharField(
        max_length=1000)
    facility = models.ForeignKey(Facility, on_delete=models.CASCADE)
