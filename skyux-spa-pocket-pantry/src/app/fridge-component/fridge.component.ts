import {
  Component, Input, OnInit
} from '@angular/core';

import 'rxjs/add/observable/of';

import {
  SkyModalService,
  SkyModalCloseArgs
} from '@skyux/modals';
import { AddItemComponent } from '../add-item/add-item.component';
import { FoodItem } from '../models/FoodItem';
// import { ListToolbarShowMultiselectToolbarAction } from '@skyux/list-builder/modules/list/state';
import { PocketPantryService } from '../shared/services/pocketPantryService';
import { UserContext } from '../user-context';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fridge-component',
  templateUrl: './fridge.component.html',
  styleUrls: ['./fridge.component.scss']
})

export class FridgeComponent implements OnInit {

  private idNum: number = 1;
  public valueA: string;
  public eventMessage?: string;
  public iconGroupSelectedValue = 'table';
  public content: FoodItem[] = [];
  public alertList: FoodItem[] =[];
  public dayList: number[] = [];
  public items: Observable<FoodItem[]>;
  public itemSet: boolean;

  @Input()
  public pantryType: string;

  constructor(
    private modal: SkyModalService,
    private pantrySvc: PocketPantryService,
    private context: UserContext
  ) {
   }

  public ngOnInit() {
    if (this.pantryType === 'fridge') {
      this.pantrySvc.getFridge('anne').subscribe( (data: any[]) => {
        data.forEach( (item: any) => {
          this.content.push({
            name: item.name,
            purchaseDate: item.purchaseDate,
            expirationDate: item.expirationDate,
            foodType: item.foodType,
            servings: item.servings,
            foodLocation: this.pantryType,
            user: this.context.user.userName
          });
        });
        this.items = Observable.of(this.content);
        this.itemSet = true;
      });
    } else if (this.pantryType === 'pantry') {
      this.pantrySvc.getPantry('anne').subscribe( (data: any[]) => {
        data.forEach( (item: any) => {
          this.content.push({
            name: item.name,
            purchaseDate: item.purchaseDate,
            expirationDate: item.expirationDate,
            foodType: item.foodType,
            servings: item.servings,
            foodLocation: this.pantryType,
            user: this.context.user.userName
          });
        });
        this.items = Observable.of(this.content);
        this.itemSet = true;
      });
    }
    this.alertList = [
      new FoodItem("apple", "08.02.2019","07.21.2019",3,"Fruit","fridge","anne")
    ]
    this.makeAlerts();

  }

  public makeAlerts() {
    this.alertList = [];
    this.dayList = [];
    let today = new Date();
    this.content.forEach(element => {
      let month = element.expirationDate.slice(0,2);
      let day = element.expirationDate.slice(3, 2);
      let year = element.expirationDate.slice(5, 4);
      let exDate = new Date(year+'-'+month+'-'+day+'T00:00:00');
      let msBtwn = exDate.getTime() - today.getTime();
      let daysBtwn = Math.floor(msBtwn / (1000*60*60*24));
      if (daysBtwn < 5) {
        this.alertList.push(element);
        this.dayList.push(daysBtwn);
      }
    });
  }

  get ID(): number {
    return this.idNum;
  }
  set ID( value: number ) {
    this.idNum = value;
  }

  public onFilterButtonClicked(): void {
    alert('Filter button clicked');
  }

  public onSummaryItemClick(): void {
    alert('Filter summary item clicked');
  }

  public onDeleteButtonClicked(itemName: string) {
    this.pantrySvc.deleteFood(itemName);
  }

  public onAddButtonClicked(): void {
    const options: any = {
      ariaDescribedBy: 'docs-modal-content'
    };

    this.eventMessage = 'help me';

    const modalInstance = this.modal.open(AddItemComponent, options.helpKey);
    // modalInstance.closed.subscribe((result: SkyModalCloseArgs) => {
    //   console.log(`Modal closed with reason: ${result.reason} and data: ${result.data}`);
    // });

    modalInstance.helpOpened.subscribe((helpKey: string) => {
      this.eventMessage =  `
        Modal header help was invoked with the following help key: ${helpKey}
      `;
    });

    modalInstance.closed.subscribe((result: SkyModalCloseArgs) => {
      let temp = {
        name: result.data[0],
        purchaseDate: result.data[1],
        expirationDate: result.data[2],
        foodType: result.data[3],
        servings: result.data[4],
        foodLocation: this.pantryType,
        user: 'anne'
      };
      if (result.reason === 'save') {
        this.pantrySvc.addFood(temp).subscribe( (item) => {
          this.ngOnInit();
        });
      }
  });
}

}
