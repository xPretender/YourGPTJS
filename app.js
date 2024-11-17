const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// Prepare body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// Prepare ejs view engine
app.set('view engine', 'ejs'); // Set EJS as the template engine
let conversation = [];

// Serve static files
app.use(express.static(__dirname + '/public'));

// Define routes
app.get('/', (req, res) => {
    res.render('index', { title: 'GPT', conversation });
});

app.post('/', async (req, res) => {
    const prompt = req.body.prompt;
    if (prompt === "") {
        window.alert("Please enter a prompt");
    } else {
        try {
            const result = await model.generateContent(prompt);
            conversation.push({ user: prompt, ai: result.response.text() });
            res.redirect('/');
        } catch (error) {
            console.error('Error:', error);
            // Handle errors gracefully, e.g., display an error message to the user
            res.status(500).send('An error occurred. Please try again later.');
        }
    }
});

// ... other routes for about, services, feedback, etc.

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});