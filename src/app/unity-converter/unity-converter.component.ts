import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { UnityServiceService } from '../services/unity-service.service';

export interface unity {
  name: string;
  value: number;
}

export interface convertions {
  from: unity;
  to: unity;
  displayValue: string
}
@Component({
  selector: 'app-unity-converter',
  templateUrl: './unity-converter.component.html',
  styleUrls: ['./unity-converter.component.css']
})

export class UnityConverterComponent implements OnInit {
  ConversionList: convertions[] = []
  getUnityArray: { name: string; abbreviation: string; toMeter: number; }[] = []
  constructor(public localStorage: LocalStorageService, private unityServiceService: UnityServiceService) {
    this.getUnityArray = unityServiceService.measureArray
  }

  ngOnInit(): void {
    const getMeasureConvertionList = this.localStorage.getMeasureList("getMeasurelist")
    if (getMeasureConvertionList) {
      this.ConversionList = getMeasureConvertionList
    } else {
      const inicialMeasureConvertion: convertions = { from: { name: "Meter", value: 0 }, to: { name: "Yard", value: 0 }, displayValue: "" }
      this.ConversionList.push(inicialMeasureConvertion)
    }
  }
  NewMeasure() {
    const inicialMeasureConvertion: convertions = { from: { name: "Meter", value: 0 }, to: { name: "Yard", value: 0 }, displayValue: "" }
    this.ConversionList.push(inicialMeasureConvertion)
  }
  deleteMeasure(index: number) {
    this.ConversionList.splice(index, 1);
  }

  toValueChange(event: any, index: number, measurePosition: string) {
    const newValue = event.target.value;
    if (newValue === '') {
      this.ConversionList[index].from.value = 0
      this.ConversionList[index].to.value = 0
      this.ConversionList[index].displayValue = ""
    }

    if (!isNaN(newValue) && newValue !== '' && newValue !== 0) {
      if (measurePosition === 'to') {
        this.ConversionList[index].from.value = newValue
        const fromName = this.ConversionList[index].from.name
        const toName = this.ConversionList[index].to.name
        const toValue = this.unityServiceService.ConvertUnity(fromName, newValue, toName)
        if (toValue !== 0) {
          this.ConversionList[index].to.value = toValue
          const displayValue = newValue + " " + this.getShortName(fromName) + " is " + toValue + " " + this.getShortName(toName)
          this.ConversionList[index].displayValue = displayValue
        }
      } else {
        this.ConversionList[index].to.value = newValue
        const fromName = this.ConversionList[index].to.name
        const toName = this.ConversionList[index].from.name
        const toValue = this.unityServiceService.ConvertUnity(fromName, newValue, toName)
        if (toValue !== 0) {
          this.ConversionList[index].from.value = toValue
          const displayValue = newValue + " " + this.getShortName(fromName) + " is " + toValue + " " + this.getShortName(toName)
          this.ConversionList[index].displayValue = displayValue
        }
      }
    }
  }
  getShortName(name: string): string {
    const getAb = this.getUnityArray.find(item => item.name === name)
    if (getAb) {
      return getAb.abbreviation
    }
    return ""
  }

  changeMeasure(index: number, measurePosition: string) {
    if (measurePosition === 'from') {
      const getFromName = this.ConversionList[index].from.name
      const newFromValue = this.ConversionList[index].from.value
      const getToName = this.ConversionList[index].to.name
      const getValue = this.unityServiceService.ConvertUnity(getFromName, newFromValue, getToName)
      if (getValue !== 0) {
        const getNewtoValue = getValue
        const displayValue = newFromValue + " " + this.getShortName(getFromName) + " is " + getValue + " " + this.getShortName(getToName)
        this.ConversionList[index].displayValue = displayValue
        this.ConversionList[index].to.value = getNewtoValue
      }
    } else {
      const getFromName = this.ConversionList[index].to.name
      const newFromValue = this.ConversionList[index].to.value
      const getToName = this.ConversionList[index].from.name
      const getValue = this.unityServiceService.ConvertUnity(getFromName, newFromValue, getToName)
      if (getValue !== 0) {
        const getNewtoValue = getValue
        const displayValue = newFromValue + " " + this.getShortName(getFromName) + " is " + getValue + " " + this.getShortName(getToName)
        this.ConversionList[index].displayValue = displayValue
        this.ConversionList[index].from.value = getNewtoValue
      }
    }
  }
  saveList() {
    this.localStorage.setMeasureList("getMeasurelist", this.ConversionList)
  }
}
