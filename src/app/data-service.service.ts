import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(message: string) {
    console.log("message!!!!!!!!!!"+message);
    this.messageSource.next(message);
    this.messageSource.next(message);
    this.currentMessage.subscribe(message=>{console.log(message)})
  }

}