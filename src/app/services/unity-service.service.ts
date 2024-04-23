import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UnityServiceService {

   measureArray = [
    { name: "Meter", abbreviation: "mt", toMeter:1},
    { name: "Inch", abbreviation: "in", toMeter: 0.0254 }, 
    { name: "Yard", abbreviation: "yd", toMeter: 0.9144 } ,
    { name: "Feet", abbreviation: "ft", toMeter: 0.3048 } 
  ];

  constructor() { }
  ConvertUnity(from:string, value:number ,to:string ):number {
    const FromInMetter=this.measureArray.find(item=>item.name===from)
    const ToInMeter  = this.measureArray.find(item=>item.name===to) 
   if(FromInMetter && ToInMeter ){
    const valueInMeter = value * FromInMetter.toMeter;
    const newValue = valueInMeter / ToInMeter.toMeter; 
    return parseFloat(newValue.toFixed(2))
   }
   return 0
  }
}

