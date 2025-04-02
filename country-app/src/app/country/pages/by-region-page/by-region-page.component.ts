import { ChangeDetectionStrategy, Component, effect, inject, linkedSignal, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { rxResource } from '@angular/core/rxjs-interop';
import { CountryService } from '../../services/country.service';
import { of, tap } from 'rxjs';
import { Region } from '../../interfaces/region.type';
import { ActivatedRoute, Router } from '@angular/router';


function validateQueryParam( queryParam: string) : Region {
  queryParam = queryParam.toLowerCase();

  const validRegions : Record<string, Region> = {
    'africa': 'Africa',
    'americas': 'Americas',
    'asia': 'Asia',
    'europe': 'Europe',
    'oceania': 'Oceania',
    'antarctic': 'Antarctic',
  };

  return validRegions[queryParam] ?? 'Americas';
}

@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByRegionPageComponent {

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];


  activedRouter = inject(ActivatedRoute);
  router = inject(Router);

  queryRegion = this.activedRouter.snapshot.queryParamMap.get('region') ?? '';

  selectedRegion = linkedSignal<Region>(() => validateQueryParam(this.queryRegion));

  countryService = inject(CountryService);

  regionResource = rxResource({
    request: () => ({ region: this.selectedRegion() }), // que regrese un objeto por si es necesario expadinr se ejecuta cuando la señal cambia
    loader: ({ request }) => {
      if( !request.region ) return of([]);

      this.router.navigate(['/country/by-region'], {
        queryParams: {
          region: request.region
        }
      })

      return this.countryService.searchByRegion(request.region)
    }
  })

 }
