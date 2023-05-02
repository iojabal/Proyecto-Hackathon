from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed

import ProyectoHackacom.settings
from .serializers import UserSerializer
from .models import User
import jwt,datetime


class RegistroView(APIView):
    def post(self,request):
        serializer=UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class LoginView(APIView):
    def post(self,request):
        correoInstitucional=request.data['correoInstitucional']
        password=request.data['password']
        # hasher = BCryptSHA256PasswordHasher()
        # username = request.data['Username']
        # password=request.data['password']
        # user = UserStatic
        # passwordH = bcrypt.hashpw(password1,bcrypt.gensalt())
        # if user is None:
        #   raise AuthenticationFailed('Credenciales invalidas')

        # algorithm, salt, sha1_hash = user.password.split('$', 2)
        # hashed = bcrypt.hashpw(password, bycrytp.gensalt())
        # user.password = hasher.encode(sha1_hash, salt)

        # if not bcrypt.checkpw(password, user.password):
        user= User.objects.filter(correoInstitucional=correoInstitucional).first()

        if user is None:
            raise AuthenticationFailed('Credenciales invalidas')

        if not user.check_password(password):
            raise AuthenticationFailed('Credenciales invalidas')

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow()+datetime.timedelta(minutes=15),
            'iat': datetime.datetime.utcnow()
        }

        token=jwt.encode(payload, ProyectoFinalIS.settings.LOC, algorithm='HS256')

        response= Response()
        response.set_cookie(key='jwt',value=token,httponly=True)
        response.data={
            'jwt': token
        }

        return response



class UserView(APIView):

    def get(self,request):
        token=request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('no autenticado')

        try:
            payload=jwt.decode(token, ProyectoFinalIS.settings.LOC, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('no autenticado')

        user=User.objects.filter(id=payload['id']).first()
        serializer=UserSerializer(user)
        return Response(serializer.data)

class LogoutView(APIView):

    def post(self,request):
        response= Response()
        response.delete_cookie('jwt')
        response.data= {
            'message': 'pasado'
        }
        return response


