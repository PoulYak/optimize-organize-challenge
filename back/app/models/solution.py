from django.db import models

from ..models.facility import Facility


class Solution(models.Model):
    assignee = models.CharField(max_length=1000)
    deadline = models.DateTimeField()
    description = models.CharField(max_length=10_000)
    facility = models.ForeignKey(Facility, on_delete=models.CASCADE)
