import django
from django.shortcuts import render,redirect
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404, HttpResponse
from docx import Document
from . import models
import json
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
import ffmpeg
import requests
import os
import whisper
import pickle
import ffmpeg
import torch
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
			return Response({"message":"User not logged in"},status=status.HTTP_401_UNAUTHORIZED)
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
		return Response({"message":"User updated", "user":username, "name": name})
	else:
		return Response({"message":False}, status=status.HTTP_403_FORBIDDEN)

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
	username = data['email']
	password = data['password']
	name = data['name']
	if User.objects.filter(username=username).exists():
		return Response({"message":"User Already Exist"},status=status.HTTP_403_FORBIDDEN)
	else:
		user = User.objects.create_user(username=username, password=password, first_name=name, email=username)
		user.save()
		return Response({"message":"User created", "user":username, "name": name},status=status.HTTP_200_OK)

# @api_view(['GET'])
# def home_red(request):
# 	return redirect('/')
@api_view(['POST'])
def gen_summ(request):
	# print(request.FILES)
	data = request.POST.dict()
	if request.FILES:
		if 'file' in request.FILES.keys():
			f = request.FILES['file']
			ext = f.name.split(".")[-1]
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
			else:
				return Response({"message":"Invalid file format"},status=status.HTTP_400_BAD_REQUEST)
		elif 'audio' in request.FILES.keys():
			f = request.FILES['audio']
			ext = f.name.split(".")[-1]
			if ext=="mp3" or ext=="wav" or ext=="flac":
				with open("audio."+ext, 'wb+') as destination:
					for chunk in f.chunks():
						destination.write(chunk)
				model = whisper.load_model("base.en")
				# model = pickle.load(open("CUDAbase.en.sav" if torch.cuda.is_available() else "finalized_base.en_model.sav", 'rb'))
				output = model.transcribe("audio."+ext)
				data["para"] = output['text']
				os.remove("audio."+ext)
			else:
				return Response({"message":"Invalid file type"},status=status.HTTP_403_FORBIDDEN)
		elif 'video' in request.FILES.keys():
			f = request.FILES['video']
			ext = f.name.split(".")[-1]
			if ext=="mp4" or ext=="mkv" or ext=="avi":
				with open("video."+ext, 'wb+') as destination:
					for chunk in f.chunks():
						destination.write(chunk)
				audio = ffmpeg.input("video."+ext)
				audio = ffmpeg.output(audio, 'audio.wav')
				ffmpeg.run(audio)
				model = whisper.load_model("base.en")
				# model = pickle.load(open("CUDAbase.en.sav" if torch.cuda.is_available() else "finalized_base.en_model.sav", 'rb'))
				output = model.transcribe("audio.wav")
				print("Done")
				data["para"] = output['text']
				os.remove("audio.wav")
				os.remove("video."+ext)
			else:
				return Response({"message":"Invalid file type"},status=status.HTTP_403_FORBIDDEN)
		else:
			return Response({"message":"Invalid file type"},status=status.HTTP_403_FORBIDDEN)

	# print(data["para"])
	data['abstractive'] = {}
	data['extractive'] = {}
	m2 = models.openai_model(data['para'])
	data["abstractive"]["OpenAI"] = m2
	# print(m2)
	
	# m3 =  models.lexrank_model(data["para"])
	# data["extractive"]["LexRank"] = m3
	# print(m3)
	
	m4 =  models.latent_summary_analysis_model(data["para"])
	data["extractive"]["LSA"] = m4
	# print(m4)
	
	m5 =  models.klsum_model(data["para"])
	data["extractive"]["KL Sum"] = m5
	# print(m5)
	
	# m6 =  models.luhn_model(data["para"])
	# data["extractive"]["Luhn"] = m6
	# print(m6)
	m7 =  models.nlp_model(data["para"])
	data["abstractive"]["NLP"] = m7
	# print(data)
	# print(data.keys(), data["extractive"].keys(), data["abstractive"].keys())
	return Response(data,status=status.HTTP_200_OK)