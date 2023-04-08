from django.db import models

from ..models.facility import Facility

TYPES = (('p', 'pictures'), ('d', 'documents'))


class Media(models.Model):
    name = models.CharField(
        max_length=1000,
        null=True
    )
    path = models.CharField(
        max_length=1000)

    type = models.CharField(
        max_length=1, choices=TYPES, default='p'
    )
    facility = models.ForeignKey(Facility, on_delete=models.CASCADE)
