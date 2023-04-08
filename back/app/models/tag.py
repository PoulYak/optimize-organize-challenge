from django.db import models

TYPES = (('b', 'boolean'), ('e', 'enum'), ('s', 'string'), ('n', 'number'),
         ('d', 'datetime'))


class Tag(models.Model):
    name = models.CharField(max_length=1000)
    type = models.CharField(max_length=1, choices=TYPES)
    value = models.CharField(max_length=1000, default=None, null=True)


class Option(models.Model):
    name = models.CharField(max_length=1000)
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE)
