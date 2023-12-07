# SumUp - Summarizing TEAMS Meetings

This application is designed to provide a comprehensive solution for summarizing and managing TEAMS meetings. This project aims to streamline the process of summarizing and extracting key insights from TEAMS meetings. The app also uses a companion Chrome Extension for Google Meet which provides Live transcript and ability to connect with the backend.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Tech Stack](#tech-stack)
- [License](#license)

## Features

1. **Automated Summarization**: Utilize GPT 3.5 turbo and Bing AI to generate Summaries.
  
2. **Export & Import**: Import PDFs/DOCX/TXT files and generate Summaries that can be exported as PDFs

4. **User-friendly Dashboard**: Access a well-designed dashboard, providing an intuitive interface for managing and reviewing generated summaries.

5. **Audio and Video**: Import Audio and Video files to generate Summary.

6. **Collaborative**: Create custom teams of user and auto mail them summary to keep them in loop

7. **Secure Authentication**: Implement secure user authentication to ensure data privacy and access control.

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/summarizing-teams-meetings.git
   ```

2. Navigate to the backend folder and install Django dependencies:

   ```bash
   cd summarizing-teams-meetings/backend
   pip install -r requirements.txt
   ```

3. Configure the MongoDB connection in the Django settings.

4. Start the Django server:

   ```bash
   python manage.py runserver
   ```

5. Navigate to the frontend folder and install React dependencies:

   ```bash
   cd summarizing-teams-meetings/frontend
   npm install
   ```

6. Start the React development server:

   ```bash
   npm start
   ```

7. Access the application in your web browser at `http://localhost:3000`.

## Tech Stack

- Backend: Django, MongoDB, GPT3.5, Bing AI, Whisper Models
- Frontend: ReactJS

## License

This project is licensed under the [GNU Affero General Public License v3.0](LICENSE.md). See the [LICENSE.md](LICENSE.md) file for details.

Feel free to reach out to us if you have any questions or issues. Thank you for contributing to Summarizing TEAMS Meetings!
