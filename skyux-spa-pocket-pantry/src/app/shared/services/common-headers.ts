import { HttpHeaders } from '@angular/common/http';
import { HttpObserve } from '@angular/common/http/src/client';

export const CLIENT_JSON_HEADERS = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Accept', 'application/json');

export const REQUEST_OPTIONS = {
  headers: CLIENT_JSON_HEADERS,
  observe: 'body' as HttpObserve
};
