import {
  Component
} from '@angular/core';

import { SkyFileItem } from '@skyux/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html'
})
export class HomePageComponent {
  public email: string = "";
  public name: string = "";
  public showImage = true;
  public avatarUrl: string | File = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5751d6d8-b125-4f8e-a32e-4df08c2a54a0/d9h4mk2-93c64bde-2811-4f70-890e-661807f2d944.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzU3NTFkNmQ4LWIxMjUtNGY4ZS1hMzJlLTRkZjA4YzJhNTRhMFwvZDloNG1rMi05M2M2NGJkZS0yODExLTRmNzAtODkwZS02NjE4MDdmMmQ5NDQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.vyzqBnyorN_mrLgLJJmOykdl6iE11UVvOera79mf8Mk';

  public get src(): string | File {
      return this.showImage ? this.avatarUrl : undefined;
  }

  public updateSrc(fileItem: SkyFileItem) {
      /*
        This is where you might upload the new avatar,
        but for this demo we'll just update it locally.
      */
      if (fileItem) {
          this.avatarUrl = fileItem.file;
      }
  }
}
