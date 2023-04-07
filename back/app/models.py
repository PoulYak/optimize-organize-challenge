from django.contrib.auth.models import User
from django.db import models


class Facility(models.Model):
    region = models.CharField(max_length=1000)  # округ
    district = models.CharField(max_length=1000)  # район
    address = models.CharField(max_length=1000)  # адрес
    facility_type = models.CharField(max_length=1000)  # тип строения
    status = models.CharField(max_length=1000)  # состояние
    area = models.FloatField()  # площадь
    owner = models.CharField(max_length=1000)  # собственник
    fact_user = models.CharField(max_length=1000)  # фактический пользователь
    media = models.CharField(
        max_length=1000)  # путь к картинке(???), будет локальный пока что
    # возможно нужны будут пермишены


class Solution(models.Model):
    facility = models.ForeignKey(Facility, on_delete=models.CASCADE)


class Manager(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=100)
