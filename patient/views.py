from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from datetime import date
from accounts.models import UserProfile
from prediction.models import PatientRecord, Appointment


@login_required
def dashboard(request):
    profile = UserProfile.objects.filter(user=request.user).first()
    records = PatientRecord.objects.filter(patient=request.user)
    total_records = records.count()
    cvd_detected = records.filter(prediction_result=1).count()
    normal_results = records.filter(prediction_result=0).count()
    upcoming_appointments = Appointment.objects.filter(
        patient=request.user, status="confirmed"
    ).count()
    recent_records = records.order_by("-created_at")[:5]
    return render(
        request,
        "patient-dashboard.html",
        {
            "profile": profile,
            "total_records": total_records,
            "cvd_detected": cvd_detected,
            "normal_results": normal_results,
            "upcoming_appointments": upcoming_appointments,
            "recent_records": recent_records,
            "patient_name": profile.full_name
            if profile and profile.full_name
            else request.user.username,
        },
    )


@login_required
def history(request):
    profile = UserProfile.objects.filter(user=request.user).first()
    records = PatientRecord.objects.filter(patient=request.user).order_by("-created_at")
    return render(
        request,
        "patient-history.html",
        {
            "profile": profile,
            "records": records,
            "total_records": records.count(),
            "cvd_count": records.filter(prediction_result=1).count(),
            "normal_count": records.filter(prediction_result=0).count(),
        },
    )


@login_required
def appointments(request):
    profile = UserProfile.objects.filter(user=request.user).first()
    appts = Appointment.objects.filter(patient=request.user).order_by("-date")
    return render(
        request,
        "patient-appointments.html",
        {
            "profile": profile,
            "appointments": appts,
            "total_appointments": appts.count(),
            "pending_count": appts.filter(status="pending").count(),
            "confirmed_count": appts.filter(status="confirmed").count(),
            "cancelled_count": appts.filter(status="cancelled").count(),
        },
    )


@login_required
def data_input(request):
    profile = UserProfile.objects.filter(user=request.user).first()
    return render(request, "patient-data-input.html", {"profile": profile})


@login_required
def profile_view(request):
    profile = UserProfile.objects.filter(user=request.user).first()
    if request.method == "POST":
        if not profile:
            profile = UserProfile(user=request.user, role="patient")
        profile.full_name = request.POST.get("full_name", "")
        profile.phone_number = request.POST.get("phone_number", "")
        profile.email = request.POST.get("email", "")
        if "image" in request.FILES:
            profile.image = request.FILES["image"]
        profile.save()
        messages.success(request, "Profile updated successfully!")
        return redirect("patient-profile")
    return render(request, "patient-profile.html", {"profile": profile})


@login_required
def prediction_detail(request, pk):
    record = get_object_or_404(PatientRecord, pk=pk, patient=request.user)
    profile = UserProfile.objects.filter(user=request.user).first()
    return render(
        request,
        "prediction_detail.html",
        {
            "record": record,
            "profile": profile,
            "is_high_risk": record.risk_score and record.risk_score >= 35,
        },
    )


@login_required
def book_appointment(request):
    profile = UserProfile.objects.filter(user=request.user).first()
    doctors = UserProfile.objects.filter(role="doctor")
    if request.method == "POST":
        doctor_id = request.POST.get("doctor")
        date = request.POST.get("date")
        time = request.POST.get("time")
        notes = request.POST.get("notes", "")
        try:
            doctor_profile = UserProfile.objects.get(id=doctor_id)
            Appointment.objects.create(
                patient=request.user,
                doctor=doctor_profile.user,
                date=date,
                time=time,
                notes=notes,
                status="pending",
            )
            messages.success(
                request,
                "Appointment booked successfully! Waiting for doctor confirmation.",
            )
            return redirect("patient-appointments")
        except Exception as e:
            messages.error(request, "Something went wrong. Please try again.")
    return render(
        request,
        "book-appointment.html",
        {
            "profile": profile,
            "doctors": doctors,
            "today": date.today().isoformat(),
        },
    )
