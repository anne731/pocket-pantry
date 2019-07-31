export class FoodItem {

  constructor (
    public name: string,
    public expiration: string,
    public datePurchased: string,
    public servingsLeft: number,
    public foodType: string,
    public foodLocation: string,
    public user: string
    ) {
      this.name = name;
      this.expiration = expiration;
      this.datePurchased = datePurchased;
      this.servingsLeft = servingsLeft;
      this.foodType = foodType;
      this.foodLocation = foodLocation;
      this.user = user;

      if (this.datePurchased === undefined) {
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
              + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        this.datePurchased = date;
      }
      if (this.foodType === '') {
        //webscrape to determine type!
      }
      if (this.expiration === undefined) {
        //webscrape to find shelf life
        // add shelf life to todays date to get expiration
      }
    }

}
