
export interface IWorkflow {
    id: string;
    name: string;
    desc: string;
    systemWorkflow: boolean;
    owner: any;
    preview: any | null;
    statisticsInfo: any;
    nodeCount: number;
    liked: number;
    covers: any[];
    tags: any[];
    publishTime: string;
    timestamp: string;
    labels: string;
}
export interface ISample {
    createTime: string;
    createTimeTs: string;
    draft: boolean;
    id: string
    lastUpdateTime: string; lastUpdateTimeTs: string;
    nodeCount: string;
    owner: {
        id: string;
        avatar: string,
        name: string
    },
    posterSize: any | null;
    posterUrl: any | null;
    thumbnailUrl: null;
    useCount: string;
    workflowName: string;
}