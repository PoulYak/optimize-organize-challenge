from django.db import models

from .assignment import Assignment
from .solution import Solution
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
    facility = models.ForeignKey(Facility, on_delete=models.CASCADE, null=True)
    solution = models.ForeignKey(Solution, on_delete=models.CASCADE, null=True)
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE,
                                   null=True)
