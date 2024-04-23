import { Component, OnInit } from '@angular/core';
import { SelectorService } from '../services/selector.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  selector: number = 0;

  constructor(public selectorService: SelectorService, public localStorage :LocalStorageService ) { 
    this.selectorService.changeSelector.subscribe(newSelector => {
      this.selector=newSelector
    })
  }

  ngOnInit(): void {
   const get_selector =this.localStorage.getItem("selector")
   get_selector?  this.selectorService.changeSelector.next(parseInt(get_selector)):""
  }
  changeModeSelector(selector:number){
    this.selectorService.changeSelector.next(selector)
    this.localStorage.setItem("selector",selector )
  }
}
