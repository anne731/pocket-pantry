import {
  Component, Input
} from '@angular/core';

import {
  BehaviorSubject
} from 'rxjs/BehaviorSubject';

import 'rxjs/add/observable/of';

import {
  SkyModalService,
  SkyModalCloseArgs
} from '@skyux/modals';
import { AddItemComponent } from '../add-item/add-item.component';
import { FoodItem } from '../models/FoodItem';
//import { ListToolbarShowMultiselectToolbarAction } from '@skyux/list-builder/modules/list/state';
import { PocketPantryService } from '../shared/services/pocketPantryService';
import { UserContext } from '../user-context';

@Component({
  selector: 'app-fridge-component',
  templateUrl: './fridge.component.html',
  styleUrls: ['./fridge.component.scss']
})

export class FridgeComponent {
  @Input() public pantryType: string
  constructor(
    private modal: SkyModalService,
    private pantrySvc: PocketPantryService,
    private context: UserContext
  ) {
   }
  private idNum: number = 1;
  public valueA: string;
  public eventMessage?: string;
  public iconGroupSelectedValue = 'table';
  public content : FoodItem[];
  public items : BehaviorSubject<any> = new BehaviorSubject([
    { id: this.idNum , column1: 'Bell Pepper', column2: '08/30/2019', column3: '08/30/2019', column4: "Vegetable", column5: 4 },
    { id: this.idNum , column1: 'Apple', column2: '08/24/2019', column3: '08/31/2019', column4: "Fruit", column5: 2 }
    // { id: '2', column1: '', column2: '', column3: '', column4: ""},
    // { id: '3', column1: '', column2: '', column3: '', column4: "" },
    // { id: '4', column1: '', column2: '', column3: '', column4: "" },
    // { id: '5', column1: '', column2: '', column3: '', column4: "" },
    // { id: '6', column1: '', column2: '', column3: '', column4: "" },
    // { id: '7', column1: '', column2: '', column3: '', column4: "" }
  ]);


  public ngOnInit() {
    this.pantrySvc.getPantry(this.context.user);
    if (this.pantryType == "fridge") {
      //get and display fridge data
    } else if (this.pantryType == "pantry") {
      //get and display pantry data
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

  public makeItemList() {
    let tmp = [];
    for (let item of this.content) {
      let newItm = { id: this.idNum , column1: item.name, column2: item.datePurchased, column3: item.expiration, column4: item.foodType, column5: item.servingsLeft };
      tmp.push(newItm);
    }
    //this.items = Observable.of(tmp);
    this.items.next(tmp);
  }

  public onDeleteButtonClicked(itemName: string) {
    console.log(itemName);
    let tmp : any[] = [];
    this.items.subscribe((itemslst: any[] )=> {
      for (let thing of itemslst) { // not really sure how this works with the new foodType functionality??
        if (thing.column1 !== itemName) {
          console.log(thing.column1);
          tmp.push(thing);
        }
      }
    });
    this.items.next(tmp);
    //console.log(this.items);

  }

  public onAddButtonClicked(): void {
    const options: any = {
      ariaDescribedBy: 'docs-modal-content'
    };


    this.eventMessage = "help me";

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

      if (result.reason === 'save') {
        let items = {
          column1: result.data[0],
          column2: result.data[1],
          column3: result.data[2],
          column4: result.data[3],
          column5: result.data[4]

        }
      }
  });
}

}
