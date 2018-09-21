import { Injectable } from "@angular/core";
import { async } from "@angular/core/testing";
import { Observable } from "rxjs";

@Injectable()
export class TransferDistanceService {
    private transferDistance: any;
    distanceSet;

    constructor() { }

    setTransferDistance(distance: any) {
        this.transferDistance = distance;
        this.distanceSet = true;
        console.log('set');
    }

    getTransferDistance() {
        console.log('get');
        return this.transferDistance;
    }
    
}


 


    