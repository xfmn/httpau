// server.js
const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.url === "/live.mp3") {
    res.writeHead(200, {
      "Content-Type": "audio/mpeg",
      "Transfer-Encoding": "chunked",
    });

    const ffmpeg = require("child_process").spawn("ffmpeg", [
      "-f", "pulse",
      "-i", "default",
      "-acodec", "libmp3lame",
      "-b:a", "128k",
      "-f", "mp3",
      "pipe:1"
    ]);

    ffmpeg.stdout.pipe(res);
    req.on("close", () => ffmpeg.kill("SIGINT"));
  } else {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end(`<h2>🔊 音频流</h2><audio controls autoplay src="/live.mp3"></audio>`);
  }
});

server.listen(8000, () => {
  console.log("音频流服务运行中: http://localhost:8000");
});
