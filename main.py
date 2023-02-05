from flask import Flask, render_template, redirect,request
import json
import requests
import openai
from docx import Document
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
import re
import nltk
import heapq
import os


app = Flask(__name__)

@app.route("/")
def home():
    return render_template("ip.html")   

@app.route("/home")
def red_home():
    return redirect("/")   

@app.route("/submit", methods=['POST'])
def submit():
    if request.method=='POST':
        d = {}
        if request.form["para"]:
            d["para"] = request.form["para"]
        else:
            f = request.files['formFile']
            ext = (f.filename).split(".")[-1]
            f.save(f.filename)
            # print(ext)
            if ext=="docx":
                doc = Document(f.filename)
                paras = doc.paragraphs
                content = ""
                for i in range(8,len(paras),3):
                    p = paras[i+1].text.replace("’","'").replace("‘","'").replace('“','"').replace('”','"').replace("…",".")
                    content += paras[i].text.split(" - ")[0] + ": " + p + "\n"
                d["para"] = content
                
            elif ext=="txt":
                tmp = open(f.filename, "r")
                d["para"] = tmp.read()
                
            else:
                d["para"] = ""

        d["abstractive"] = {}
        d["extractive"] = {}
        # print(d)

        # m1 = plaraphy_model(d)
        # d["abstractive"]["Plaraphy"] = m1
        # print(m1)

        m2 = openai_model(d)
        d["abstractive"]["OpenAI"] = m2
        # print(m2)
        
        m3 = lexrank_model(d["para"])
        d["extractive"]["LexRank"] = m3
        # print(m3)
        
        m4 = latent_summary_analysis_model(d["para"])
        d["extractive"]["LSA"] = m4
        # print(m4)
        
        m5 = klsum_model(d["para"])
        d["extractive"]["KL Sum"] = m5
        # print(m5)
        
        m6 = luhn_model(d["para"])
        d["extractive"]["Luhn"] = m6
        # print(m6)
        m7 = nlp_model(d["para"])
        d["abstractive"]["NLP"] = m7
        # print(d.keys(), d["extractive"].keys(), d["abstractive"].keys())

    return render_template("op.html", data=d)

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
    openai.api_key = "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"
    response = openai.Completion.create(
    model="text-davinci-003",
    prompt=f"Summarize the following meeting in 10 bullet points: {data}",
    temperature=0.7,
    max_tokens=256,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0
    )
    # print(response, type(response))
    # print(response.choices[0].text, type(response.choices[0].text))
    return list(map(lambda x: x[3:], response.choices[0].text.split('\n')[2:]))

def lexrank_model(data):
    from sumy.summarizers.lex_rank import LexRankSummarizer
    lexrank_summarizer = LexRankSummarizer()
    sumy_parser = PlaintextParser.from_string(data, Tokenizer('english'))
    lexrank_summary = lexrank_summarizer(sumy_parser.document,sentences_count=10)
    # return " ".join(list(map(str, lexrank_summary)))
    # print(lexrank_summary)
    return lexrank_summary

def latent_summary_analysis_model(data):
    from sumy.summarizers.lsa import LsaSummarizer
    sumy_parser = PlaintextParser.from_string(data, Tokenizer('english'))
    lsa_summarizer = LsaSummarizer()
    lsa_summary = lsa_summarizer(sumy_parser.document, 10)
    # return " ".join(list(map(str, lsa_summary)))
    return lsa_summary

def luhn_model(data):
    from sumy.summarizers.luhn import LuhnSummarizer
    sumy_parser = PlaintextParser.from_string(data, Tokenizer('english'))
    luhn_summarizer = LuhnSummarizer()
    luhn_summary = luhn_summarizer(sumy_parser.document, sentences_count=10)
    # return " ".join(list(map(str,luhn_summary)))
    return luhn_summary

def klsum_model(data):
    from sumy.summarizers.kl import KLSummarizer
    sumy_parser = PlaintextParser.from_string(data, Tokenizer('english'))
    kl_summarizer = KLSummarizer()
    kl_summary = kl_summarizer(sumy_parser.document, sentences_count=10)
    # return " ".join(list(map(str,kl_summary)))
    return kl_summary

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

if __name__ == "__main__":
    app.run(debug=True)