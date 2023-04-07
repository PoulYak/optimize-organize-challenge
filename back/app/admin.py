from django.contrib import admin

from .models.manager import Manager
from .models.facility import Facility
from .models.solution import Solution

admin.site.register(Manager)
admin.site.register(Facility)
admin.site.register(Solution)
