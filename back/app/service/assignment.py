from datetime import datetime

from django.utils.timezone import make_aware

from ..models.assignment import Assignment


def create(**kwargs):
    asg = Assignment.objects.create(
        assignee=kwargs['assignee'],
        deadline=make_aware(datetime.fromtimestamp(
            kwargs['deadline'])),
        description=kwargs['description'],
        facility_id=kwargs['facility_id'])
    asg.save()
