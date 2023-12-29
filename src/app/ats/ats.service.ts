import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { At } from '../../shared/at/at.model';

@Injectable({
  providedIn: 'root',
})
export class AtsService {
  editAt$ = new BehaviorSubject<At | undefined>(undefined);
}
