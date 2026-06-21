from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="homepage"),
    path("about/", views.about, name="about"),
    path("contact/", views.contact, name="contact"),
    path("faq/", views.faq, name="faq"),
    path("terms/", views.terms, name="terms"),
    path("privacy/", views.privacy, name="privacy"),
    path("refund/", views.refund, name="refund"),
    path("doctors/", views.doctor_list, name="doctor"),
    path("doctors/<str:username>/", views.doctor_profile, name="doctor-profile"),
]
