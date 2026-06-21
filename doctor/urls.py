from django.urls import path
from . import views

urlpatterns = [
    # Dashboard
    path("dashboard/", views.dashboard, name="doctor-dashboard"),
    # My Patients
    path("patients/", views.my_patients, name="doctor-patients"),
    # Patient history / detail
    path(
        "patient/<int:patient_id>/history/",
        views.patient_history,
        name="patient_history",
    ),
    # Send advice
    path(
        "patient/<int:patient_id>/record/<int:record_id>/advice/",
        views.send_advice,
        name="send_advice",
    ),
    # Appointments
    path("appointments/", views.doctor_appointments, name="doctor-appointments"),
    # Reports
    path("reports/", views.reports, name="doctor-reports"),
    # Availability
    path("availability/", views.availability, name="doctor-availability"),
    # Profile
    path("profile/", views.profile, name="doctor-profile-edit"),
]
