from ..models.solution import Solution
from django.utils.timezone import make_aware
from datetime import datetime


def create(**kwargs):
    sol = Solution.objects.create(assignee=kwargs['assignee'],
                                  deadline=make_aware(datetime.fromtimestamp(
                                      kwargs['deadline'])),
                                  description=kwargs['description'],
                                  facility_id=kwargs['facility_id'])
    sol.save()
