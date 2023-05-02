from rest_framework import status
from rest_framework.response import Response
from .serializer import *
from rest_framework.decorators import api_view
from .models import *
import numpy as np
from pydub import AudioSegment



@api_view(['GET'])
def reciclaje_api_view(request):
    if request.method == 'GET':
        reci = Reciclaje.objects.all()
        serializer = ReciclajeSerializer(reci, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def noticia_api_view(request):
    if request.method == 'GET':
        noti = Noticia.objects.all()
        serializer = Noticia1Serializer(noti, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def contaminacionacustica_api_view(request):
    if request.method == 'GET':
        acus = ContaminacionAcustica.objects.all()
        serializer = ContaminacionAcusticaSerializer(acus, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def contaminacionaire_api_view(request):
    if request.method == 'GET':
        aire = ContaminacionDelAire.objects.all()
        serializer = ContaminacionDelAireSerializer(aire, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def noticia_detail_api_view(request,id):
    if request.method == 'GET':
        noti=Noticia.objects.get(id=int(id))
        serializer = NoticiasSerializer(noti, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def desde_el_micro_api_view(request):
    if request.method == 'POST':
        audio_file = request.FILES['audio']

        # Convertir el archivo de audio a un arreglo numpy
        audio = AudioSegment.from_file(audio_file)
        audio_array = np.array(audio.get_array_of_samples())

        # Calcular los decibelios usando scipy
        decibelios = 20 * np.log10(np.abs(audio_array) / np.iinfo(audio_array.dtype).max)
        promedio = np.mean(decibelios)
        return Response({'decibelios': promedio})