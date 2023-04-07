import json

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http import HttpRequest, JsonResponse
from ..service import manager
from ..serializers import ManagerSerializer


def login_user(request: HttpRequest) -> JsonResponse:
    if request.method != "POST":
        return JsonResponse(
            {'success': "false", 'message': 'Unsupported method'})
    credentials = json.loads(request.body)
    user = authenticate(request, username=credentials['login'],
                        password=credentials['password'])
    if user is not None:
        login(request, user)
        return JsonResponse({'success': "true"})
    else:
        return JsonResponse(
            {'success': "false", 'message': "Invalid login or password"},
            status=400)


@login_required
def get_role(request: HttpRequest) -> JsonResponse:
    if request.method != "GET":
        return JsonResponse(
            {'success': "false", 'message': 'Unsupported method'}, status=400)
    user = manager.get(request.user.username)
    role = user.role
    if role is None:
        return JsonResponse(
            {'success': "false", 'message': "user hasn't role"}, status=409)

    return JsonResponse({'success': 'true', 'role': role})


@login_required
def get_user(request: HttpRequest) -> JsonResponse:
    if request.method != "GET":
        return JsonResponse(
            {'success': "false", 'message': 'Unsupported method'}, status=400)
    user = manager.get(request.user.username)
    serializer = ManagerSerializer()
    res = {'success': 'true'}
    res.update(serializer.get_dump_object(user))
    return JsonResponse(res)


@login_required
def logout_user(request: HttpRequest) -> JsonResponse:
    if request.method != 'POST':
        return JsonResponse(
            {'success': "false", 'message': 'Unsupported method'}, status=400)
    logout(request)
    return JsonResponse(
        {'success': 'true', 'message': 'user logout'})
