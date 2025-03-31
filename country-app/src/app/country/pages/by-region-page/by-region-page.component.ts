import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TopMenuComponent } from "../../components/top-menu/top-menu.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";

@Component({
  selector: 'app-by-region-page',
  imports: [TopMenuComponent, CountryListComponent],
  templateUrl: './by-region-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByRegionPageComponent { }
