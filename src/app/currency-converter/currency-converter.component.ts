import { Component, OnInit } from '@angular/core';
import { LocalStorageService, currency } from '../services/local-storage.service';
import { ApiServiceService } from '../services/api-service.service';
@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css']
})
export class CurrencyConverterComponent implements OnInit {
  showHistory: boolean = false
  currencyArray: { shortname: string, name: string, currencyExchangeRate: number, icon: string }[] = []
  currencyExchange: currency = {
    from: { shortname: '', value: 0 },
    to: [{ shortname: '', value: 0, result: '' }]
  };
  offline:boolean=true
  ConversionHistory: currency[] = []
  constructor(private apiService: ApiServiceService, private localStorage: LocalStorageService) {
  
  }
  ngOnInit() {
    if (navigator.onLine) {
      this.offline=false
      this.apiService.getExchangeRatesApi().subscribe(response => {
        this.currencyArray = this.apiService.convertApiResponseToArray(response);
      });
    } else {
      this.offline=true
      this.currencyArray = this.apiService.CurrencyArray
    }
    const getHistory = this.localStorage.getCurrentHistory("History")
    if (getHistory) {
      this.ConversionHistory = getHistory
    }
    const getCurrencyConvertionList = this.localStorage.geCurrentCurrency("CurrentCurrency")
    if (getCurrencyConvertionList) {
      this.currencyExchange = getCurrencyConvertionList
    } else {
      const firstFor: { shortname: string, value: number, result: string }[] = []
      firstFor.push({ shortname: "EUR", value: 0, result: "" })
      const inicialCurrencyConvertion: currency = {
        from: { shortname: "USD", value: 0 },
        to: firstFor
      }
      this.currencyExchange = inicialCurrencyConvertion
    }
  }

  SwiftPage() {
    this.showHistory = !this.showHistory
  }

  doExchangeRate(value: string) {
    if (value !== "" && value !== "0") {
      //here we refresh the currencyArray if there is internet
      if (navigator.onLine) {
        this.offline=false
        this.apiService.getExchangeRatesApi().subscribe(response => {
          this.currencyArray = this.apiService.convertApiResponseToArray(response);
          this.procesingData(value)
        });
      } else { this.offline=true
        this.procesingData(value)
      }
    
    }else{
      this.currencyExchange.to.forEach(item => {
        item.value = 0
        item.result = ""
      })
    }
  }
  procesingData(value: string) {
    const fromShortName = this.currencyExchange.from.shortname
    this.currencyExchange.from.value = parseFloat(value)
    this.currencyExchange.to.forEach(item => {
      item.value = this.apiService.getExchanteRate(this.currencyExchange.from.shortname, parseFloat(value), item.shortname)
      const iconFrom = this.currencyArray.find(currency => currency.shortname === fromShortName)?.icon
      const iconTo = this.currencyArray.find(currency => currency.shortname === item.shortname)?.icon
      item.result = iconFrom + ". " + value + "  is  " + iconTo + ". " + item.value
    })
    this.localStorage.setCurrentCurrencty("CurrentCurrency", this.currencyExchange)
    this.ConversionHistory.push(this.currencyExchange)
    this.localStorage.setHistoryCurrencty("History", this.ConversionHistory)
  }

  addNewConversion(){
    const newFor = { shortname: "EUR", value: 0, result: "" }
    this.currencyExchange.to.push(newFor)
  }
  deleteCurrency(index:number){
    this.currencyExchange.to.splice(index, 1);
  }
}
