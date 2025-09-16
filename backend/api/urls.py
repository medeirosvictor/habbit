from django.urls import path
from . import views

urlpatterns = [
    path('rabits/', views.RabitListCreate.as_view(), name='rabit-list'),
    path('rabits/<int:pk>/', views.RabitDetail.as_view(), name='rabit-detail'),
    path('rabits/delete/<int:pk>/', views.RabitDelete.as_view(), name='rabit-delete'),
    path('rabits/update/<int:pk>/', views.RabitUpdate.as_view(), name='rabit-update'),
    path('profile/me/', views.Me.as_view(), name='my-profile'),
    path('profile/<int:pk>/', views.UserDetail.as_view(), name='user-profile'),
]