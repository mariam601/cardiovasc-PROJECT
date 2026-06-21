from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from accounts import views as accounts_views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("cvd_project.urls")),
    path("accounts/", include(("accounts.urls", "accounts"), namespace="accounts")),
    path("doctor/", include("doctor.urls")),
    path("patient/", include("patient.urls")),
    path("prediction/", include("prediction.urls")),
    # Non-namespaced aliases so templates can use {% url 'login' %} etc.
    path("login/", accounts_views.login_view, name="login"),
    path("logout/", accounts_views.logout_view, name="logout"),
    path("register/", accounts_views.register_view, name="register"),
    path("dashboard/", accounts_views.dashboard_redirect, name="dashboard_redirect"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
