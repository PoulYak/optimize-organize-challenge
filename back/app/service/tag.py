from ..models.tag import Tag


def all():
    return Tag.objects.all()
