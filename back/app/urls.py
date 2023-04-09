from django.urls import path
from .views import user, tag, facility, solution, misc, assignment

urlpatterns = [
    # path('', views.index, name="index"),
    path('login/', user.login_user, name="login"),
    path('logout/', user.logout_user, name="logout"),
    path('role/', user.get_role, name='get_role'),
    path('user/', user.get_user, name='get_user'),
    path('tags/', tag.TagView.as_view(), name='crud_tags'),
    path('facilities/', facility.FacilityView.as_view(),
         name='crud_facilities'),
    path('solutions/', solution.SolutionView.as_view(), name="create_solution"),
    path('solutions/', assignment.AssignmentView.as_view(),
         name="create_assignment"),
    path('report/', misc.get_report, name="get_report"),
    path('load_xml/', misc.create_from_xml, name="create_from_xml")
]
