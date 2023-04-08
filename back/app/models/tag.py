from django.db import models
from ..models.facility import Facility

TYPES = (('b', 'boolean'), ('e', 'enum'), ('s', 'string'), ('n', 'number'),
         ('d', 'datetime'))


class Tag(models.Model):
    name = models.CharField(max_length=1000)
    type = models.CharField(max_length=1, choices=TYPES)


class Option(models.Model):
    name = models.CharField(max_length=1000)
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE)


class TagValue(models.Model):
    facility = models.ForeignKey(Facility, on_delete=models.CASCADE, null=True)
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE)
    value = models.CharField(max_length=1000, default=None, null=True)
