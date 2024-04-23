import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface currencies {
  shortname: string;
  name: string;
  icon: number
}
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  constructor(private http: HttpClient) { }
  public currencyTable = new Subject<currencies[]>();
  CurrencyArray = [
    { shortname: "USD", name: "US DOLAR", currencyExchangeRate: 1, icon: "$" },
    { shortname: "ARS", name: "Argentine Peso", currencyExchangeRate: 75.269373, icon: "$" },
    { shortname: "AUD", name: "Australian Dollar", currencyExchangeRate: 1.553518, icon: "$" },
    { shortname: "BCH", name: "Bitcoin Cash", currencyExchangeRate: 0.002006, icon: "฿" },
    { shortname: "BGN", name: "Bulgarian Lev", currencyExchangeRate: 1.839541, icon: "лв" },
    { shortname: "BNB", name: "Binance Coin", currencyExchangeRate: 0.001718, icon: "₿" },
    { shortname: "BRL", name: "Brazilian Real", currencyExchangeRate: 5.213224, icon: "R$" },
    { shortname: "BTC", name: "Bitcoin", currencyExchangeRate: 0.000015, icon: "฿" },
    { shortname: "CAD", name: "Canadian Dollar", currencyExchangeRate: 1.37246, icon: "$" },
    { shortname: "CHF", name: "Swiss Franc", currencyExchangeRate: 0.911682, icon: "Fr." },
    { shortname: "CNY", name: "Chinese Yuan", currencyExchangeRate: 7.243416, icon: "¥" },
    { shortname: "CZK", name: "Czech Koruna", currencyExchangeRate: 23.772573, icon: "Kč" },
    { shortname: "DKK", name: "Danish Krone", currencyExchangeRate: 7.017965, icon: "kr." },
    { shortname: "DOGE", name: "Dogecoin", currencyExchangeRate: 6.321263, icon: "Ð" },
    { shortname: "DZD", name: "Algerian Dinar", currencyExchangeRate: 124.445887, icon: "دج" },
    { shortname: "ETH", name: "Ethereum", currencyExchangeRate: 0.00032, icon: "Ξ" },
    { shortname: "EUR", name: "Euro", currencyExchangeRate: 0.940557, icon: "€" },
    { shortname: "GBP", name: "British Pound", currencyExchangeRate: 0.811964, icon: "£" },
    { shortname: "HKD", name: "Hong Kong Dollar", currencyExchangeRate: 7.836343, icon: "$" },
    { shortname: "HRK", name: "Croatian Kuna", currencyExchangeRate: 7.06591, icon: "kn" },
    { shortname: "HUF", name: "Hungarian Forint", currencyExchangeRate: 370.485327, icon: "Ft" },
    { shortname: "IDR", name: "Indonesian Rupiah", currencyExchangeRate: 16252.699398, icon: "Rp" },
    { shortname: "ILS", name: "Israeli Shekel", currencyExchangeRate: 3.767306, icon: "₪" },
    { shortname: "INR", name: "Indian Rupee", currencyExchangeRate: 83.359669, icon: "₹" },
    { shortname: "ISK", name: "Icelandic Krona", currencyExchangeRate: 141.365688, icon: "kr." },
    { shortname: "JPY", name: "Japanese Yen", currencyExchangeRate: 154.731001, icon: "¥" },
    { shortname: "KRW", name: "South Korean Won", currencyExchangeRate: 1380.398796, icon: "₩" },
    { shortname: "LTC", name: "Litecoin", currencyExchangeRate: 0.011885, icon: "Ł" },
    { shortname: "MAD", name: "Moroccan Dirham", currencyExchangeRate: 8.83269, icon: "د.م." },
    { shortname: "MXN", name: "Mexican Peso", currencyExchangeRate: 17.123683, icon: "$" },
    { shortname: "MYR", name: "Malaysian Ringgit", currencyExchangeRate: 4.778029, icon: "RM" },
    { shortname: "NOK", name: "Norwegian Krone", currencyExchangeRate: 11.021915, icon: "kr" },
    { shortname: "NZD", name: "New Zealand Dollar", currencyExchangeRate: 1.693378, icon: "$" },
    { shortname: "PHP", name: "Philippine Peso", currencyExchangeRate: 57.5, icon: "₱" },
    { shortname: "PLN", name: "Polish Zloty", currencyExchangeRate: 4.062077, icon: "zł" },
    { shortname: "RON", name: "Romanian Leu", currencyExchangeRate: 4.679834, icon: "lei" },
    { shortname: "RUB", name: "Russian Ruble", currencyExchangeRate: 104.99999999999999, icon: "₽" },
    { shortname: "SEK", name: "Swedish Krona", currencyExchangeRate: 10.91187, icon: "kr" },
    { shortname: "SGD", name: "Singapore Dollar", currencyExchangeRate: 1.362867, icon: "$" },
    { shortname: "THB", name: "Thai Baht", currencyExchangeRate: 37.050414, icon: "฿" },
    { shortname: "TRY", name: "Turkish Lira", currencyExchangeRate: 32.537904, icon: "₺" },
    { shortname: "TWD", name: "New Taiwan Dollar", currencyExchangeRate: 27.466513, icon: "NT$" },
    { shortname: "XRP", name: "Ripple", currencyExchangeRate: 1.915501, icon: "ɱ" },
    { shortname: "ZAR", name: "South African Rand", currencyExchangeRate: 19.137321, icon: "R" }
  ];
  getExchangeRatesApi(): Observable<any> {
    const apiUrl = 'https://exchange-rates.abstractapi.com/v1/live';
    const apiKey = '89e784edec354bb39bf586fc155c18fb'; // Replace with your API key
    const baseCurrency = 'USD';
    const options = {
      params: {
        api_key: apiKey,
        base: baseCurrency
      }
    };
    return this.http.get(apiUrl, options);
  }
  convertApiResponseToArray(apiResponse: any): any[] {
    const exchangeRates = apiResponse.exchange_rates;
    for (const key in exchangeRates) {
      if (exchangeRates.hasOwnProperty(key)) {
        this.CurrencyArray.forEach(item => {
          if (item.shortname === key) {
            item.currencyExchangeRate = exchangeRates[key]
          }
        })
      }
    }
    return this.CurrencyArray;
  }

  getExchanteRate(from: string, value: number, to: string): number {
    const currencyRateFrom = this.CurrencyArray.find(item => item.shortname == from)?.currencyExchangeRate
    const currencyRateTo = this.CurrencyArray.find(item => item.shortname == to)?.currencyExchangeRate
    if (currencyRateFrom && currencyRateTo) {
      const FromToDolar = value / currencyRateFrom
      const ReturnValue = currencyRateTo * FromToDolar
      return parseFloat(ReturnValue.toFixed(2))
    }
    return 0
  }
}
