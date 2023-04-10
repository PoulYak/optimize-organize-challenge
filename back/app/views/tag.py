import json

from django.http import HttpRequest, JsonResponse, HttpResponse
from ..service import tag
from ..serializers import TagSerializer

from django.views.generic import View
from django.contrib.auth.mixins import LoginRequiredMixin


class TagListView(LoginRequiredMixin, View):
    def get(self, request: HttpRequest, *args,
            **kwargs) -> JsonResponse | HttpResponse:
        query = tag.all()
        serializer = TagSerializer()
        tags = serializer.serialize(query)
        res = '{"success": "true", "tags": ' + tags + "}"
        return HttpResponse(res, content_type='application/json')

    def post(self, request: HttpRequest, *args, **kwargs) -> JsonResponse:
        body = json.loads(request.body)
        tag.create(**body)
        return JsonResponse(
            {'success': 'true', 'message': 'tag created'})

    def head(self, request, *args, **kwargs):
        return JsonResponse(
            {'success': 'false', 'message': 'unsupported method'}, status=403)

    def put(self, request, *args, **kwargs):
        return JsonResponse(
            {'success': 'false', 'message': 'unsupported method'}, status=403)


class TagView(LoginRequiredMixin, View):
    def delete(self, request: HttpRequest, id):
        tag.delete(id)
        return JsonResponse({'success': 'true'})

    def get(self, request: HttpRequest, *args,
            **kwargs) -> JsonResponse | HttpResponse:
        return JsonResponse(
            {'success': 'false', 'message': 'unsupported method'}, status=403)

    def post(self, request: HttpRequest, *args, **kwargs) -> JsonResponse:
        body = json.loads(request.body)
        tag.create(**body)
        return JsonResponse(
            {'success': 'true', 'message': 'tag created'})

    def head(self, request, *args, **kwargs):
        return JsonResponse(
            {'success': 'false', 'message': 'unsupported method'}, status=403)

    def put(self, request, *args, **kwargs):
        return JsonResponse(
            {'success': 'false', 'message': 'unsupported method'}, status=403)
