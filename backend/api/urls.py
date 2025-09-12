from django.urls import path
from . import views

urlpatterns = [
    path('activities/', views.ActivityListCreate.as_view(), name='activity-list'),
    path('activities/<int:pk>/', views.ActivityDetail.as_view(), name='activity-detail'),
    path('activities/delete/<int:pk>/', views.ActivityDelete.as_view(), name='activity-delete'),
    path('activities/update/<int:pk>/', views.ActivityUpdate.as_view(), name='activity-update'),
    path('profile/me/', views.Me.as_view(), name='my-profile'),
    path('profile/<int:pk>/', views.UserDetail.as_view(), name='user-profile'),
]