from django.conf.urls import url
from . import views

urlpatterns = [
    url(
        regex=r'^d3_file/$',
        view=views.SendDatafile.as_view(),
        name='d3_file'
    )
]