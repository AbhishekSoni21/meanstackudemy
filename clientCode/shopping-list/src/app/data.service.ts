import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, filter, scan } from 'rxjs/operators';
import { Item } from './item';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getShoppingItems() {
    return this.http.get<Item[]>('http://localhost:3000/api/items');
  }

  addShoppingItem(newItem) {
    let httpHeaders = new HttpHeaders();
    httpHeaders.append('content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/item', newItem, {
      headers: httpHeaders,
    });
  }

  deleteShoppingItem(id) {
    return this.http.delete('http://localhost:3000/api/item/' + id);
  }

  updateShoppingItem(newItem) {
    let httpHeaders = new HttpHeaders();
    httpHeaders.append('content-Type', 'application/json');
    return this.http.put(
      'http://localhost:3000/api/item/' + newItem._id,
      newItem,
      {
        headers: httpHeaders,
      }
    );
  }
}
