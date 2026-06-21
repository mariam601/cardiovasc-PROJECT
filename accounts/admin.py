from django.contrib import admin
from .models import UserProfile


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'full_name', 'role', 'email', 'phone_number', 'created_at')
    list_filter = ('role', 'created_at')
    search_fields = ('user__username', 'full_name', 'email', 'phone_number')
    ordering = ('-created_at',)
    readonly_fields = ('created_at',)
    fieldsets = (
        ('Account Info', {
            'fields': ('user', 'role', 'created_at')
        }),
        ('Personal Info', {
            'fields': ('full_name', 'email', 'phone_number', 'specialty', 'image')
        }),
    )
