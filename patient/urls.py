from django.urls import path
from . import views

urlpatterns = [
    path("dashboard/", views.dashboard, name="patient-dashboard"),
    path("history/", views.history, name="patient-history"),
    path("appointments/", views.appointments, name="patient-appointments"),
    path("data-input/", views.data_input, name="patient-data-input"),
    path("profile/", views.profile_view, name="patient-profile"),
    path("prediction/<int:pk>/", views.prediction_detail, name="prediction-detail"),
    path("book-appointment/", views.book_appointment, name="book-appointment"),
]
