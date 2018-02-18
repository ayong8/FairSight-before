from rest_framework.views import APIView
from rest_framework.response import Response
from . import models
import json, os

# Create your views here.
class SendDatafile(APIView):

    def get(self, request, format=None):
        file_path = os.path.join('./server/static', '1.json')
        print(os.path.abspath('./css/project.css'))
        data = open(file_path).read()
        jsonData = json.dumps(data)

        return Response(data=jsonData)

