from django.contrib.auth.decorators import login_required
from django.http import HttpRequest, JsonResponse, HttpResponse

from ..serializers import FacilitySerializer
from ..service import facility


@login_required
def get_all(request: HttpRequest) -> JsonResponse | HttpResponse:
    if request.method != 'GET':
        return JsonResponse(
            {'success': 'false', 'message': 'unsupported method'})
    query = facility.all()
    serializer = FacilitySerializer()
    facilities = serializer.serialize(query)
    res = '{"success":"true", "facilities": ' + facilities + "}"
    return HttpResponse(res, content_type="application/json")
