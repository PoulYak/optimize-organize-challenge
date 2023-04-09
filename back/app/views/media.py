import json
import uuid

from django.conf import settings
from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.files.storage import default_storage
from django.http import HttpRequest, JsonResponse, HttpResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt

from ..service.media import create_from_bytes


@method_decorator(csrf_exempt, name='dispatch')
class MediaView(LoginRequiredMixin, View):
    def get(self, request: HttpRequest, *args,
            **kwargs) -> JsonResponse | HttpResponse:
        return JsonResponse(
            {'success': 'false', 'message': 'unsupported method'}, status=403)

    def post(self, request: HttpRequest, *args, **kwargs) -> JsonResponse:
        bin_data = request.body
        print(str(bin_data))
        uid = str(uuid.uuid4())
        img_path = str((settings.MEDIA_ROOT / uid)) + ".jpg"
        with open(img_path, "wb+") as fh:
            fh.write(bin_data)
        return JsonResponse(
            {'success': 'true', 'message': 'media created'})

    def head(self, request, *args, **kwargs):
        return JsonResponse(
            {'success': 'false', 'message': 'unsupported method'}, status=403)

    def put(self, request, *args, **kwargs):
        return JsonResponse(
            {'success': 'false', 'message': 'unsupported method'}, status=403)
