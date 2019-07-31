export class FoodItem {

  constructor (
    public name: string,
    public expirationDate: string,
    public purchaseDate: string,
    public servings: number,
    public foodType: string,
    public foodLocation: string,
    public user: string
    ) {
      this.name = name;
      this.expirationDate = expirationDate;
      this.purchaseDate = purchaseDate;
      this.servings = servings;
      this.foodType = foodType;
      this.foodLocation = foodLocation;
      this.user = user;

      if (this.purchaseDate === undefined) {
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
              + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        this.purchaseDate = date;
      }
      if (this.foodType === '') {
        //webscrape to determine type!
      }
      if (this.expirationDate === undefined) {
        //webscrape to find shelf life
        // add shelf life to todays date to get expirationDate
      }
    }

}
