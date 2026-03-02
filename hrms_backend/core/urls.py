from django.urls import path
from .views import (
    EmployeeListCreateView,
    EmployeeDeleteView,
    AttendanceListCreateView,
    DashboardView
)

urlpatterns = [
    path("employees/", EmployeeListCreateView.as_view()),
    path("employees/<int:pk>/", EmployeeDeleteView.as_view()),
    path("attendance/", AttendanceListCreateView.as_view()),
    path("dashboard/", DashboardView.as_view()),
]