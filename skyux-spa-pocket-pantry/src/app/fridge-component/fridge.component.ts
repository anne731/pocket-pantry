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
            datePurchased: item.datePurchased,
            expiration: item.expiration,
            foodType: item.foodType,
            servingsLeft: item.servingsLeft,
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
            datePurchased: item.datePurchased,
            expiration: item.expiration,
            foodType: item.foodType,
            servingsLeft: item.servingsLeft,
            foodLocation: this.pantryType,
            user: this.context.user.userName
          });
        });
        this.items = Observable.of(this.content);
        this.itemSet = true;
      });
    }

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
        datePurchased: result.data[1],
        expiration: result.data[2],
        foodType: result.data[3],
        servingsLeft: result.data[4],
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
