from django.shortcuts import render, redirect
from accounts.models import UserProfile


def home(request):
    doctors = UserProfile.objects.filter(role='doctor')
    return render(request, "homepage.html", {"doctors": doctors})


def about(request):
    team_members = [
        {"icon": "👨‍⚕️", "name": "Dr. Ramesh Iyer", "role": "Chief Cardiologist & CEO"},
        {"icon": "👩‍⚕️", "name": "Dr. Priya Menon", "role": "Head of Cardiac Surgery"},
        {"icon": "👨‍⚕️", "name": "Dr. Arjun Sharma", "role": "Director of Research"},
        {"icon": "👩‍⚕️", "name": "Dr. Kavitha Nair", "role": "Head of Electrophysiology"},
    ]
    return render(request, "about.html", {"team_members": team_members})


def contact(request):
    success = False
    if request.method == "POST":
        success = True
    return render(request, "contact.html", {"success": success})


def faq(request):
    return render(request, "faq.html")


def terms(request):
    return render(request, "terms.html")


def privacy(request):
    return render(request, "privacy.html")


def refund(request):
    return render(request, "refund.html")


def doctor_list(request):
    doctors = UserProfile.objects.filter(role='doctor')
    return render(request, "doctor.html", {"doctors": doctors})


def doctor_profile(request, username):
    try:
        profile = UserProfile.objects.get(user__username=username, role='doctor')
    except UserProfile.DoesNotExist:
        profile = None
    return render(request, "profile.html", {"profile": profile, "username": username})
