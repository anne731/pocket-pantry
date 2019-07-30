import {
  Component
} from '@angular/core';

import {
  Observable
} from 'rxjs/Observable';

import 'rxjs/add/observable/of';

import {
  SkyModalService,
  SkyModalCloseArgs
} from '@skyux/modals';
import { AddItemComponent } from '../add-item/add-item.component';

@Component({
  selector: 'app-fridge-component',
  templateUrl: './fridge.component.html',
  styleUrls: ['./fridge.component.scss']
})

export class FridgeComponent {
  constructor(
    private modal: SkyModalService
  ) { }
  private idNum: number = 1;
  public valueA: string;
  public eventMessage?: string;
  public iconGroupSelectedValue = 'table';
  public items = Observable.of([
    { id: this.idNum , column1: 'Bell Pepper', column2: '8.30.2019', column3: 'TBD', column4: "Vegetable" }
    // { id: '2', column1: '', column2: '', column3: '', column4: ""},
    // { id: '3', column1: '', column2: '', column3: '', column4: "" },
    // { id: '4', column1: '', column2: '', column3: '', column4: "" },
    // { id: '5', column1: '', column2: '', column3: '', column4: "" },
    // { id: '6', column1: '', column2: '', column3: '', column4: "" },
    // { id: '7', column1: '', column2: '', column3: '', column4: "" }
  ]);

  get ID(): number {
    return this.idNum;
  }
  set ID(value:number) {
    this.idNum = value;
  }

  public onFilterButtonClicked(): void {
    alert('Filter button clicked');
  }

  public onSummaryItemClick(): void {
    alert('Filter summary item clicked');
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
      // if (result.reason === 'save') {
      //   if (result.data.) {
      //     requiredFieldsArray = result.data.requiredFields.split(',').map(function(e: string) {
      //       return e.trim();
      //     });
      //   }
      if (result.reason === 'save') {
        let items = {
          column1: result.data[0],
          column2: result.data[1],
          column3: result.data[2],
          column4: result.data[3]

        }
        console.log(result.data);
      }
        console.log(result.reason);
        console.log(result);
        // this.items.subscribe({id: this.ID, column1:  }) ;
        // this.ID++;
      // }
    });
  }
}
