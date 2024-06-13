# PDF-Upload-and-Read
#### This repository contains a web application that allows users to upload a PDF file and ask questions based on the content of the uploaded PDF. The application processes the PDF, extracts the text, and uses OpenAI's language model to generate responses to user questions.

## Table of Contents
#### Features
#### Technologies Used
#### Installation
#### Usage
#### Contributing

## Features
#### Upload PDF files
#### Extract text content from PDF files
#### Ask questions based on the content of the PDF
#### Receive accurate answers generated by OpenAI's language model

## Technologies Used
#### Frontend: React
#### Backend: Express.js
#### AI: OpenAI API

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/LORD-JINXXX/PDF-Upload-and-Read.git
    cd pdf-upload-and-read
    ```

2. Install the dependencies:
In the first terminal, install dependencies for the backend server:

    ```bash
    cd backend
    npm install
    ```
In the second terminal, install dependencies for frontend development server:

    ```bash
    cd frontend
    npm install
    ```

4. Create a `.env` file in the root directory and add your NEWS API key:

    ```bash
    OPENAI_API_KEY=your_openai_api_key
    ```

5. Start the development server:

    In the first terminal, start the backend server:
    ```bash
    cd backend
    npm start
    ```

    In the second terminal, start the frontend development server:
    ```bash
    cd frontend
    npm start
    ```

    The app will be available at `http://localhost:3000`.

## Usage
### Upload a PDF file:

#### On the main page, click the "Upload PDF" button and select a PDF file from your device.

### Ask a question:

#### After the PDF is uploaded and processed, enter your question in the input box and press "Submit".

### View the response:

#### The app will display an answer based on the content of the uploaded PDF.


## Contributing
#### We welcome contributions to enhance the features and improve the functionality of this app. To contribute, please follow these steps:

#### Fork the repository.
#### Create a new branch (git checkout -b feature-branch).
#### Make your changes.
#### Commit your changes (git commit -m 'Add some feature').
#### Push to the branch (git push origin feature-branch).
#### Open a pull request.
