from django.urls import path
from . import views

urlpatterns = [
    path('predict/', views.predict, name='predict'),
    path('result/<int:pk>/', views.result_summary, name='result-summary'),
]
