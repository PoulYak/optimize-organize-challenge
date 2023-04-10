import json

from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpRequest, JsonResponse
from django.views import View
from ..service import work_group


class WorkGroupListView(LoginRequiredMixin, View):
    def get(self, request: HttpRequest, *args,
            **kwargs) -> JsonResponse:
        return JsonResponse(
            {'success': 'true',
             'work_groups': list(work_group.all().values('name'))})

    def post(self, request: HttpRequest, *args, **kwargs) -> JsonResponse:
        data = json.loads(request.body)['work_group']
        work_group.create(**data)
        return JsonResponse(
            {'success': 'true',
             'message': 'work group created'})

    def head(self, request, *args, **kwargs):
        return JsonResponse(
            {'success': 'false', 'message': 'unsupported method'}, status=403)

    def put(self, request, *args, **kwargs):
        return JsonResponse(
            {'success': 'false', 'message': 'unsupported method'}, status=403)
