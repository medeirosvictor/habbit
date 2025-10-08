from django.urls import path
from . import views

urlpatterns = [
    path('habits/', views.HabitListCreate.as_view(), name='habit-list'),
    path('habits/<int:pk>/', views.HabitDetail.as_view(), name='habit-detail'),
    path('habits/delete/<int:pk>/', views.HabitDelete.as_view(), name='habit-delete'),
    path('habits/update/<int:pk>/', views.HabitUpdate.as_view(), name='habit-update'),
    path('profile/me/', views.Me.as_view(), name='my-profile'),
    path('profile/<int:pk>/', views.UserDetail.as_view(), name='user-profile'),
]