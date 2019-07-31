export class FoodItem {

  constructor (
    public name: string,
    public expirationDate: string,
    public purchaseDate: string,
    public servings: number,
    public foodType: string
    ) {
      this.name = name;
      this.expirationDate = expirationDate;
      this.purchaseDate = purchaseDate;
      this.servings = servings;
      this.foodType = foodType;

      if (this.purchaseDate === undefined) {
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
              + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        this.purchaseDate = date;
      }
    }

}
