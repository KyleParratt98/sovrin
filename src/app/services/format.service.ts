import { Injectable } from "@angular/core";

@Injectable()
export class FormatService {
    constructor() { }

    formatMobileNumber(mobileNumber: string): string {
        var spaceIndex =  mobileNumber.indexOf(' ');
        spaceIndex = spaceIndex + 1;
        if (mobileNumber[spaceIndex] == '0') {
          mobileNumber = mobileNumber.substring(0,spaceIndex -1) + mobileNumber.substring(spaceIndex + 1, mobileNumber.length);
        } else {
          mobileNumber = mobileNumber.substring(0,spaceIndex -1) + mobileNumber.substring(spaceIndex, mobileNumber.length);
        }
        for (var i = 0; i < mobileNumber.length; i++) {
          if (mobileNumber[i] == ' ') {
            mobileNumber = mobileNumber.substring(0,i) + mobileNumber.substring(i + 1, mobileNumber.length);
          }
        }
        return mobileNumber;
    }

    formatTime(time: any):string {
      var timeToReturn: any;
      if (time.hour > -1 && time.hour < 10) {
        if (time.minute > -1 && time.minute < 10) {
          timeToReturn = '0' + time.hour + ':0' + time.minute;
        } else {
          timeToReturn = '0' + time.hour + ':' + time.minute;
        }
      } else {
        if (time.minute > -1 && time.minute < 10) {
          timeToReturn = time.hour + ':0' + time.minute;
        } else {
          timeToReturn = time.hour + ':' + time.minute;
        }
      }
      return timeToReturn;
    }
    
}


 


    