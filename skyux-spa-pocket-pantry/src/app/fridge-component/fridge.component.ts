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
  public fridge: FoodItem[] = [];
  public pantry: FoodItem[] = [];
  public content: FoodItem[] = [];
  public alertList: FoodItem[] =[];
  public dayList: number[] = [];
  public items: Observable<FoodItem[]>;

  @Input()
  public pantryType: string;

  constructor(
    private modal: SkyModalService
  ) {
   }

  public ngOnInit() {
    if (this.pantryType === 'fridge') {
      this.items = Observable.of(this.fridge);
    } else if (this.pantryType === 'pantry') {
      this.items = Observable.of(this.pantry);
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

  public onDeleteButtonClicked(itemName: string) {{
      if (this.pantryType === 'fridge') {
        this.fridge = this.fridge.filter( (item) => {
          return item.name !== itemName;
        });
        this.items = Observable.of(this.fridge);
      } else if (this.pantryType === 'pantry') {
        this.fridge = this.pantry.filter( (item) => {
          return item.name !== itemName;
        });
        this.items = Observable.of(this.pantry);
      }
    }
  }

  public onAddButtonClicked(): void {
    const options: any = {
      ariaDescribedBy: 'docs-modal-content'
    };

    this.eventMessage = 'help me';

    const modalInstance = this.modal.open(AddItemComponent, options.helpKey);

    modalInstance.helpOpened.subscribe((helpKey: string) => {
      this.eventMessage =  `
        Modal header help was invoked with the following help key: ${helpKey}
      `;
    });

    modalInstance.closed.subscribe((result: SkyModalCloseArgs) => {
      let add = new FoodItem(result.data[0], result.data[2], result.data[1], result.data[4], result.data[3] );
      if (result.reason === 'save') {
        if (this.pantryType === 'fridge') {
          console.log(add);
          this.fridge.push(add);
          console.log(this.fridge);
          this.items = Observable.of(this.fridge);
          console.log(this.items);
        } else if (this.pantryType === 'pantry') {
          this.pantry.push(add);
          this.items = Observable.of(this.pantry);
        }
      }
  });
}

}
