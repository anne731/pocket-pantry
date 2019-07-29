import {
  Component
} from '@angular/core';

//import { DatePipe } from '@angular/common';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html'
})

export class FoodItem {
  name: string;
  expiration: string = null; // form: MM-DD-YY:HH:MM:SS
  datePurchased: string = null;
  servingsLeft: number = 1;
  foodType: string = "";

  constructor (name: string,
    expiration: string,
    datePurchased: string,
    servingsLeft: number,
    foodType: string
    )
    {
      this.name = name;
      this.expiration = expiration;
      this.datePurchased = datePurchased;
      this.servingsLeft = servingsLeft;
      this.foodType = foodType;

      if (this.datePurchased == "null") {
        var today = new Date();
        var date = today.getFullYear()+"-"+(today.getMonth()+1)+'-'+today.getDate()
              + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        this.datePurchased = date;
      }
      if (this.foodType == "") {
        //webscrape to determine type!
      }
      if (this.expiration == null) {
        //webscrape to find shelf life
        // add shelf life to todays date to get expiration
      }
    }

}

export class HomeComponent {


}
