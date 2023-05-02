from django.db import models

# Create your models here.
from django.db import models
from user.models import *


class Localizacion(models.Model):
    nombre = models.CharField(max_length=255)
    lat = models.FloatField()
    long = models.FloatField()
    class Meta:
        verbose_name='Localizacion'
        verbose_name_plural='Localizaciones'
        db_table='localizacion'


class Sensor(models.Model):
    nombre = models.CharField(max_length=255)
    descripcion = models.CharField(max_length=1000)
    alcance = models.FloatField()

    class Meta:
        verbose_name='Sensor'
        verbose_name_plural='Sensores'
        db_table='sensor'


class Reciclaje(models.Model):
    nombre_empresa = models.CharField(max_length=255)
    descripcion = models.CharField(max_length=1000)
    horarios = models.CharField(max_length=1000)
    cod_localizacion = models.ForeignKey(Localizacion, on_delete=models.CASCADE)

    class Meta:
        verbose_name='Punto de Reciclaje'
        verbose_name_plural='Puntos de Reciclajes'
        db_table='reciclaje'


class Noticia(models.Model):
    titulo = models.CharField(max_length=255)
    descripcion = models.CharField(max_length=1000)
    imagen = models.URLField()
    cod_usuario = models.ForeignKey(User, on_delete=models.CASCADE)


    class Meta:
        verbose_name='Noticia'
        verbose_name_plural='Noticias'
        db_table='noticia'


class ContaminacionAcustica(models.Model):
    decibelios = models.FloatField()
    cod_localizacion = models.ForeignKey(Localizacion, on_delete=models.CASCADE)
    cod_sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE)

    class Meta:
        verbose_name='Contaminacion Acustica'
        verbose_name_plural='Contaminaciones Acusticas'
        db_table='contaminacionAcustica'


class ContaminacionDelAire(models.Model):
    cod_sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE)
    cod_localizacion = models.ForeignKey(Localizacion, on_delete=models.CASCADE)
    pm = models.FloatField()
    co = models.FloatField()
    no2 = models.FloatField()
    co2 = models.FloatField()

    class Meta:
        verbose_name='Contaminacion del Aire'
        verbose_name_plural='Contaminaciones del Aire'
        db_table='contaminacionDelAire'



