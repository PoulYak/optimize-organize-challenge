from django.contrib.auth.mixins import LoginRequiredMixin
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
        # create_from_bytes(bin_data)
        return JsonResponse(
            {'success': 'true', 'message': 'media created'})

    def head(self, request, *args, **kwargs):
        return JsonResponse(
            {'success': 'false', 'message': 'unsupported method'}, status=403)

    def put(self, request, *args, **kwargs):
        return JsonResponse(
            {'success': 'false', 'message': 'unsupported method'}, status=403)
