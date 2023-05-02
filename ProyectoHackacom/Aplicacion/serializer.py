from rest_framework import serializers
from .models import *

class ReciclajeSerializer(serializers.ModelSerializer):
    lat = serializers.FloatField(source='cod_localizacion.lat',read_only=True)
    long = serializers.FloatField(source='cod_localizacion.long',read_only=True)

    class Meta:
        model = Reciclaje
        fields = ['id', 'nombre_empresa', 'descripcion', 'horarios', 'lat', 'long']


class Noticia1Serializer(serializers.ModelSerializer):
    class Meta:
        model = Noticia
        fields = ['id', 'Titulo']
class NoticiasSerializer(serializers.ModelSerializer):
    Nombre_usuario=serializers.CharField(source='cod_usuario.nombre',read_only=True)
    class Meta:
        model = Noticia
        fields = ['id', 'Titulo', 'Descripcion', 'Imagen', 'Nombre_usuario']

class ContaminacionAcusticaSerializer(serializers.ModelSerializer):
    lat = serializers.FloatField(source='cod_localizacion.lat', read_only=True)
    long = serializers.FloatField(source='cod_localizacion.long', read_only=True)
    sensor=serializers.CharField(source='cod_sensor.nombre', read_only=True)
    class Meta:
        model = ContaminacionAcustica
        fields = ['id', 'decibelios', 'lat', 'long', 'sensor']

class ContaminacionDelAireSerializer(serializers.ModelSerializer):
    lat = serializers.FloatField(source='cod_localizacion.lat', read_only=True)
    long = serializers.FloatField(source='cod_localizacion.long', read_only=True)
    sensor = serializers.CharField(source='cod_sensor.nombre', read_only=True)
    class Meta:
        model = ContaminacionDelAire
        fields = ['id', 'lat', 'long', 'sensor', 'pm', 'co', 'no2', 'co2']

class LocalizacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Localizacion
        fields = '__all__'

class SensorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sensor
        fields = '__all__'