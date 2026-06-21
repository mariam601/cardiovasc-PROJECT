from django.db import models
from django.contrib.auth.models import User


class PatientRecord(models.Model):
    patient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='records')
    age = models.IntegerField()
    gender = models.IntegerField(choices=[(1, 'Female'), (2, 'Male')])
    height = models.FloatField()
    weight = models.FloatField()
    ap_hi = models.IntegerField(help_text="Systolic blood pressure")
    ap_lo = models.IntegerField(help_text="Diastolic blood pressure")
    cholesterol = models.IntegerField(choices=[(1, 'Normal'), (2, 'Above Normal'), (3, 'Well Above Normal')])
    gluc = models.IntegerField(choices=[(1, 'Normal'), (2, 'Above Normal'), (3, 'Well Above Normal')])
    smoke = models.BooleanField(default=False)
    alco = models.BooleanField(default=False)
    active = models.BooleanField(default=True)
    medical_report = models.FileField(upload_to='reports/', blank=True, null=True)
    lab_results = models.FileField(upload_to='reports/', blank=True, null=True)
    prediction_result = models.IntegerField(choices=[(0, 'No CVD'), (1, 'CVD Detected')], null=True, blank=True)
    risk_score = models.FloatField(null=True, blank=True)
    advice = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def get_bmi(self):
        if self.height and self.weight:
            return round(self.weight / ((self.height / 100) ** 2), 1)
        return None

    def get_risk_label(self):
        if self.risk_score is None:
            return "Unknown"
        if self.risk_score >= 60:
            return "High Risk"
        elif self.risk_score >= 35:
            return "Moderate Risk"
        return "Low Risk"

    def __str__(self):
        return f"{self.patient.username} - {self.created_at.date()}"


class Appointment(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
    ]
    patient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='patient_appointments')
    doctor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='doctor_appointments')
    date = models.DateField()
    time = models.TimeField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.patient.username} -> Dr.{self.doctor.username} on {self.date}"
