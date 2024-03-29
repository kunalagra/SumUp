from djongo import models
import openai
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
import re
import nltk
import heapq
import json
import requests
import uuid
from transformers import pipeline
import asyncio
# from EdgeGPT import Chatbot, ConversationStyle

# Create your models here.

summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

def bingai(data):
    async def main(data):
        bot = Chatbot(cookiePath='cookies.json')
        data = data.split()
        paras = [' '.join(data[i:i+1800]) for i in range(0, len(data), 1800)]
        # print((await bot.ask(prompt="share the duration of meeting, tasks and persion assigned to it and summarize it:", conversation_style=ConversationStyle.precise, wss_link="wss://sydney.bing.com/sydney/ChatHub",))["item"]["messages"][1]["adaptiveCards"][0]["body"][0]["text"])
        result = []
        for para in paras:
            res = (await bot.ask(prompt="Provide a short and precise takeaways, do not search the web and only use the content from the document. The factual information should be literally from the document. List down important tasks memberwise if there any. The document is: "+para, conversation_style=ConversationStyle.precise, wss_link="wss://sydney.bing.com/sydney/ChatHub"))["item"]["messages"][1]["adaptiveCards"][0]["body"][0]["text"]
            result.append(res.replace("Is there anything else you would like to know?","").replace("The transcript you provided is from a team meeting.","").replace("The duration of the meeting is not mentioned in the transcript.",""))
            # print(res)
        await bot.close()
        return result
# ["item"]["messages"][1]["adaptiveCards"][0]["body"][0]["text"]
    return asyncio.run(main(data))

# def bart_large_cnn(data):
#     # print(data)
#     res = summarizer(data, min_length=100)
#     # print(res)
#     return res[0]['summary_text'].split(".")

def plaraphy_model(data):
    url = 'https://app.plaraphy.com/api/summarizer'
    payload = 'text='+data["para"]+'&output_percent=10'
    headers = {
        'accept': 'application/json',
        'content-type': 'application/x-www-form-urlencoded',
        'authorization': 'Bearer 24379|3FHJrWgFaALt1iKp3L7MujvMDfHohVNfcOyiQBcT',
        'cache-control': 'no-cache',
        }
    response = requests.request('POST', url, data=payload, headers=headers)
    # return response.text
    print(response.text)
    js = json.loads(response.text)
    return js["summary"].split(". ")

def openai_model(data):
    # print(data)
    openai.api_key = "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"
    data = data.split()
    paras = [' '.join(data[i:i+3000]) for i in range(0, len(data), 3000)]
    # print(paras)
    responses = []
    for i in range(len(paras)):
        response = openai.Completion.create(
        model="text-davinci-003",
        prompt=f"Summarize the following meeting in 10 bullet points: {paras[i]}",
        temperature=0.7,
        max_tokens=256,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
        )
        for i in response.choices[0].text.split('\n')[2:]:
            if i[:2] == '10':
                responses.append(i[3:].strip() if i[2:].strip()[-1] == '.' else i[2:].strip() + '.')
            elif i[2:].strip() != "":
                responses.append(i[2:].strip() if i[2:].strip()[-1] == '.' else i[2:].strip() + '.')
    # print(responses)
    return responses

def openai_model_short_response(data):
    # print(data)
    openai.api_key = "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"
    data = data.split()
    paras = [' '.join(data[i:i+3000]) for i in range(0, len(data), 3000)]
    # print(paras)
    responses = []
    for i in range(len(paras)):
        response = openai.Completion.create(
        model="text-davinci-003",
        prompt=f"Summarize the following meeting in bullet points: {paras[i]}",
        temperature=0.7,
        max_tokens=256,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
        )
        for i in response.choices[0].text.split('\n')[2:]:
            if i[:2] == '10':
                responses.append(i[3:].strip() if i[2:].strip()[-1] == '.' else i[2:].strip() + '.')
            elif i[2:].strip() != "":
                responses.append(i[2:].strip() if i[2:].strip()[-1] == '.' else i[2:].strip() + '.')
    # print(responses)
    return responses

def openai_model_gpt(data):
    # print(data)
    openai.api_key = "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"
    data = data.split()
    paras = [' '.join(data[i:i+3000]) for i in range(0, len(data), 3000)]
    # print(paras)
    responses = []
    for i in range(len(paras)):
        response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": "summarize the content \n" + paras[i]},
        ]
        )
        print(response)
        for i in response.choices[0].message.content.split('.'):
            if i != '':
                responses.append(i+'.')
    print(responses)
    return responses


    # print(response, type(response))
    # print(response.choices[0].text, type(response.choices[0].text))
    # return list(map(lambda x: x[0:], response.choices[0].text.split('\n')[2:]))

def lexrank_model(data):
    from sumy.summarizers.lex_rank import LexRankSummarizer
    lexrank_summarizer = LexRankSummarizer()
    sumy_parser = PlaintextParser.from_string(data, Tokenizer('english'))
    lexrank_summary = lexrank_summarizer(sumy_parser.document,sentences_count=10)
    return list(map(str, lexrank_summary))
    # print(lexrank_summary)
    #return lexrank_summary

def latent_summary_analysis_model(data):
    from sumy.summarizers.lsa import LsaSummarizer
    sumy_parser = PlaintextParser.from_string(data, Tokenizer('english'))
    lsa_summarizer = LsaSummarizer()
    lsa_summary = lsa_summarizer(sumy_parser.document, 10)
    return list(map(str, lsa_summary))
    #return lsa_summary

def luhn_model(data):
    from sumy.summarizers.luhn import LuhnSummarizer
    sumy_parser = PlaintextParser.from_string(data, Tokenizer('english'))
    luhn_summarizer = LuhnSummarizer()
    luhn_summary = luhn_summarizer(sumy_parser.document, sentences_count=10)
    return list(map(str,luhn_summary))
    #return luhn_summary

def klsum_model(data):
    from sumy.summarizers.kl import KLSummarizer
    sumy_parser = PlaintextParser.from_string(data, Tokenizer('english'))
    kl_summarizer = KLSummarizer()
    kl_summary = kl_summarizer(sumy_parser.document, sentences_count=10)
    return list(map(str,kl_summary))
    #return kl_summary

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

    summary_sentences = heapq.nlargest(10, sentence_scores, key=sentence_scores.get)
    
    # summary = ' '.join(summary_sentences)
    return summary_sentences

# def text_from_audio(data):
#     model = whisper.load_model("base.en")
#     output = model.transcribe(data)
#     return output['text']

class user(models.Model):
    id = models.IntegerField(primary_key=True)
    username = models.CharField(max_length=100)
    Age = models.IntegerField(blank=True)
    Gender = models.CharField(max_length=100, blank=True)
    Role = models.CharField(max_length=100, blank=True)
    Company = models.CharField(max_length=150, blank=True)
    recent_sum = models.JSONField(default=dict)
    extension_status = models.BooleanField(default=False)

class gmail_group(models.Model):
    id = models.UUIDField(
     default = uuid.uuid4,
     editable = False)
    group_code = models.CharField(primary_key=True, default=uuid.uuid4().hex[:5].upper(), max_length=50, editable=False)
    group_leader = models.CharField(max_length=100)
    leader_name = models.CharField(max_length=100)
    group_members = models.JSONField(default=dict)
