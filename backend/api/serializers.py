from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Activity, Profile

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)
    email = serializers.EmailField(source="user.email", read_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Profile
        fields = ["id", "username", "password", "email", "avatar_url", "friends"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        # Extract the user fields
        username = validated_data.pop("username")
        email = validated_data.pop("email")
        password = validated_data.pop("password")

        # Create the Django User first
        user = User.objects.create_user(username=username, email=email, password=password)

        # Create the Profile linked to that user
        profile = Profile.objects.create(user=user, **validated_data)

        return profile

class PublicProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username")

    class Meta:
        model = Profile
        fields = ["id", "username", "avatar_url"]

class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ['id', 'title', 'description', 'created_at', 'last_updated', 'completed', 'is_habit', 'author', 'shared', 'times_completed', 'last_completed']
        extra_kwargs = {'author': {'read_only': True}}
