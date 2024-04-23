import { Component, OnInit } from '@angular/core';
import { SelectorService } from '../services/selector.service';
@Component({
  selector: 'app-conversion-calculator',
  templateUrl: './conversion-calculator.component.html',
  styleUrls: ['./conversion-calculator.component.css']
})

export class ConversionCalculatorComponent implements OnInit {
  selector:number =0
  constructor(public selectorService: SelectorService) {
    this.selectorService.changeSelector.subscribe(newSelector => {
     this.selector=newSelector
    });
   }
  ngOnInit(): void {}
}
