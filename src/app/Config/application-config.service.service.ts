import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationConfigServiceService {
  private endPointPrefix = 'http://localhost:8081/';
  getEndpointFor(api: string): string{
    return this.endPointPrefix + api;
  }
}
