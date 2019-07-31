import {
  Component, Input, OnInit, ChangeDetectorRef
} from '@angular/core';

import 'rxjs/add/observable/of';

import {
  SkyModalService,
  SkyModalCloseArgs
} from '@skyux/modals';
import { AddItemComponent } from '../add-item/add-item.component';
import { FoodItem } from '../models/FoodItem';
import { BehaviorSubject } from 'rxjs';

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
  public alertList: FoodItem[] = [];
  public dayList: number[] = [];

  public items: BehaviorSubject<FoodItem[]> = new BehaviorSubject([]);

  @Input()
  public pantryType: string;

  constructor(
    private modal: SkyModalService,
    private changeDetector: ChangeDetectorRef
  ) {
   }

  public ngOnInit() {
    if (this.pantryType === 'fridge') {
      this.fridge.push(new FoodItem("apple", "08.02.2019","07.21.2019",3,"Fruit"));
      this.items.next(this.fridge);
    } else if (this.pantryType === 'pantry') {
      this.pantry.push(new FoodItem("apple", "08.02.2019","07.21.2019",3,"Fruit"));
      this.items.next(this.pantry);
    }
    this.makeAlerts();
  }

  public makeAlerts() {
    console.log(this.fridge);
    this.alertList = [];
    this.dayList = [];
    //let today = new Date();
    let content = this.pantryType == "fridge" ? this.fridge : this.pantry;
    content.forEach(element => {
      
      let month = element.expirationDate.slice(0,2);
      let day = element.expirationDate.slice(3, 5);
      let year = element.expirationDate.slice(6, 10);
      let ex = new Date(+year, +month-1, +day);
      let daysBtwn = Math.ceil((ex.valueOf() - new Date().valueOf()) / (1000*60*60*24));
      if (daysBtwn < 5) {
        this.alertList.push(element);
        this.dayList.push(daysBtwn);
      }
    });
    console.log(this.alertList[0].name);
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
      if (this.pantryType === 'fridge') {
        let temp: FoodItem[] = [];
        this.fridge.forEach( (item) => {
          if (item.name !== itemName) {
            temp.push(item);
          }
        });
        this.items.next(temp);
      } else if (this.pantryType === 'pantry') {
        let temp: FoodItem[] = [];
        this.pantry.forEach( (item) => {
          if (item.name !== itemName) {
            temp.push(item);
          }
        });
        this.items.next(temp);
      }
      this.makeAlerts();
      this.changeDetector.checkNoChanges();

    
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
      let add = new FoodItem(result.data[0], result.data[2], result.data[1], result.data[4], result.data[3]);
      if (result.reason === 'save') {
        if (this.pantryType === 'fridge') {
          this.fridge.push(add);
          this.items.next(this.fridge);
        } else if (this.pantryType === 'pantry') {
          this.pantry.push(add);
          this.items.next(this.pantry);
        }
      }
      this.makeAlerts();
      this.changeDetector.detectChanges();
  });
}

}
