from django.urls import path
from .views import user, tag, facility, solution, misc, assignment, media, \
    work_group, manager

urlpatterns = [
    # path('', views.index, name="index"),
    path('login/', user.login_user, name="login"),
    path('logout/', user.logout_user, name="logout"),
    path('role/', user.get_role, name='get_role'),
    path('user/', user.get_user, name='get_user'),
    path('tags/', tag.TagListView.as_view(), name='crud_tags'),
    path('facilities/', facility.FacilityListView.as_view(),
         name='crud_facilities'),
    path('solutions/', solution.SolutionListView.as_view(),
         name="create_solution"),
    path('assignments/', assignment.AssignmentView.as_view(),
         name="create_assignment"),
    path('report/', misc.get_report, name="get_report"),
    path('load_xml/', misc.create_from_xml, name="create_from_xml"),
    path('media/', media.MediaView.as_view(), name="create_media"),
    path('tags/<int:id>/', tag.TagView.as_view(), name="delete_tag"),
    path('users/', manager.ManagerListView.as_view(), name="delete_tag"),
    path('workgroups/', work_group.WorkGroupListView.as_view(),
         name="crud_work_group"),
]
