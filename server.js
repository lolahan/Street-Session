const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// ── API: upcoming events ──────────────────────────────────────────────────
const events = [
  {
    id: 1,
    title: 'Street Sessions at Merrion Square',
    artist: 'The Grattan Brothers',
    date: '2025-04-12T16:00:00',
    location: 'Merrion Square Park, Dublin 2',
    genre: 'Indie Folk',
    free: true,
  },
  {
    id: 2,
    title: 'Street Sessions at Grand Canal',
    artist: 'Aoife Dunne',
    date: '2025-04-15T18:00:00',
    location: 'Grand Canal Square, Dublin 2',
    genre: 'Pop / Soul',
    free: true,
  },
  {
    id: 3,
    title: 'Street Sessions at Smithfield',
    artist: 'Ciarán Flood',
    date: '2025-04-19T17:30:00',
    location: 'Smithfield Square, Dublin 7',
    genre: 'Electronic / Live',
    free: true,
  },
];

app.get('/api/events', (req, res) => {
  res.json({ success: true, count: events.length, data: events });
});

app.get('/api/events/:id', (req, res) => {
  const event = events.find(e => e.id === Number(req.params.id));
  if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
  res.json({ success: true, data: event });
});

// ── API: contact form ────────────────────────────────────────────────────
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'name, email, and message are required' });
  }
  // In production: send email / store in DB
  console.log(`[Contact] From: ${name} <${email}> — ${message}`);
  res.json({ success: true, message: 'Thanks! We will be in touch.' });
});

// ── Catch-all: serve index ───────────────────────────────────────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'street-sessions.html'));
});

app.listen(PORT, () => {
  console.log(`Street Sessions server running at http://localhost:${PORT}`);
});
