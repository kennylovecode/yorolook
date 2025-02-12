export interface ITask<TParams,TResult>{
  id: string
  account_uuid: string
  title: string
  type: string
  method: string
  params: TParams|any
  priority: number
  status: number
  result: TResult|any
  duration: number
  created_at: Date
  updated_at: Date
}



export interface ITaskPublish {
  id: string
  task: any
  user: any
  directory: any
  cover: string
  images: string[]
  status: number
}
