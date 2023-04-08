import json

from django.http import HttpRequest, JsonResponse, HttpResponse
from django.contrib.auth.decorators import login_required
from ..service import tag
from ..serializers import TagSerializer

from django.views.generic import View
from django.contrib.auth.mixins import LoginRequiredMixin


class TagView(LoginRequiredMixin, View):
    def get(self, request: HttpRequest, *args, **kwargs):
        query = tag.all()
        serializer = TagSerializer()
        tags = serializer.serialize(query)
        res = '{"success": "true", "tags": ' + tags + "}"
        return HttpResponse(res, content_type='application/json')

    def post(self, request, *args, **kwargs):
        body = json.loads(request.body)
        tag.create(**body)
        return JsonResponse(
            {'success': 'true', 'message': 'tag created'})

    def head(self, request, *args, **kwargs):
        return JsonResponse(
            {'success': 'false', 'message': 'unsupported method'})

    def put(self, request, *args, **kwargs):
        return JsonResponse(
            {'success': 'false', 'message': 'unsupported method'})
