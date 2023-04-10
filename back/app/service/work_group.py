from ..models.work_group import WorkGroup


def all():
    return WorkGroup.objects.all()


def create(**kwargs):
    wg = WorkGroup.objects.create(**kwargs)
    wg.save()


def get_by_name(name: str):
    wg = WorkGroup.objects.filter(name=name).first()
    return wg
