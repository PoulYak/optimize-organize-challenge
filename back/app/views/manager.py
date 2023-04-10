import json

from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpRequest, JsonResponse, HttpResponse
from django.views import View
from ..service import manager


class ManagerListView(LoginRequiredMixin, View):
    def get(self, request: HttpRequest, *args,
            **kwargs) -> JsonResponse | HttpResponse:
        return JsonResponse(
            {'success': 'false', 'message': 'unsupported method'}, status=403)

    def post(self, request: HttpRequest, *args, **kwargs) -> JsonResponse:
        user = json.loads(request.body)
        if request.user.manager.role != "a":
            return JsonResponse(
                {"success": "false", "message": "forbidden"}, status=403
            )
        manager.create(**user)
        return JsonResponse(
            {'success': 'true', 'message': 'user created'})

    def head(self, request, *args, **kwargs):
        return JsonResponse(
            {'success': 'false', 'message': 'unsupported method'}, status=403)

    def put(self, request, *args, **kwargs):
        return JsonResponse(
            {'success': 'false', 'message': 'unsupported method'}, status=403)
