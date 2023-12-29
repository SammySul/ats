import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { tap } from 'rxjs';
import { At } from '../../shared/at/at.model';
import { atService } from '../../shared/at/at.service';
import { AtsService } from './ats.service';

@Component({
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>
          <button
            (click)="onRemove()"
            color="warn "
            mat-icon-button
            disableRipple
          >
            <mat-icon>remove </mat-icon>
          </button>
          <button
            (click)="onEdit()"
            color="accent"
            mat-icon-button
            disableRipple
          >
            <mat-icon>edit </mat-icon>
          </button>
          {{ at.name }}</mat-card-title
        >
        <mat-card-subtitle
          >Abbreviation: {{ '@' }}{{ at.abbreviation }}</mat-card-subtitle
        >
      </mat-card-header>
      <mat-card-content>
        <p><strong>Pattern:</strong></p>
        <p>
          <u>{{ at.pattern }}</u>
        </p>
        <mat-chip-listbox>
          <mat-chip-option
            color="accent"
            disableRipple
            [selectable]="false"
            [selected]="at.isActive"
          >
            {{ at.isActive ? 'Active' : 'Inactive' }}
          </mat-chip-option>
          @if(at.isIncognito){
          <mat-chip-option disableRipple [selectable]="false" color="accent">
            <img
              matChipAvatar
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Google_Incognito_logo.svg/2048px-Google_Incognito_logo.svg.png"
              alt="Incognito icon"
            />
            Incognito
          </mat-chip-option>
          }
        </mat-chip-listbox>
      </mat-card-content>
    </mat-card>
  `,
  styles: `
    mat-card { 
      box-shadow: 0 0 0 0;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;

      mat-card-title { 
        display: flex;
        align-items: center;
      }

      .mat-mdc-card-header { 
        flex-direction: column;
      }
    }
  `,
  imports: [MatCardModule, MatButtonModule, MatChipsModule, MatIconModule],
  selector: 'app-at',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtComponent {
  private readonly atsService = inject(AtsService);
  private readonly cdr = inject(ChangeDetectorRef);

  @Input({ required: true }) at: At;

  onEdit() {
    this.atsService.editAt$.next(this.at);
  }

  onRemove() {
    atService
      .removeAt$(this.at.abbreviation)
      .pipe(tap(() => this.cdr.detectChanges()))
      .subscribe();
  }
}
