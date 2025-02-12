import { defineStore } from "pinia";

import router from "@/router";
import { Account, AccountProfile } from "../api/types/account";
import { IHistoryChat } from "../api/types/aiproxy";
import { removeToken } from "../cache/cookies";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {} as any,
    profile: null as AccountProfile | null,
    userSocket: null as WebSocket | null,
    historyChats: [] as IHistoryChat[],
    agentChats: [] as any[],
    task: {} as any|null,
    taskEvents: []
  }),
  persist: {
    enabled: true,
    strategies: [
      { storage: localStorage, paths: ["user"] },
      // { storage: sessionStorage, paths: ["profile"] }
    ],
  },
  getters: {
  },
  actions: {
    enqueueTask(){
      if(this.taskEvents?.length<=0) return
      this.task = { ...this.taskEvents[0] }
    },
    finishTask(){
      this.task = null
      this.taskEvents.shift()
      if(this.taskEvents.length>0) this.enqueueTask()
    },
    startWs() {
      if(this.userSocket) return
      console.log("staring ws...");
      this.userSocket = new WebSocket(import.meta.env.VITE_WS_HOST);
      this.userSocket.onopen = () => {
        console.log('WebSocket connection established.');
        this.userSocket.send(JSON.stringify({ userId: this.user.id }));
      };

      this.userSocket.onmessage = (event) => {
        const { type,data } = JSON.parse(event.data);
        console.log(type,data)
        if(!data || !type) return
        switch(type){
          case "task":
            this.taskEvents.push(data)
            break;
          default:
            console.log('unknown message type:' + type)
            break;
        }
        if(!this.task?.id) this.enqueueTask()
      };

      this.userSocket.onclose = () => {
        console.log('WebSocket connection closed.');
        this.userSocket = null; // 清空 socket
        const intervalObjId = setInterval(()=>{
          if(this.userSocket) return clearInterval(intervalObjId)
          console.log('ws reconnecting...')
          this.startWs(); // 尝试重连
        },1000)
      };
    },
    setUser(user: any){
      this.user = user
    },
    setProfile(profile: AccountProfile){
      this.profile = profile
    },
    isLoggedIn() {
      return this.user != null
    },
    registerWithEmailAndPassword(email: string, password: string) {
      router.push("/");
    },
    loginWithEmailAndPassword(email: string, password: string) {
      router.push("/");
    },

    loginWithGoogle() {
      router.push("/");
    },

    logout() {
      removeToken();
      router.push({ name: "auth-signin" });
    },
    consumCheck(type,val){
      if(val<0){
        if(this.user && this.user[type]) return this.user[type] >= Math.abs(val)
      }
      return true
    },
    consum(type,val){
      if(this.user && this.user[type]) this.user[type] += val
    },
  },
});
