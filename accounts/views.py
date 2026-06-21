from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib import messages
from django.http import JsonResponse
from .models import UserProfile
from .forms import RegisterForm


def login_view(request):
    if request.user.is_authenticated:
        return redirect('dashboard_redirect')
    if request.method == 'POST':
        username = request.POST.get('username', '').strip()
        password = request.POST.get('password', '')
        if not username or not password:
            messages.error(request, 'Please enter both username and password.')
            return render(request, 'accounts/login.html')
        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            return redirect('dashboard_redirect')
        else:
            messages.error(request, 'Invalid username or password.')
    return render(request, 'accounts/login.html')


def register_view(request):
    if request.user.is_authenticated:
        return redirect('dashboard_redirect')
    form = RegisterForm()
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            data = form.cleaned_data
            user = User.objects.create_user(
                username=data['username'],
                email=data['email'],
                password=data['password'],
                first_name=data.get('full_name', data['username']),
            )
            UserProfile.objects.create(
                user=user,
                role=data['role'],
                email=data['email'],
                phone_number=data['phone'],
                full_name=data.get('full_name', data['username']),
            )
            login(request, user)
            messages.success(request, f"Welcome, {user.username}! Account created successfully.")
            return redirect('dashboard_redirect')
    return render(request, 'accounts/register.html', {'form': form})


def logout_view(request):
    logout(request)
    messages.success(request, 'You have been logged out successfully.')
    return redirect('homepage')


def dashboard_redirect(request):
    if not request.user.is_authenticated:
        return redirect('accounts:login')
    try:
        profile = request.user.profile
        if profile.role == 'doctor':
            return redirect('doctor-dashboard')
        else:
            return redirect('patient-dashboard')
    except UserProfile.DoesNotExist:
        # Create a default patient profile if missing
        UserProfile.objects.create(
            user=request.user,
            role='patient',
            email=request.user.email,
            full_name=request.user.username,
        )
        return redirect('patient-dashboard')


def check_username(request):
    """AJAX endpoint — checks if a username is already taken."""
    username = request.GET.get('username', '').strip()
    exists = User.objects.filter(username=username).exists()
    return JsonResponse({'exists': exists})
