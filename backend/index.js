require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require('multer');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const pdfParse = require('pdf-parse');


const app = express();


const corsConfig = {
    credentials: true,
    origin: true,
};


//middlewares


app.use(express.json());
app.use(cors(corsConfig));

const upload = multer({ dest: 'uploads/' });

let db;


async function initDb() {
    db = await open({
        filename: 'database.db',
        driver: sqlite3.Database
    });
    await db.run(`
        CREATE TABLE IF NOT EXISTS documents (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            filename TEXT,
            upload_date TEXT,
            content TEXT
        )
    `);
}

app.post('/upload', upload.single('file'), async (req, res) => {
    if (req.file.mimetype !== 'application/pdf') {
        return res.status(400).send('Invalid file type');
    }

    /* const pdfDoc = await PDFDocument.load(fs.readFileSync(req.file.path)); */

    let textFormat = '';

    pdfParse(req.file.path).then(result => {
        textFormat += result.text
    });

    const stmt = await db.prepare('INSERT INTO documents (filename, upload_date, content) VALUES (?, ?, ?)');
    const info = await stmt.run(req.file.filename, new Date().toISOString(), textFormat);
    await stmt.finalize();

    res.json({ id: info.lastID, filename: req.file.filename });
});

const API_KEY= 'enter your openai apikey here';
const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: API_KEY, 
});



app.post('/ask', async (req, res) => {
    const { doc_id, question } = req.body;

    const doc = await db.get('SELECT * FROM documents WHERE id = ?', [doc_id]);
    if (!doc) {
        return res.status(404).send('Document not found');
    }

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo-16k',
            prompt: `The following is the content of a document:\n\n${doc.content}\n\nQ: ${question}\nA:`,
            max_tokens: 150, 
            temperature: 0.7, 
        });

        res.json({ answer: response.data.choices[0].text.trim() });
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing your request');
    }
});

const port = process.env.PORT || 8000;
app.listen(port, async () => {
    await initDb();
    console.log(`Server running on ${port}`)
});
