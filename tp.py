import speech_recognition as sr
from pydub import AudioSegment
import pyttsx3

r = sr.Recognizer()

def SpeakText(command):
    engine = pyttsx3.init()
    engine.say(command)
    engine.runAndWait()

# ip = ""
# while ip!='q':
#     ip = input("Enter: ")
#     try:
         
#         with sr.Microphone() as source2:
         
#             # r.adjust_for_ambient_noise(source2, duration=0.2)
             
#             audio2 = r.listen(source2)
             
#             MyText = r.recognize_google(audio2)
#             MyText = MyText.lower()
 
#             print("Did you say ",MyText)
#             # SpeakText(MyText)
             
#     except sr.RequestError as e:
#         print("Could not request results; {0}".format(e))
         
#     except sr.UnknownValueError:
#         print("unknown error occurred")


# src=(r"./tempaudio.mp3")
# sound = AudioSegment.from_mp3(src)
# sound.export("./tempaudio.wav", format="wav")

r = sr.Recognizer()

file_audio = sr.AudioFile('tempaudio.wav')
# print(type(file_audio))
with file_audio as source:
   audio_text = r.record(source)

# print(type(audio_text))
# print(r.recognize_google(audio_text))
