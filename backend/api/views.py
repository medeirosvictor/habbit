from django.shortcuts import render
from rest_framework import generics
from .serializers import ProfileCreateSerializer, habitserializer, ProfileReadSerializer, PublicProfileSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Habit, Profile
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.response import Response
from rest_framework import status

class HabitListCreate(generics.ListCreateAPIView):
    serializer_class = habitserializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Habit.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)
    
class HabitDelete(generics.DestroyAPIView):
    serializer_class = habitserializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Habit.objects.filter(author=user)
    

class HabitUpdate(generics.UpdateAPIView):
    serializer_class = habitserializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Habit.objects.filter(author=user)
    

class HabitDetail(generics.RetrieveAPIView):
    serializer_class = habitserializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Habit.objects.filter(author=user)
    
    def get(self, request, *args, **kwargs):
        try:
            return self.retrieve(request, *args, **kwargs)
        except Habit.DoesNotExist:
            return Response({'detail': 'Habit not found.'}, status=status.HTTP_404_NOT_FOUND)

class CreateUserView(generics.CreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileCreateSerializer
    permission_classes = [AllowAny]

class Me(generics.RetrieveAPIView):
    serializer_class = ProfileReadSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return Profile.objects.get(user=self.request.user)

class UserDetail(generics.RetrieveAPIView):
    serializer_class = PublicProfileSerializer
    permission_classes = [IsAuthenticated]
    queryset = Profile.objects.all()

class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        try:
            return super().post(request, *args, **kwargs)
        except Profile.DoesNotExist:
            # Return a 401 Unauthorized response instead of 500
            return Response({'detail': 'User not found.'}, status=status.HTTP_401_UNAUTHORIZED)
