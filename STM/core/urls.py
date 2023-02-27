from django.urls import path
from . import views
#from os import environ

# Set this env var so local testing doesnt raise errors
# environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

urlpatterns = [
    #path('', views.home, name='home'),
	# path('home', views.home_red, name='home_r'),
	path('gen_summary',views.gen_summ, name='submit'),
    path('login', views.login_user, name='login'),
    path('signup', views.signup, name='signup'),
    path('get_user', views.get_user, name='get_user'),
    path('logout', views.logout_user, name='logout'),
    path('update_user', views.update_user, name='update_user'),
    path('reset_password', views.password_reset, name='reset_password'),
]
