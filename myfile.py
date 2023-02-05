# from docx import Document

# doc = Document("./tdoc.docx")

# print(("tdoc.docx").split(".")[-1])
 
# print the list of paragraphs in the document
# print('List of paragraph objects:->>>')
# print(doc.paragraphs)
  
# print the list of the runs 
# in a specified paragraph
# print('\nList of runs objects in 1st paragraph:->>>')
# print(doc.paragraphs[0].runs)
  
# print the text in a paragraph 
# print('\nText in the 1st paragraph:->>>')
# print(doc.paragraphs[0].text)
  
# for printing the complete document
# print('\nThe whole content of the document:->>>\n')
# i = 8
# paras = doc.paragraphs
# N = len(paras)
# while i < N and paras[i].text!="Transcript":
#     # print(paras[i].text)
#     i += 1
# i += 2
# while i < N:
#     print(paras[i].text)
#     i += 1

# res = ""
# while i < N:
    # print(pars[i])
    # print(paras[i].text.split(" - ")[0] + ": " + paras[i+1].text)
    # res += 
    # i += 3

s = """Ganesh Utla: Hello. Hello.

Ganesh Utla: Welcome back, Kunal. This is the second part of the interview and I want to get these as quickly as possible because I know you somewhere between. Thank you.

Kunal Agrawal: Thank you. It's my pleasure.

Ganesh Utla: It says on the website you worked doing graphic design for a local branding agency before branching out and starting your own business.

Kunal Agrawal: Yes.

Ganesh Utla: Was that a conscious choice?

Kunal Agrawal: Yes.

Ganesh Utla: Sorry, one sec. We can hear the fan.

Aman Tiwari: [inaudible 00:27]

Ganesh Utla: No, no, That's perfect. Thanks, Aman. Good. Was starting your own company international, or did you just sort of fall into it?

Kunal Agrawal: Actually, Sort of both. I started out doing it as a favour for a friend. I didn't really know what I was doing at the time, but at some point, I found out I was having some success with that, and so I started doing it for local businesses and restaurants. Then it kind of took off from there, and I figured, well, if I'm going to be taking on all these new clients I might as well get a website going and make something out of this, you know?

Ganesh Utla: Sure. What kind of challenges did you experience when you were starting out, that you weren't expecting?

Kunal Agrawal: Hmm, challenges I wasn't expecting.

Ganesh Utla: Hahaha. I keep putting on the spot. I don't think I put that one in the questions either. We're just ad-libbing here.

Kunal Agrawal: No, it's fine. So, challenges.

Ganesh Utla: Okay. I understood. Time to say bye now!

Kunal Agrawal: Okay, once again Thank you for your time.

Ganesh Utla: Same goes for you."""

#MODEL 1
# import requests

# url = "https://api.meaningcloud.com/summarization-1.0"

# payload={
#     'key': '26974ec503b66a278e800edbbbfee2f9',
#     'txt': s,
#     'sentences': 10
# }

# response = requests.post(url, data=payload)

# print('Status code:', response.status_code)
# res = response.json()
# print(res["summary"])

# import requests

# url = "https://enelyou-enelyou-summarization--index--summary--topic--part-of-s.p.rapidapi.com/sumpagejson/"

# payload = "url=http%3A%2F%2Fen.wikipedia.org%2Fwiki%2FNatural_language_processing&length=.1"
# headers = {
# 	"content-type": "application/x-www-form-urlencoded",
# 	"X-RapidAPI-Key": "80a948574fmsh5676ccf6ef9c454p17718cjsneff8135f3b7d",
# 	"X-RapidAPI-Host": "enelyou-enelyou-summarization--index--summary--topic--part-of-s.p.rapidapi.com"
# }

# response = requests.request("POST", url, data=payload, headers=headers)

# print(response.text)

import re
import nltk
import heapq

def nlp_model(data):

    article_text = re.sub(r'\[[0-9]*\]', ' ', data)
    article_text = re.sub(r'\s+', ' ', article_text)

    formatted_article_text = re.sub('[^a-zA-Z]', ' ', article_text )
    formatted_article_text = re.sub(r'\s+', ' ', formatted_article_text)

    sentence_list = nltk.sent_tokenize(article_text)
    nltk.download("stopwords")
    stopwords = nltk.corpus.stopwords.words('english')

    word_frequencies = {}
    for word in nltk.word_tokenize(formatted_article_text):
        if word not in stopwords:
            if word not in word_frequencies.keys():
                word_frequencies[word] = 1
            else:
                word_frequencies[word] += 1
                
    maximum_frequncy = max(word_frequencies.values())

    for word in word_frequencies.keys():
        word_frequencies[word] = (word_frequencies[word]/maximum_frequncy)
        
    sentence_scores = {}
    for sent in sentence_list:
        for word in nltk.word_tokenize(sent.lower()):
            if word in word_frequencies.keys():
                if len(sent.split(' ')) < 30:
                    if sent not in sentence_scores.keys():
                        sentence_scores[sent] = word_frequencies[word]
                    else:
                        sentence_scores[sent] += word_frequencies[word]

    summary_sentences = heapq.nlargest(5, sentence_scores, key=sentence_scores.get)

    # summary = ' '.join(summary_sentences)
    return summary_sentences

print(nlp_model(s))


"""
import speech_recognition as sr

# initialize recognizer class
r = sr.Recognizer()

//
# For Reading Microphone as source
with sr.Microphone() as source:
    print("Talk")
    audio = r.listen(source)
# OR
# For reading audio
filename = "audio_file.wav"
with sr.AudioFile(filename) as source:
    audio_text = r.record(source)
//
# using google to recognize audio
try:
    print("The audio file contains: " + r.recognize_google(audio_text))
except sr.UnknownValueError:
    print("Google Speech Recognition could not understand audio")
except sr.RequestError as e:
    print("Could not request results from Google Speech Recognition service; {0}".format(e))
"""