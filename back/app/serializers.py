from django.core.serializers.json import Serializer


class ManagerSerializer(Serializer):
    def get_dump_object(self, obj):
        mapped_object = {
            'email': obj.user.username,
            'role': obj.role,
        }
        return mapped_object
