import axios from "axios";
import { useSnackbarStore } from "@/stores/snackbarStore";
const snackbarStore = useSnackbarStore();
// change the access key to your own
let ACCESS_KEY = localStorage.getItem("WF_ACCESS_KEY") as string

const instance = axios.create({
    baseURL: "/wfp/api",
    timeout: 20000,
    headers: { Authorization: "Bearer" + " " + ACCESS_KEY },
});
axios.defaults.withCredentials = false;

instance.interceptors.response.use(
    async (response) => {
        const data = response.data;
        if(data.code===412){
            await login()
        }
        return response;
    },
    async (error) => {
       
        if (error.response) {
            const status = error.response.status;
            const data = error.response.data;
            snackbarStore.showErrorMessage(data.message);
        } else {
            snackbarStore.showErrorMessage("Network Error");
        }
        return Promise.reject(error);
    }
);


export const login = async (username: string = "13128822298", password: string = "55e1a825f2a9308b56259ff497d38765") => {
    // if (localStorage.getItem("WF_ACCESS_KEY")) {
    //     ACCESS_KEY = localStorage.getItem("WF_ACCESS_KEY") as string
    //     return
    // }
    const { data } = await instance.post(`/uc/pwdLogin`, { channel:null, mobile: username, password, serviceAgreement: true });
    ACCESS_KEY = data.data?.access_token
    localStorage.setItem("WF_ACCESS_KEY", ACCESS_KEY);
    location.reload()
};

export const getWorkflowList = async (tags: string[]) => {
    return await instance.post(`/api/portal/template/list`, {
        "current": "1",
        "size": "100",
        "sort": "RECOMMEND",
        tags
    });
};

export const getTaskList = async () => {
    return await instance.post(`/task/list`, {
        "current": "1",
        "size": "100",
    });
};

export const getOpenSamples = async () => {
    return await instance.post(`/api/workflow/simpleList`, {
        "draft": true
    });
};
export const getMyHistory = async () => {
    return await instance.post(`/api/output/history`, {
        "current": "1",
        "size": "10",
        "status": ["SUCCESS"]
    });
};

export const runWorkflow = async (data: any) => {
    return await instance.post(`/task/openapi/create`, {
        ...data,
        apiKey: "50d91ebd28e54be3b88dd2457c9ee164"
    });
};

export const getWorkflowResult = async (taskId: string) => {
    return await instance.post(`/task/openapi/outputs`, {
        taskId,
        apiKey: "50d91ebd28e54be3b88dd2457c9ee164"
    });
};