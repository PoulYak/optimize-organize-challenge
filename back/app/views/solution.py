import json

from django.http import HttpRequest, JsonResponse, HttpResponse

from ..service import solution
from django.views.generic import View
from django.contrib.auth.mixins import LoginRequiredMixin


class SolutionView(LoginRequiredMixin, View):
    def get(self, request: HttpRequest, *args,
            **kwargs) -> JsonResponse | HttpResponse:
        return JsonResponse(
            {'success': 'false', 'message': 'unsupported method'}, status=403)

    def post(self, request: HttpRequest, *args, **kwargs) -> JsonResponse:
        body = json.loads(request.body)
        solution.create(**body)
        return JsonResponse(
            {'success': 'true', 'message': 'solution created'})

    def head(self, request, *args, **kwargs):
        return JsonResponse(
            {'success': 'false', 'message': 'unsupported method'}, status=403)

    def put(self, request, *args, **kwargs):
        return JsonResponse(
            {'success': 'false', 'message': 'unsupported method'}, status=403)
