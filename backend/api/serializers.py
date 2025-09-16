from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Rabit, Profile


# For registration (POST)
class ProfileCreateSerializer(serializers.ModelSerializer):
    username = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Profile
        fields = ["id", "username", "password", "email", "avatar_url", "friends"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        username = validated_data.pop("username")
        email = validated_data.pop("email")
        password = validated_data.pop("password")
        user = User.objects.create_user(username=username, email=email, password=password)
        profile = Profile.objects.create(user=user, **validated_data)
        return profile

# For reading (GET/me)
class ProfileReadSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)
    email = serializers.EmailField(source="user.email", read_only=True)

    class Meta:
        model = Profile
        fields = ["id", "username", "email", "avatar_url", "friends"]

class PublicProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username")

    class Meta:
        model = Profile
        fields = ["id", "username", "avatar_url"]

class RabitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rabit
        fields = ['id', 'title', 'description', 'created_at', 'last_updated', 'completed', 'is_habit', 'author', 'shared', 'times_completed', 'last_completed']
        extra_kwargs = {'author': {'read_only': True}}
