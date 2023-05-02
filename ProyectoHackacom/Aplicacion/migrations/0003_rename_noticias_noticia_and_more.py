# Generated by Django 4.1.7 on 2023-04-29 23:29

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('Aplicacion', '0002_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Noticias',
            new_name='Noticia',
        ),
        migrations.AlterModelOptions(
            name='contaminacionacustica',
            options={'verbose_name': 'Contaminacion Acustica', 'verbose_name_plural': 'Contaminaciones Acusticas'},
        ),
        migrations.AlterModelOptions(
            name='contaminaciondelaire',
            options={'verbose_name': 'Contaminacion del Aire', 'verbose_name_plural': 'Contaminaciones del Aire'},
        ),
        migrations.AlterModelOptions(
            name='localizacion',
            options={'verbose_name': 'Localizacion', 'verbose_name_plural': 'Localizaciones'},
        ),
        migrations.AlterModelOptions(
            name='noticia',
            options={'verbose_name': 'Noticia', 'verbose_name_plural': 'Noticias'},
        ),
        migrations.AlterModelOptions(
            name='reciclaje',
            options={'verbose_name': 'Punto de Reciclaje', 'verbose_name_plural': 'Puntos de Reciclajes'},
        ),
        migrations.AlterModelOptions(
            name='sensor',
            options={'verbose_name': 'Sensor', 'verbose_name_plural': 'Sensores'},
        ),
        migrations.AlterModelTable(
            name='contaminacionacustica',
            table='contaminacionAcustica',
        ),
        migrations.AlterModelTable(
            name='contaminaciondelaire',
            table='contaminacionDelAire',
        ),
        migrations.AlterModelTable(
            name='localizacion',
            table='localizacion',
        ),
        migrations.AlterModelTable(
            name='noticia',
            table='noticia',
        ),
        migrations.AlterModelTable(
            name='reciclaje',
            table='reciclaje',
        ),
        migrations.AlterModelTable(
            name='sensor',
            table='sensor',
        ),
    ]