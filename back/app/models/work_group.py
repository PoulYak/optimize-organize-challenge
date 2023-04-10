from django.db import models


class WorkGroup(models.Model):
    name = models.CharField(max_length=1000, unique=True)
