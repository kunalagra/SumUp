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
    # path('recent_data', views.recent_data, name='recent_data'),
    path('get_data', views.get_recent_data, name='get_data'),
    path('create_group', views.create_group, name='create_group'),
    path('get_groups', views.get_groups, name='get_groups'),
    path('add_members', views.add_members, name='add_members'),
    path('delete_members', views.delete_members, name='delete_members'),
    path('send_mail', views.send_group_mails, name='send_mail'),
    path('get_group_data', views.get_member_of_group, name='get_member_of_group'),
    path('delete_group', views.delete_member_of_group, name='delete_member_of_group'),
    path('rename_sumtitle', views.rename_sumtitle, name='rename_sumtitle'),
    path('update_summary', views.update_summary, name='update_summary'),
    path('delete_summary', views.delete_summary, name='delete_summary'),
    path('save_extension', views.save_extension_status, name='save_extension_status'),
    path('get_extension', views.get_extension_status, name='get_extension_status'),
]
