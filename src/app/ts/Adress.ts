import {Country} from "./Country";

export class Adress {
  constructor(
    public id:number,
    public firstName:string,
    public lastName:string,
    public email:string,
    public country:Country
  ){

  }
}
