from django.urls import path
from .views import RegistroView,LoginView,UserView,LogoutView

urlpatterns = [
    path('registro',RegistroView.as_view()),
    path('login',LoginView.as_view()),
    path('user',UserView.as_view()),
    path('logout',LogoutView.as_view())
]