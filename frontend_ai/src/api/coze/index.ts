import axios from "axios";








// const instance = axios.create({
//     baseURL: "/coze/api",
//     timeout: 20000,
//     headers: { Authorization: "Bearer" + " " + ACCESS_KEY },
// });

// instance.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     (error) => {
//         if (error.response) {
//             const status = error.response.status;
//             const data = error.response.data;
//             snackbarStore.showErrorMessage(data.message);
//         } else {
//             snackbarStore.showErrorMessage("Network Error");
//         }
//         return Promise.reject(error);
//     }
// );

// // https://api.github.com/users/yangjiakai/events/public

// // Get public events for a user
// export const getOnlineInfo = () => {
//     return instance.get(`/v1/bot/get_online_info?bot_id=${BOT_ID}`);
// };

// export const createConversation = (historyChats: any[], meta_data: any) => {
//     return instance.post(`/v1/conversation/create`, {
//         messages: historyChats,
//         meta_data
//     });
// };

// export const chatStream = (conversation_id:string, chats: any[], meta_data: object)=>{
//     return fetch(`/coze/api/v3/chat?conversation_id=${conversation_id}`,{
//         method: "POST",
//         responseType:"stream",
//         headers: {
//             "Authorization": `Bearer ${ACCESS_KEY}`,
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             bot_id: BOT_ID,
//             user_id: meta_data?.id,
//             additional_messages: chats,
//             custom_variables:{
//                 "custom_name": "小正助理"
//             },
//             meta_data,
//             stream: true,
//         })
//     })
// }

// export const runWorkflow = (bot_id: string, workflow_id: string) => {
//     return instance.post(`/workflow/run`, {
//         bot_id: BOT_ID,
//         workflow_id,
//         parameters: {
//             "BOT_USER_INPUT": "TEST"
//         },
//         ext: {},
//         is_async: false,
//     });
// }

// export const runWorkflowStream = (bot_id: string, workflow_id: string) => {
//     return fetch("/coze/api/workflow/stream_run",{
//         method: "POST",
//         responseType:"stream",
//         headers: {
//             "Authorization": `Bearer ${ACCESS_KEY}`
//         },
//         body: JSON.stringify({
//             bot_id: BOT_ID,
//             workflow_id,
//             parameters: {
//                 "BOT_USER_INPUT": "您好啊，请问你能帮我做什么呢"
//             },
//             ext: {},
//             is_async: false,
//         })
//     })
//     // return instance.post(`/workflow/stream_run`, {
//     //     bot_id,
//     //     workflow_id,
//     //     parameters: {
//     //         "BOT_USER_INPUT": "TEST"
//     //     },
//     //     ext: {},
//     //     is_async: false,
//     // },{
//     //     responseType: "stream"
//     // });
// }
