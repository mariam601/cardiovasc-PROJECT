from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from accounts.models import UserProfile
from .models import PatientRecord


def calculate_cvd_risk(age, gender, height, weight, ap_hi, ap_lo, cholesterol, gluc, smoke, alco, active):
    score = 0
    # Age factor
    if age >= 60:
        score += 30
    elif age >= 50:
        score += 20
    elif age >= 40:
        score += 10
    # Gender (males have higher risk)
    if gender == 2:
        score += 5
    # BMI
    bmi = weight / ((height / 100) ** 2)
    if bmi >= 30:
        score += 15
    elif bmi >= 25:
        score += 8
    # Blood pressure
    if ap_hi >= 140 or ap_lo >= 90:
        score += 20
    elif ap_hi >= 130 or ap_lo >= 85:
        score += 10
    # Cholesterol
    if cholesterol == 3:
        score += 15
    elif cholesterol == 2:
        score += 8
    # Glucose
    if gluc == 3:
        score += 10
    elif gluc == 2:
        score += 5
    # Lifestyle
    if smoke:
        score += 10
    if alco:
        score += 5
    if not active:
        score += 8
    # Cap at 100
    return min(score, 100)


@login_required
def predict(request):
    if request.method == 'POST':
        profile = UserProfile.objects.filter(user=request.user).first()
        try:
            age = int(request.POST.get('age', 0))
            gender = int(request.POST.get('gender', 1))
            height = float(request.POST.get('height', 170))
            weight = float(request.POST.get('weight', 70))
            ap_hi = int(request.POST.get('ap_hi', 120))
            ap_lo = int(request.POST.get('ap_lo', 80))
            cholesterol = int(request.POST.get('cholesterol', 1))
            gluc = int(request.POST.get('gluc', 1))
            smoke = bool(int(request.POST.get('smoke', 0)))
            alco = bool(int(request.POST.get('alco', 0)))
            active = bool(int(request.POST.get('active', 1)))

            risk_score = calculate_cvd_risk(
                age, gender, height, weight, ap_hi, ap_lo,
                cholesterol, gluc, smoke, alco, active
            )
            prediction_result = 1 if risk_score >= 50 else 0

            record = PatientRecord(
                patient=request.user,
                age=age, gender=gender, height=height, weight=weight,
                ap_hi=ap_hi, ap_lo=ap_lo,
                cholesterol=cholesterol, gluc=gluc,
                smoke=smoke, alco=alco, active=active,
                prediction_result=prediction_result,
                risk_score=risk_score,
            )
            if 'medical_report' in request.FILES:
                record.medical_report = request.FILES['medical_report']
            if 'lab_results' in request.FILES:
                record.lab_results = request.FILES['lab_results']
            record.save()

            return redirect('result-summary', pk=record.pk)
        except Exception as e:
            profile = UserProfile.objects.filter(user=request.user).first()
            return render(request, 'patient-data-input.html', {
                'profile': profile,
                'error': str(e),
            })
    return redirect('patient-data-input')


@login_required
def result_summary(request, pk):
    from django.shortcuts import get_object_or_404
    record = get_object_or_404(PatientRecord, pk=pk, patient=request.user)
    profile = UserProfile.objects.filter(user=request.user).first()
    is_high_risk = record.risk_score >= 50 if record.risk_score else False
    return render(request, 'result-summary.html', {
        'record': record,
        'profile': profile,
        'is_high_risk': is_high_risk,
    })
