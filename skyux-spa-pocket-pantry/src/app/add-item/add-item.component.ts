import {
  Component
} from '@angular/core';

import {
  SkyDropdownMessage
} from '@skyux/popovers';

import {
  Subject
} from 'rxjs/Subject';

import {
  SkyModalInstance
} from '@skyux/modals';

@Component({
  selector: 'add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent {
  public title = 'Add a new item to your pantry!';
  public dropdownName: string = 'Catergory Name';
  public dropdownController = new Subject<SkyDropdownMessage>();
  public items: any[] = [{name: 'Fruit'}, {name: 'Vegetables'}, {name: 'Poultry'}, {name: 'Seafood'}, {name: 'Dairy'}, {name: 'Eggs'}];

  private _category: string;
  constructor(
    public instance: SkyModalInstance
  ) { }

  public categoryClicked(item: string): string {
    this.category = item;
    this.dropdownName = item;
    return item;
  }

  get category(): string {
    return this._category;
  }
  set category(value: string) {
    this._category = value;
  }

}
