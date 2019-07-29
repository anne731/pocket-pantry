export class FoodItem {

    constructor (public name: string,
      public expiration: string,
      public datePurchased: string,
      public servingsLeft: number,
      public foodType: string
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