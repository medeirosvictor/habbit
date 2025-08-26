from django.urls import path
from . import views

urlpatterns = [
    path('activities/', views.ActivityListCreate.as_view(), name='activity-list'),
    path('activities/delete/<int:pk>/', views.ActivityDelete.as_view(), name='delete-activity'),
]