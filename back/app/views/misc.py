import json

from django.contrib.auth.decorators import login_required
from django.http import HttpRequest, JsonResponse
from ..service import facility
from ..utils import xslx, xml
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


@login_required
def create_from_xml(request: HttpRequest) -> JsonResponse:
    if request.method != "POST":
        return JsonResponse(
            {'success': 'false', 'message': 'Unsupported method'},
            status=403)
    data = request.body
    xml.create_facilities_from_xml(data)
    return JsonResponse(
        {'success': 'true', 'message': 'objects created successfully'})


@login_required
def get_metrics(request: HttpRequest) -> JsonResponse:
    if request.method != "GET":
        return JsonResponse(
            {'success': 'true', 'message': 'unsupported method'})
    from ..utils.metrics import create_chart
    serializer = FacilitySerializer()
    s = serializer.serialize(facility.all())
    create_chart(json.loads('{"facilities" :' + s + "}"))
    return JsonResponse(
        {'success': 'true', 'message': 'metrics created successfully'})
