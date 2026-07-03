const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// API for Quiz 1 (FCFS & SJF Data)
app.get('/api/quiz1', (req, res) => {
    const data = [
        { id: 1, bt: 4 },
        { id: 2, bt: 3 },
        { id: 3, bt: 1 },
        { id: 4, bt: 5 }
    ];
    res.json(data);
});

// API for Quiz 2 (Priority Data)
app.get('/api/quiz2', (req, res) => {
    const data = [
        { id: 1, bt: 10, priority: 3 },
        { id: 2, bt: 5,  priority: 1 },
        { id: 3, bt: 8,  priority: 2 }
    ];
    res.json(data);
});

// Main Page Route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running beautifully on http://localhost:${PORT}`);
});
