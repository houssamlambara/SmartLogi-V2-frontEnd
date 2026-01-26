import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';
import { ReceiverModel } from '../../features/receivers/models/receiver.model';

@Injectable({
  providedIn: 'root',
})
export class receviersService {
  private apiSer = inject(ApiService);

  getReceivers(): Observable<ReceiverModel[]> {
    return this.apiSer.get<ReceiverModel[]>(`destinations`).pipe(
      map((resp: any) => {
        return resp.data.content || resp.data;
      })
    );
  }

  // Alias pour NgRx Effects
  getAllReceivers(): Observable<ReceiverModel[]> {
    return this.getReceivers();
  }

  createReceiver(receiver: any): Observable<any> {
    return this.apiSer.post(`destinations`, receiver);
  }
}
