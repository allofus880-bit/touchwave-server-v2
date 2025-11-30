import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" }
});

// public 폴더를 정적 HTML 제공용으로 사용
app.use(express.static("public"));

// 기본 라우트 (URL 접속 시 index.html 보여줌)
app.get("/", (req, res) => {
    res.sendFile(process.cwd() + "/public/index.html");
});

// 소켓 이벤트
io.on("connection", (socket) => {
    console.log("✔ 클라이언트 연결됨:", socket.id);
    socket.emit("connected", { message: "서버 연결 성공!" });

    socket.on("disconnect", () => {
        console.log("❌ 연결 종료:", socket.id);
    });
});

// Railway가 제공하는 PORT 활용
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`🚀 TouchWave Socket.IO Server on PORT: ${PORT}`);
});
