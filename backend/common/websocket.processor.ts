

import { WebSocket } from "ws";

const clients = new Map();
let wss
const startWs = () => {
	if(wss) return
	wss = new WebSocket.Server({ port: 61314 });
	wss.on("connection", (ws) => {
		ws.on("message", (message) => {
			const data = JSON.parse(message);
			// 假设客户端发送的是 { userId: 'uniqueUserId' }
			if (data.userId) {
				clients.set(data.userId, ws); // 将用户 ID 映射到 WebSocket 连接
				console.log(`User connected: ${data.userId}`);
			}
		});

		ws.on("close", () => {
			// 移除断开的客户端
			clients.forEach((client, userId) => {
				if (client === ws) {
					clients.delete(userId);
					console.log(`User disconnected: ${userId}`);
				}
			});
		});
	});
};
// 发送任务状态的函数
const notifyClient = (userId, data) => {
    const client = clients.get(userId);
    if (client && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
};

export default {
	clients,
	startWs,
	notifyClient
}
