import json

from django.http import HttpRequest, JsonResponse, HttpResponse

from ..service import assignment
from ..utils.metrics import load_chart
from ..utils.notify import notify
from django.views.generic import View
from django.contrib.auth.mixins import LoginRequiredMixin


class AssignmentView(LoginRequiredMixin, View):
    def get(self, request: HttpRequest, *args,
            **kwargs) -> JsonResponse | HttpResponse:
        return JsonResponse(
            {'success': 'false', 'message': 'unsupported method'}, status=403)

    def post(self, request: HttpRequest, *args, **kwargs) -> JsonResponse:
        body = json.loads(request.body)
        assignment.create(**body)
        notify()
        load_chart()
        return JsonResponse(
            {'success': 'true', 'message': 'assignment created'})

    def head(self, request, *args, **kwargs):
        return JsonResponse(
            {'success': 'false', 'message': 'unsupported method'}, status=403)

    def put(self, request, *args, **kwargs):
        return JsonResponse(
            {'success': 'false', 'message': 'unsupported method'}, status=403)
