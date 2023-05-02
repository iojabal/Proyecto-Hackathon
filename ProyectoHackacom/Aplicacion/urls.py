from django.urls import path
from .views import *

urlpatterns = [
    path('reciclaje',reciclaje_api_view),
    path('noticia',noticia_api_view),
    # path('noticia/detail/<str:id>'),
    path('acustica',contaminacionacustica_api_view),
    path('aire',contaminacionaire_api_view),
    path('microfono',desde_el_micro_api_view)
]