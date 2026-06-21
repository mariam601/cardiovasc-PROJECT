from django.contrib import admin
from .models import PatientRecord, Appointment

admin.site.register(PatientRecord)
admin.site.register(Appointment)
