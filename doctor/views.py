from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from accounts.models import UserProfile
from prediction.models import PatientRecord, Appointment


# ---------------- DASHBOARD ----------------
@login_required
def dashboard(request):
    profile = UserProfile.objects.filter(user=request.user).first()
    patients = Appointment.objects.filter(doctor=request.user).values('patient').distinct()
    total_patients = patients.count()
    pending_appointments = Appointment.objects.filter(
        doctor=request.user, status='pending'
    ).count()
    confirmed_appointments = Appointment.objects.filter(
        doctor=request.user, status='confirmed'
    ).count()
    recent_appointments = Appointment.objects.filter(
        doctor=request.user
    ).order_by('-date')[:10]
    return render(request, "doctor-dashboard.html", {
        "profile": profile,
        "total_patients": total_patients,
        "pending_appointments": pending_appointments,
        "confirmed_appointments": confirmed_appointments,
        "recent_appointments": recent_appointments,
    })


# ---------------- MY PATIENTS ----------------
@login_required
def my_patients(request):
    profile = UserProfile.objects.filter(user=request.user).first()
    patient_ids = Appointment.objects.filter(
        doctor=request.user
    ).values_list('patient', flat=True).distinct()
    patients = UserProfile.objects.filter(user__in=patient_ids)
    return render(request, "MyPatients_Records.html", {
        "profile": profile,
        "patients": patients,
    })


# ---------------- PATIENT HISTORY ----------------
@login_required
def patient_history(request, patient_id):
    profile = UserProfile.objects.filter(user=request.user).first()
    from django.contrib.auth.models import User
    patient_user = get_object_or_404(User, pk=patient_id)
    patient_profile = UserProfile.objects.filter(user=patient_user).first()
    records = PatientRecord.objects.filter(patient=patient_user).order_by('-created_at')
    return render(request, "patient-detail.html", {
        "profile": profile,
        "patient": patient_profile or patient_user,
        "records": records,
    })


# ---------------- SEND ADVICE ----------------
@login_required
def send_advice(request, patient_id, record_id):
    profile = UserProfile.objects.filter(user=request.user).first()
    record = get_object_or_404(PatientRecord, pk=record_id)
    patient_profile = UserProfile.objects.filter(user=record.patient).first()
    if request.method == "POST":
        advice = request.POST.get("advice", "").strip()
        if advice:
            record.advice = advice
            record.save()
        return redirect("patient_history", patient_id=patient_id)
    return render(request, "provide_advice.html", {
        "profile": profile,
        "patient": patient_profile or record.patient,
        "record": record,
    })


# ---------------- APPOINTMENTS ----------------
@login_required
def doctor_appointments(request):
    profile = UserProfile.objects.filter(user=request.user).first()
    appts = Appointment.objects.filter(doctor=request.user).order_by('-date')
    if request.method == "POST":
        appt_id = request.POST.get('appointment_id')
        action = request.POST.get('action')
        try:
            appt = Appointment.objects.get(id=appt_id, doctor=request.user)
            if action == 'confirm':
                appt.status = 'confirmed'
            elif action == 'cancel':
                appt.status = 'cancelled'
            appt.save()
        except Appointment.DoesNotExist:
            pass
        return redirect('doctor-appointments')
    return render(request, "doctor-appointments.html", {
        "profile": profile,
        "appointments": appts,
    })


# ---------------- REPORTS ----------------
@login_required
def reports(request):
    profile = UserProfile.objects.filter(user=request.user).first()
    total_patients = Appointment.objects.filter(doctor=request.user).values('patient').distinct().count()
    total_appointments = Appointment.objects.filter(doctor=request.user).count()
    confirmed = Appointment.objects.filter(doctor=request.user, status='confirmed').count()
    cancelled = Appointment.objects.filter(doctor=request.user, status='cancelled').count()
    return render(request, "doctor-report.html", {
        "profile": profile,
        "total_patients": total_patients,
        "total_appointments": total_appointments,
        "confirmed": confirmed,
        "cancelled": cancelled,
    })


# ---------------- AVAILABILITY ----------------
@login_required
def availability(request):
    profile = UserProfile.objects.filter(user=request.user).first()
    return render(request, "doctor-availarbility.html", {"profile": profile})


# ---------------- PROFILE ----------------
@login_required
def profile(request):
    profile = UserProfile.objects.filter(user=request.user).first()
    if request.method == "POST":
        if not profile:
            profile = UserProfile(user=request.user, role='doctor')
        profile.full_name = request.POST.get('full_name', '')
        profile.phone_number = request.POST.get('phone_number', '')
        profile.email = request.POST.get('email', '')
        profile.specialty = request.POST.get('specialty', '')
        if 'image' in request.FILES:
            profile.image = request.FILES['image']
        profile.save()
        return redirect('doctor-profile-edit')
    return render(request, "doctor-profile.html", {"profile": profile})
