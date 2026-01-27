import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';
import { senderModel } from '../models/sender.model';

@Injectable({
  providedIn: 'root',
})
export class senderService {
  private apiSer = inject(ApiService);

  getSenders(): Observable<senderModel[]> {
    return this.apiSer.get<senderModel[]>(`clients`).pipe(
      map((resp: any) => {
        return resp.data.content || resp.data;
      })
    );
  }
  createSender(sender: any): Observable<any> {
    return this.apiSer.post(`clients`, sender);
  }
}
