export interface TaskModel{
  id:string,
  nameTask:string,
  deadLine:string,
  finishAt:string,
  createAt:string,
  user:{
    id:string,
    name:string,
    username:string,
    email:string,
    sdt:string
  }
}
