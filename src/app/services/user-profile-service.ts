import { Injectable } from "@angular/core";

export interface Transfer {
    transferID: string;
    date: string;
    time: string;
    price: number;
    transferScreenshot: string;
    extraNotes: string;
    pickup: string;
    dropoff: string;
    nOfPassengers: number;
    trailer: boolean;
    babySeat: boolean;
    distance: number;
    paymentMethod: string;
    totalPrice: number;
}

export interface UserDetails {
    name:  string;
    surname: string;
    mobileNumber: string;
    email: string;
    billingAddress: string;
}

export interface PriceOfExtras {
    babySeat:  number;
    trailer: number;
}

@Injectable()
export class UserProfileService {
    constructor() { }

    private priceOfExtras: PriceOfExtras = {
        babySeat: 50,
        trailer: 150
    }

    private userDetails: UserDetails = {
        name: 'Timothy',
        surname: 'Louw',
        mobileNumber: '0713605377',
        email: 'timlouw.8@gmail.com',
        billingAddress: '650 Cicely Street, Garsfontein, Pretoria, 0042',
    }

    private pastTransfersArray: Transfer[] = [
        {transferID: '1',
        date: "06/01/2018", 
        time: "18:45", 
        price: 105.53, 
        transferScreenshot: "", 
        extraNotes: "past 1 details", 
        pickup: '650 Cicely street Garsfontein',
        dropoff: 'OR Tambo International',
        nOfPassengers: 3,
        trailer: true,
        babySeat: false,
        distance: 88.4,
        paymentMethod: 'Credit Card',
        totalPrice:  105.53 + 150 } 
    ];

    private upcomingTransfersArray: Transfer[] = [
        {transferID: '2', 
        date: "06/01/2018",
        time: "18:45", 
        price: 105.53, 
        transferScreenshot: "", 
        extraNotes: "past 1 details", 
        pickup: '650 Cicely street Garsfontein',
        dropoff: 'OR Tambo International',
        nOfPassengers: 3,
        trailer: false,
        babySeat: true,
        distance: 88.4,
        paymentMethod: 'Credit Card',
        totalPrice: 105.53 + 50}
    ];

    getUpcomingTransfers(){
        return this.upcomingTransfersArray;
    }
    getPastTransfers(){
        return this.pastTransfersArray;
    }
    getUserDetails() {
        return this.userDetails;
    }
    getPriceOfExtras() {
        return this.priceOfExtras;
    }
    
}


 


    