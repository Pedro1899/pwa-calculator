import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectorService {
  public changeSelector = new Subject<number>();
  constructor() { }
}
