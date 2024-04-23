import { Injectable } from '@angular/core';
export interface measure {
  name: string;
  value: number;
}

export interface currency {
  from: { shortname: string, value: number },
  to: { shortname: string, value: number, result: string }[]
}
export interface convertions {
  from: measure;
  to: measure;
  displayValue: string;
}
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, value);
  }
  setMeasureList(key: string, value: convertions[]): void {
    localStorage.setItem(key, JSON.stringify(value)); // Serialize the value
  }

  getMeasureList(key: string): convertions[] | null {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null; // Deserialize the value
  }
  geCurrentCurrency(key: string): currency | null {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null; // Deserialize the value
  }

  getCurrentHistory(key: string): currency[] | null {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null; // Deserialize the value
  }

  setCurrentCurrencty(key: string, value: currency): void {
    localStorage.setItem(key, JSON.stringify(value)); // Serialize the value
  }
  setHistoryCurrencty(key: string, value: currency[]): void {
    localStorage.setItem(key, JSON.stringify(value)); // Serialize the value
  }
  getItem(key: string): any | null {
    return localStorage.getItem(key);
  }
  removeItem(key: any): void {
    localStorage.removeItem(key);
  }
  clear(): void {
    localStorage.clear();
  }
}
