from django.contrib import admin
from .models import *

@admin.register(Reciclaje)
class ReciclajeAdmin(admin.ModelAdmin):
    list_display = ['id', 'nombre_empresa', 'descripcion', 'horarios', 'cod_localizacion',]
    list_display_links = ['id', 'nombre_empresa',]
    list_filter = ['nombre_empresa',]
    search_fields = ['nombre_empresa',]

@admin.register(Noticia)
class NoticiasAdmin(admin.ModelAdmin):
    list_display = ['id', 'titulo', 'descripcion', 'imagen', 'cod_usuario',]
    list_display_links = ['id', 'titulo',]
    list_filter = ['titulo',]
    search_fields = ['titulo',]

@admin.register(ContaminacionAcustica)
class ContaminacionAcusticaAdmin(admin.ModelAdmin):
    list_display = ['id', 'decibelios', 'cod_localizacion', 'cod_sensor',]
    list_display_links = ['id', 'decibelios',]
    list_filter = ['cod_localizacion',]
    search_fields = ['cod_localizacion', 'nombre',]

@admin.register(ContaminacionDelAire)
class ContaminacionDelAireAdmin(admin.ModelAdmin):
    list_display = ['id', 'cod_sensor', 'cod_localizacion', 'pm', 'co', 'no2', 'co2',]
    list_display_links = ['id', 'cod_sensor',]
    list_filter = ['cod_sensor',]
    search_fields = ['cod_sensor', 'nombre',]

@admin.register(Localizacion)
class LocalizacionAdmin(admin.ModelAdmin):
    list_display = ['id', 'nombre', 'lat', 'long',]
    list_display_links = ['id', 'nombre',]
    list_filter = ['nombre',]
    search_fields = ['nombre',]

@admin.register(Sensor)
class SensorAdmin(admin.ModelAdmin):
    list_display = ['id', 'nombre', 'descripcion', 'alcance',]
    list_display_links = ['id', 'nombre',]
    list_filter = ['nombre',]
    search_fields = ['nombre',]
