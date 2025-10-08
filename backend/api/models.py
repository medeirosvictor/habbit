from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

class Habit(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(default='', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now_add=True)
    times_completed = models.IntegerField(default=0)
    last_completed = models.DateTimeField(null=True, blank=True)
    completed = models.BooleanField(default=False)
    is_habit = models.BooleanField(default=False)
    shared = models.BooleanField(default=False)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='habits')

    def __str__(self):
        return self.title
    
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar_url = models.URLField(default='', blank=True)
    friends = models.ManyToManyField('self', blank=True, symmetrical=True)

    def __str__(self):
        return f"{self.user.username}'s profile"
