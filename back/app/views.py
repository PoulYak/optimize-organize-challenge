import json

from django.contrib.auth import authenticate, login
from django.http import HttpRequest, JsonResponse


def login_user(request: HttpRequest):
    if request.method != "POST":
        return None
    credentials = json.loads(request.body)
    user = authenticate(request, email=credentials['login'],
                        password=credentials['password'])
    if user is not None:
        login(request, user)
        return JsonResponse({'success': "true"})
    else:
        return JsonResponse(
            {'success': "false", 'message': "Invalid login or password"},
            status=400)
