from django.urls import path
from . import views
#from os import environ

# Set this env var so local testing doesnt raise errors
# environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

urlpatterns = [
    #path('', views.home, name='home'),
	# path('home', views.home_red, name='home_r'),
	path('gen_summary',views.gen_summ, name='submit'),
]
