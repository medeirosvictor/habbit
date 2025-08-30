from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Activity

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ['id', 'title', 'description', 'created_at', 'last_updated', 'completed', 'is_habit', 'author']
        extra_kwargs = {'author': {'read_only': True}}
