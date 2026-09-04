const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { WebSocketServer } = require('ws');
const QRCode = require('qrcode');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
};

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === '/api/room') {
    const room = crypto.randomBytes(6).toString('hex');
    const broadcastUrl = `${url.protocol}//${req.headers.host}/broadcast.html?room=${room}`;
    const qrDataUrl = await QRCode.toDataURL(broadcastUrl, { margin: 1, width: 320 });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ room, broadcastUrl, qrDataUrl }));
    return;
  }

  let filePath = url.pathname === '/' ? '/view.html' : url.pathname;
  filePath = path.join(PUBLIC_DIR, filePath);

  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

const wss = new WebSocketServer({ server, path: '/ws' });

// room -> Set<ws>
const rooms = new Map();

wss.on('connection', (ws, req) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const room = url.searchParams.get('room');
  const role = url.searchParams.get('role'); // 'broadcaster' | 'viewer'

  if (!room) {
    ws.close(1008, 'room required');
    return;
  }

  if (!rooms.has(room)) rooms.set(room, new Set());
  rooms.get(room).add(ws);
  ws.room = room;
  ws.role = role;

  ws.on('message', (raw) => {
    let msg;
    try {
      msg = JSON.parse(raw);
    } catch {
      return;
    }
    // Relay signaling messages to everyone else in the room.
    const peers = rooms.get(room);
    if (!peers) return;
    for (const peer of peers) {
      if (peer !== ws && peer.readyState === peer.OPEN) {
        peer.send(JSON.stringify(msg));
      }
    }
  });

  ws.on('close', () => {
    const peers = rooms.get(room);
    if (!peers) return;
    peers.delete(ws);
    if (peers.size === 0) rooms.delete(room);
  });
});

server.listen(PORT, () => {
  console.log(`QR screen share server running on http://localhost:${PORT}`);
});
