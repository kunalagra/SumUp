import fitz
import django
from django.shortcuts import render,redirect
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404, HttpResponse, JsonResponse
from docx import Document
from . import models
import json
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.conf import settings
import ffmpeg
import requests
import os
import whisper
import pickle
import ffmpeg
import torch
import random
from django.core.mail import send_mail
from django.contrib.sessions.models import Session
import datetime
# Create your views here.

@api_view(['GET'])
def home(request):
	return render(request, 'ip.html')

@api_view(['POST'])
def login_user(request):
	data = json.loads(request.body)
	username = data['email']
	password = data['password']
	user = authenticate(data, username=username, email=username, password=password)
	if user is not None:
		login(request, user)
		if request.user.is_authenticated:
			return Response({"sessionid":django.middleware.csrf.get_token(request), "message":"User logged in", "user":request.user.username, "name":request.user.first_name},status=status.HTTP_200_OK)
		else:
			return Response({"message":False},status=status.HTTP_401_UNAUTHORIZED)
	else:
		return Response({"message":False},status=status.HTTP_401_UNAUTHORIZED)
	
@api_view(['GET'])
def get_user(request):
	if request.user.is_authenticated:
		return Response({"message":"User logged in", "user":request.user.username, "name":request.user.first_name}, status=status.HTTP_200_OK)
	else:
		return Response({"message":"User not logged in"}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
def update_user(request):
	data = json.loads(request.body)
	username = data['email']
	password = data['password']
	name = data['name']
	if User.objects.filter(username=username).exists():
		user = User.objects.get(username=username)
		user.set_password(password)
		user.first_name = name
		user.save()
		return Response({"message":"Password updated", "user":username, "name": user.first_name})
	
	else:
		return Response({"message":False}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
def get_recent_data(request):
	if request.user.is_authenticated:
		if models.user.objects.filter(username=request.user.username).exists():
			person = models.user.objects.get(username=request.user.username)
			return Response({"message":"Data fetched", "user":request.user.username, "recents_sum":person.recent_sum}, status=status.HTTP_200_OK)
		else:
			return Response({"message":"Data not found", "user":request.user.username, "recents_sum":[]}, status=status.HTTP_200_OK)
	else:
		return Response({"message":"User not logged in"}, status=status.HTTP_401_UNAUTHORIZED)
	
# @api_view(['POST'])
# def recent_data(request):
# 	data = json.loads(request.body)
# 	username = data['email']
# 	if models.user.objects.filter(username=username).exists():
# 		print("User exists")
# 		user = models.user.objects.get(username=username)
# 		user.recent_sum.append(data['data'])
# 		user.save()
# 	else:
# 		print("User does not exist")
# 		user = models.user.objects.create(username=username, recent_sum=[data['data']], id= models.user.objects.count()+1)
# 		user.save()
# 	return Response({"message":"Data updated", "user":username})

@api_view(['POST'])
def create_group(request):
	data = json.loads(request.body)
	username = data['email']
	name = data['name']
	if models.gmail_group.objects.filter(group_leader=username).exists():
		return Response({"message":"Group already exists"}, status=status.HTTP_200_OK)
	else:
		group = models.gmail_group.objects.create(group_members=[], group_leader=username, leader_name=name)
		group.save()
		return Response({"message":"Group created", "group_code":group.group_code}, status=status.HTTP_200_OK)

@api_view(['POST'])
def add_members(request):
	data = json.loads(request.body)
	code = data['group_code']
	members = data['members']
	print(members)
	if code=="":
		return Response({"message": "Invalid Team Code"}, status=status.HTTP_400_BAD_REQUEST)
	if models.gmail_group.objects.filter(group_code=code).exists():
		group = models.gmail_group.objects.get(group_code=code)
		# append all members to the group
		if members not in group.group_members:
			group.group_members.append(members)
		group.save()
		return Response({"message":"Members added"}, status=status.HTTP_200_OK)
	else:
		return Response({"message":"Group not found"})

@api_view(['POST'])
def delete_members(request):
	data = json.loads(request.body)
	code = data['group_code']
	member = data['member']
	if models.gmail_group.objects.filter(group_code=code).exists():
		group = models.gmail_group.objects.get(group_code=code)
		group.group_members.remove(member)
		group.save()
		return Response({"message":"Members deleted"})
	else:
		return Response({"message":"Group not found"})

@api_view(['GET'])
def get_groups(request):
	if request.user.is_authenticated:
		if models.gmail_group.objects.filter(group_leader=request.user.username).exists():
			group = models.gmail_group.objects.get(group_leader=request.user.username)
			return Response({"message":"Groups fetched", "code":group.group_code, "groups":group.group_members}, status=status.HTTP_200_OK)
		else:
			return Response({"message":"Groups not found", "groups":None}, status=status.HTTP_200_OK)
	else:
		return Response({"message":"User not logged in"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
def get_member_of_group(request):
	email = request.user.username
	groups = models.gmail_group.objects.values()
	group_part_of = []
	if len(groups)>0:
		for group in groups:
			if group['group_members']:
				for member in group['group_members']:
					if member['email']==email:
						group_part_of.append({
							"group_code":group['group_code'],
							"group_leader":group['group_leader'],
							"leader_name":group['leader_name'],
						})
		return Response({"message":"Groups fetched", "groups":group_part_of}, status=status.HTTP_200_OK)
	else:
		return Response({"message":"Groups not found", "groups":None}, status=status.HTTP_200_OK)

@api_view(['POST'])
def delete_member_of_group(request):
	data = json.loads(request.body)
	code = data['group_code']
	member = data['member']
	if models.gmail_group.objects.filter(group_code=code).exists():
		group = models.gmail_group.objects.get(group_code=code)
		print(group.group_members)
		group.group_members.remove(member)
		group.save()
		return Response({"message":"Member deleted"}, status=status.HTTP_200_OK)
	else:
		return Response({"message":"Group not found"}, status=status.HTTP_200_OK)


@api_view(['POST'])
def send_group_mails(request):
	data = json.loads(request.body)
	username = data['email']
	subject = data['subject']
	message = data['message']
	if models.gmail_group.objects.filter(group_leader=username).exists():
		group = models.gmail_group.objects.get(group_leader=username)
		for member in group.group_members:
			send_mail(
				subject,
				f"Hello {member['name']}, \nHere is the summary for the meet:\n\n{message}\n\nRegards,\nSTM",
				'deexithmadas277@gamil.com',
				[member['email']],
				fail_silently=False,
			)

		return Response({"message":"Mail sent"}, status=status.HTTP_200_OK)
	else:
		return Response({"message":"Group not found"}, status=status.HTTP_200_OK)
	

@api_view(['POST'])
def password_reset(request):
	data = json.loads(request.body)
	print(data)
	username = data['email']
	if User.objects.filter(username=username).exists():
		user = User.objects.get(username=username)
		otp = random.randint(100000,999999)
		user.set_password(str(otp))
		user.save()
		send_mail(
			'Password Reset',
			'Your new password is '+str(otp),
			'deexithmadas277@gamil.com',
			[username],
			fail_silently=False,
		)
		return Response({"message":"Password reset", "user":username, "name": user.first_name}, status=status.HTTP_200_OK)
	else:
		return Response({"message":False}, status=status.HTTP_401_UNAUTHORIZED)
	


@api_view(['GET'])
def logout_user(request):
	print(request.user)
	if request.user.is_authenticated:
		logout(request)
		return Response({"message":"User logged out"})
	else:
		return Response({"message":False}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def signup(request):
	data = json.loads(request.body)
	email = data['email']
	password = data['password']
	name = data['name']
	if User.objects.filter(username=email).exists():
		return Response({"message":"User Already Exist"},status=status.HTTP_204_NO_CONTENT)
	else:
		user = User.objects.create_user(username=email, password=password, first_name=name, email=email)
		user.save()
		login(request, user)
		logout(request)
		return Response({"message":"User created", "user":email, "name": name},status=status.HTTP_200_OK)

# @api_view(['GET'])
# def home_red(request):
# 	return redirect('/')
@api_view(['POST'])
def gen_summ(request):
	# print(request.FILES)
	data = request.POST.dict()
	session = data.get("sessionid",None)
	useremail = data.get("email",None)
	# print(session)
	if request.FILES:
		f = request.FILES['file']
		ext = f.name.split(".")[-1]
		if ext in ['txt', 'docx', 'pdf']:
			# print(ext)
			if ext=="docx":
				doc = Document(f)
				paras = doc.paragraphs
				content = ""
				for i in range(8,len(paras),3):
					p = paras[i+1].text.replace("’","'").replace("‘","'").replace('“','"').replace('”','"').replace("…",".")
					content += paras[i].text.split(" - ")[0] + ": " + p + "\n"
				data["para"] = content
			elif ext=="txt":
				data["para"] = f.read().decode("utf-8")
			elif ext=="pdf":
				doc = fitz.open(stream=f.read(), filetype="pdf")
				text = ""
				for page in doc:
					print(page.get_text('words'))
					for word in page.get_text('words'):
						text += ' ' + word[4].replace("•","").replace("’","'").replace("‘","'").replace('“','"').replace('”','"').replace("…",".")
				data["para"] = text
				# print(text.strip())
			else:
				return Response({"message":"Invalid file format"},status=status.HTTP_400_BAD_REQUEST)
		elif ext in ['mp3', 'wav', 'flac']:
			if ext=="mp3" or ext=="wav" or ext=="flac":
				with open("audio."+ext, 'wb+') as destination:
					for chunk in f.chunks():
						destination.write(chunk)
				print(torch.cuda.is_available())
				model = whisper.load_model("base.en")
				# model = pickle.load(open("CUDAbase.en.sav" if torch.cuda.is_available() else "finalized_base.en_model.sav", 'rb'))
				output = model.transcribe("audio."+ext)
				print("Done")
				data["para"] = output['text']
				os.remove("audio."+ext)
			else:
				return Response({"message":"Invalid file type"},status=status.HTTP_400_BAD_REQUEST)
		elif ext in ['mp4', 'mkv', 'avi']:
			if ext=="mp4" or ext=="mkv" or ext=="avi":
				with open("video."+ext, 'wb+') as destination:
					for chunk in f.chunks():
						destination.write(chunk)
				audio = ffmpeg.input("video."+ext)
				audio = ffmpeg.output(audio, 'audio.wav')
				ffmpeg.run(audio)
				print(torch.cuda.is_available())
				model = whisper.load_model("base.en")
				# model = pickle.load(open("CUDAbase.en.sav" if torch.cuda.is_available() else "finalized_base.en_model.sav", 'rb'))
				output = model.transcribe("audio.wav")
				print("Done")
				data["para"] = output['text']
				os.remove("audio.wav")
				os.remove("video."+ext)
			else:
				return Response({"message":"Invalid file type"},status=status.HTTP_400_BAD_REQUEST)
		else:
			return Response({"message":"Invalid file type"},status=status.HTTP_400_BAD_REQUEST)

	# print(data["para"])

	# data['abstractive'] = {}
	# data['extractive'] = {}

	# m2 = models.openai_model(data['para'])
	# data["abstractive"]["OpenAI"] = m2
	# print(m2)
	
	# m3 =  models.lexrank_model(data["para"])
	# data["extractive"]["LexRank"] = m3
	# print(m3)
	
	# m4 =  models.latent_summary_analysis_model(data["para"])
	# data["extractive"]["LSA"] = m4
	# print(m4)
	
	# m5 =  models.klsum_model(data["para"])
	# data["extractive"]["KL Sum"] = m5
	# print(m5)
	
	# m6 =  models.luhn_model(data["para"])
	# data["extractive"]["Luhn"] = m6
	# print(m6)

	# m7 =  models.nlp_model(data["para"])
	# data["abstractive"]["NLP"] = m7
	# print(data)
	if data['para'] == "":
		return Response({"message":"Input format is not correct"},status=status.HTTP_400_BAD_REQUEST)

	if data['model']=='open-ai':
		data["Model-1"] = models.openai_model(data['para'])
	else:
		data["Model-2"] = models.nlp_model(data['para'])

	# print(data.keys(), data["extractive"].keys(), data["abstractive"].keys())
	if session:
		# print(session)
		session_key = session
		session = Session.objects.get(session_key=session_key)
		uid = session.get_decoded().get('_auth_user_id')
		user = User.objects.get(pk=uid)
		print(user.username)
	elif useremail:
		user = User.objects.get(username=useremail)
		print(user.username)

	d = datetime.datetime.now()
	sumdata = {
		"date": d.strftime("%d-%m-%Y")+ "/" + d.strftime("%H:%M:%S"),
		"transcript": data['para'],
		"summitem": {
          "title": "Model-1" if data['model']=="open-ai" else "Model-2",
          "summary": data['Model-1'] if data['model']=="open-ai" else data['Model-2'],
          "type": "Summary generated by "+ ("Model-1" if data['model']=="open-ai" else "Model-2")
		}
	}

	if models.user.objects.filter(username=user.username).exists():
		print("User exists")
		user = models.user.objects.get(username=user.username)
		user.recent_sum.append(sumdata)
		user.save()
	else:
		print("User does not exist")
		user = models.user.objects.create(username=user.username, recent_sum=[sumdata],id= models.user.objects.count()+1)
		user.save()
	return Response(data,status=status.HTTP_200_OK)