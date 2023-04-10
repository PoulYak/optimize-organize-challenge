import json

from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpRequest, JsonResponse, HttpResponse
from django.views import View

from ..serializers import FacilitySerializer
from ..service import facility
from ..utils.metrics import load_chart
from ..utils.notify import notify


class FacilityListView(LoginRequiredMixin, View):
    def get(self, request: HttpRequest, *args, **kwargs) -> HttpResponse:
        query = facility.get_accessible(request.user)
        serializer = FacilitySerializer()
        facilities = serializer.serialize(query)
        res = '{"success":"true", "facilities": ' + facilities + "}"
        return HttpResponse(res, content_type="application/json")

    def post(self, request: HttpRequest, *args, **kwargs) -> JsonResponse:
        body = json.loads(request.body)
        facility.create(**body)
        notify()
        load_chart()
        return JsonResponse(
            {'success': 'true', 'message': 'facility created'})

    def head(self, request, *args, **kwargs):
        return JsonResponse(
            {'success': 'false', 'message': 'unsupported method'}, status=403)

    def put(self, request, *args, **kwargs):
        return JsonResponse(
            {'success': 'false', 'message': 'unsupported method'}, status=403)


class FacilityView(LoginRequiredMixin, View):
    def get(self, request: HttpRequest, *args, **kwargs) -> HttpResponse:
        return JsonResponse({"success": 'false', 'message': 'forbidden'},
                            status=403)

    def post(self, request: HttpRequest, *args, **kwargs) -> JsonResponse:
        return JsonResponse(
            {'success': 'false', 'message': 'forbidden'}, status=403)

    def head(self, request, *args, **kwargs):
        return JsonResponse(
            {'success': 'false', 'message': 'unsupported method'}, status=403)

    def put(self, request: HttpRequest, id: int):
        data = json.loads(request.body)
        facility.update_by_id(id, **data)
        return JsonResponse(
            {'success': 'true', 'message': 'updated successfully'})
