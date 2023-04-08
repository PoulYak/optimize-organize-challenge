import json

from django.contrib.auth.decorators import login_required
from django.http import HttpRequest, JsonResponse
from ..service import facility
from ..utils import xslx
from ..serializers import FacilitySerializer


@login_required
def get_report(request: HttpRequest) -> JsonResponse:
    if request.method != "POST":
        return JsonResponse(
            {'success': 'false', 'message': 'Unsupported method'},
            status=403)
    facility_ids = json.loads(request.body)['facilities']
    facilities = [facility.get_by_id(id) for id in facility_ids]
    serializer = FacilitySerializer()
    report_json = '{"success":"true", "facilities": ' + serializer.serialize(
        facilities) + "}"
    path = xslx.make_report(report_json)
    return JsonResponse({'success': 'true', 'path': path})
