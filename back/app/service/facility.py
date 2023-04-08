from ..models.facility import Facility


def all():
    return Facility.objects.all()
