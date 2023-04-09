from django.db import models

from .facility import Facility
from .manager import Manager

STATUS = (
    ('с', 'закрыт'),
    ('w', 'в работе'),
    ('d', 'просрочен')
)


class Assignment(models.Model):
    status = models.CharField(max_length=1, choices=STATUS, default='w')
    deadline = models.DateTimeField(null=True)
    assignee = models.CharField(max_length=150)
    description = models.CharField(max_length=2000)
    facility = models.ForeignKey(Facility, on_delete=models.RESTRICT)
    # media
