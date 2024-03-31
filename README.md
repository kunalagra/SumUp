<h1 align="center">
  <br>
  <a href=""><img src="https://raw.githubusercontent.com/kunalagra/SumUp/main/stm-app/public/stm-logo.png" alt="SumUp" width="200"></a>
  <br>
  SumUp
  <br>
</h1>

<h4 align="center">Summarize Team Meetings</h4>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#credits">Credits</a> •
  <a href="#license">License</a>
</p>

![screenshot](https://raw.githubusercontent.com/kunalagra/SumUp/main/stm-app/public/screenshot.png)

## Key Features

1. **Automated Summarization**: Utilize GPT 3.5 turbo and Bing AI to generate Summaries.
2. **Export & Import**: Import PDFs/DOCX/TXT files and generate Summaries that can be exported as PDFs
4. **User-friendly Dashboard**: Access a well-designed dashboard, providing an intuitive interface for managing and reviewing generated summaries.
5. **Audio and Video**: Supports processing of Audio and Video files to generate Summary using Whisper Model.
6. **Collaborative**: Create custom teams of user and auto mail summary to keep them in loop
7. **Secure Authentication**: Implement secure user authentication to ensure data privacy and access control.
8. **Extension**: A Google Chrome extension was developed that connects to backend to transcribe and store meet summarizes. 



## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) & [Python](https://www.python.org/) installed. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/kunalagra/SumUp

# Go into the repository
$ cd SumUp


# For frontend
$ cd stm-app

# Install dependencies
$ npm install

# Rename .env.example to .env
$ mv .env.example .env

# Run the app
$ npm run dev

# For Backend
$ cd STM

# Install dependencies
$ pip install -r requirements.txt

# Rename .env.example to .env
$ mv .env.example .env

# Run the server
$ python manage.py runserver 
```
> [!IMPORTANT]  
> Populate your .env keys with their respective values. 

> [!NOTE]
> If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.

## Credits

This software uses the following packages:

- [Python](https://www.python.org/)
- [React.JS](https://react.dev/)
- [MongoDB](https://www.mongodb.com/)

Built at Mastek's Deep Blue


## You may also like...

- [MediCall](https://github.com/kunalagra/MediCall) - An AIO Medical platform to connect doctors and patients
- [Codegamy](https://github.com/kunalagra/codegamy) - A LeetCode clone

## License

AGPL-3
