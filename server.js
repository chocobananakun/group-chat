const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', socket => {
  console.log('ユーザーが接続しました');

  socket.on('join', group => {
    socket.join(group);
    console.log(`グループ ${group} に参加`);
  });

  socket.on('message', msg => {
    io.to(msg.group).emit('message', msg);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`サーバーがポート ${PORT} で起動しました`);
});
