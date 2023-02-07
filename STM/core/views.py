from django.shortcuts import render,redirect
from rest_framework.decorators import api_view
from rest_framework.response import Response
from docx import Document
from . import models
import json
# Create your views here.
@api_view(['GET'])
def home(request):
	return render(request, 'ip.html')

@api_view(['GET'])
def home_red(request):
	return redirect('/')

@api_view(['POST'])
def form_sub(request):
	data = request.POST.dict()

	if "para" not in data:
		f = request.files['formFile']
		ext = (f.filename).split(".")[-1]
		f.save(f.filename)
		if ext=="docx":
			doc = Document(f.filename)
			paras = doc.paragraphs
			content = ""
			for i in range(8,len(paras),3):
				p = paras[i+1].text.replace("’","'").replace("‘","'").replace('“','"').replace('”','"').replace("…",".")
				content += paras[i].text.split(" - ")[0] + ": " + p + "\n"
			data["para"] = content
		elif ext=="txt":
			tmp = open(f.filename, "r")
			data["para"] = tmp.read()
		else:
			return Response({"message":"File not valid"})
		
	data['abstractive'] = {}
	data['extractive'] = {}
	m2 = models.openai_model(data)
	data["abstractive"]["OpenAI"] = m2
	# print(m2)
	
	m3 =  models.lexrank_model(data["para"])
	data["extractive"]["LexRank"] = m3
	# print(m3)
	
	m4 =  models.latent_summary_analysis_model(data["para"])
	data["extractive"]["LSA"] = m4
	# print(m4)
	
	m5 =  models.klsum_model(data["para"])
	data["extractive"]["KL Sum"] = m5
	# print(m5)
	
	m6 =  models.luhn_model(data["para"])
	data["extractive"]["Luhn"] = m6
	# print(m6)
	m7 =  models.nlp_model(data["para"])
	data["abstractive"]["NLP"] = m7
	# print(data.keys(), data["extractive"].keys(), data["abstractive"].keys())
	context = {'data': data}
	return render(request,'op.html',context)
