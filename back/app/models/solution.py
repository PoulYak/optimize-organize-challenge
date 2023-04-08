from django.db import models

from ..models.facility import Facility


class Solution(models.Model):
    assignee = models.CharField(max_length=1000, null=True)
    deadline = models.DateTimeField(null=True)
    description = models.CharField(max_length=10_000, null=True)
    facility = models.ForeignKey(Facility, on_delete=models.CASCADE)
