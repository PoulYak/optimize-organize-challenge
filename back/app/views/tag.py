from django.http import HttpRequest, JsonResponse
from django.contrib.auth.decorators import login_required
from ..service import tag
from ..serializers import TagSerializer


@login_required
def get_all(request: HttpRequest) -> JsonResponse:
    if request.method != 'GET':
        return JsonResponse(
            {'success': 'false', 'message': 'unsupported method'})
    query = tag.all()
    serializer = TagSerializer()
    tags = serializer.serialize(query)
    return JsonResponse({'success': 'true', 'tags': tags})
