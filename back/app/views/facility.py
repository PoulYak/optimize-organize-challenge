import json

from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpRequest, JsonResponse, HttpResponse
from django.views import View

from ..serializers import FacilitySerializer
from ..service import facility


class FacilityView(LoginRequiredMixin, View):
    def get(self, request: HttpRequest, *args, **kwargs) -> HttpResponse:
        query = facility.all()
        serializer = FacilitySerializer()
        facilities = serializer.serialize(query)
        res = '{"success":"true", "facilities": ' + facilities + "}"
        return HttpResponse(res, content_type="application/json")

    # TODO: media files
    def post(self, request: HttpRequest, *args, **kwargs) -> JsonResponse:
        body = json.loads(request.body)
        facility.create(**body)
        return JsonResponse(
            {'success': 'true', 'message': 'facility created'})

    def head(self, request, *args, **kwargs):
        return JsonResponse(
            {'success': 'false', 'message': 'unsupported method'},status=403)

    def put(self, request, *args, **kwargs):
        return JsonResponse(
            {'success': 'false', 'message': 'unsupported method'},status=403)
