from django.db import models

from ..models.work_group import WorkGroup


class Facility(models.Model):
    region = models.CharField(max_length=1000)  # округ
    district = models.CharField(max_length=1000)  # район
    address = models.CharField(max_length=1000)  # адрес
    facility_type = models.CharField(max_length=1000)  # тип строения
    status = models.CharField(max_length=1000)  # состояние
    area = models.FloatField()  # площадь
    owner = models.CharField(max_length=1000)  # собственник
    fact_user = models.CharField(max_length=1000)  # фактический пользователь
    lat = models.FloatField()
    lng = models.FloatField()
    next_meeting_date = models.DateTimeField(
        null=True)  # дата следующей встречи
    work_group = models.ForeignKey(WorkGroup, on_delete=models.RESTRICT,
                                   default=None,
                                   null=True)

    @property
    def obj_status(self):
        assignments = self.assignment_set.all()
        if len(assignments) == 0:
            return 'n'
        if any([i.status == 'd' for i in assignments]):
            return 'd'
        if all([i.status == 'c' for i in assignments]):
            return 'c'
        return 'w'
