import { LightningElement } from 'lwc';

export default class Looping extends LightningElement {
    carList=["Audi","Bmw","Fiat","Ford","Honda","Hyundai"]

    //Array of object
    ceoList=[
        {
            id:1,
            company:"Google",
            name: "Sundar Pichai"
        },
        {
            id:2,
            company:"Apple",
            name: "Tim Cook"
        },
        {
            id:3,
            company:"Facebook",
            name: "Mark Zuckerberg"
        },
        {
            id:4,
            company:"Microsoft",
            name: "Bill Gates"
        }
    ]
}