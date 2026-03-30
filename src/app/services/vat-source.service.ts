import { inject, Injectable, signal, computed } from '@angular/core';
import { DEFAULT_COUNTRY_CODE } from './../app.config';


@Injectable({
  providedIn: 'root',
})
export class VatSourceService {
  private defaultCountryCode = inject<string>(DEFAULT_COUNTRY_CODE);
  private vat = signal<string>(this.defaultCountryCode);
  
  countryCode = this.vat.asReadonly();
}
