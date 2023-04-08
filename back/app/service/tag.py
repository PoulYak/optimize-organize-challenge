from django.db.models import QuerySet

from ..models.tag import Tag, TagValue, Option


def all() -> QuerySet:
    return Tag.objects.all()


def create(**kwargs):
    tag = Tag.objects.create(name=kwargs['name'], type=kwargs['type'],
                             required=kwargs['required'])
    tag.save()
    if kwargs['type'] != 'e':
        return
    for option in kwargs['options']:
        enum_option = Option.objects.create(name=option, tag=tag)
        enum_option.save()
