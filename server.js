const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // Import path module
const port = process.env.PORT || 3000;
const googleAI = new GoogleGenerativeAI(process.env.API_KEY);

const geminiModel = googleAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const app = express();
app.use(bodyParser.json());
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const generate = async (question) => {
  try {
    const prompt = question;
    const result = await geminiModel.generateContent(prompt);
    const response = result.response;
    console.log(response.text());
    return response.text();
  } catch (error) {
    console.log("response error", error);
  }
};

app.get('/api/content', async (req, res) => {
  const data = req.query.question; // Access question from query parameters
  if (!data) {
    return res.status(400).send({ "error": "Question parameter is required" });
  }
  console.log(data);
  const result = await generate(data);
  res.send({ "result": result });
});

app.listen(port, () => {
  console.log(`App is listening at port ${port}`);
});
