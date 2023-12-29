import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { filter, shareReplay, switchMap, take, tap } from 'rxjs';
import { At } from '../../shared/at/at.model';
import { atService } from '../../shared/at/at.service';
import { AtsService } from './ats.service';

@Component({
  template: `
    @if({at: at$ | async}; as data){
    <form [formGroup]="atForm">
      <div class="form__section">
        <mat-form-field color="accent" appearance="outline">
          <mat-label>Name</mat-label>
          <input formControlName="name" matInput />
          <mat-error>Required</mat-error>
        </mat-form-field>
        <mat-form-field color="accent" appearance="outline">
          <mat-label>Abbreviation</mat-label>
          <input formControlName="abbreviation" matInput />
          @if(atForm.get('abbreviation')?.hasError('required')) {
          <mat-error>Required</mat-error>
          } @if (atForm.get('abbreviation')?.hasError('pattern')) {
          <mat-error>No whitespace allowed</mat-error>
          }
        </mat-form-field>
      </div>
      <div class="form__section">
        <mat-form-field color="accent" appearance="outline">
          <mat-label>Pattern</mat-label>
          <input matInput formControlName="pattern" />
          @if(atForm.get('pattern')?.hasError('required')) {
          <mat-error>Required</mat-error>
          } @if (atForm.get('pattern')?.hasError('pattern')) {
          <mat-error>Pattern must include '{{ '@@@' }}'</mat-error>
          }
        </mat-form-field>
        @if(data.at?.default){
        <button type="button" mat-flat-button (click)="onResetPattern()">
          Reset
        </button>
        }
      </div>
      <div class="form__section">
        <mat-checkbox color="accent" formControlName="isActive">
          Active
        </mat-checkbox>
        <mat-checkbox color="accent" formControlName="isIncognito">
          Incognito
        </mat-checkbox>
      </div>
      <div class="actions">
        <button type="button" mat-flat-button (click)="onClear()">Clear</button>
        <button
          [disabled]="atForm.pristine"
          type="button"
          mat-flat-button
          (click)="onReset()"
        >
          Reset
        </button>
        <button
          type="button"
          mat-stroked-button
          (click)="onSubmit()"
          [disabled]="atForm.invalid || atForm.pristine"
        >
          {{ data.at ? 'Update' : 'Add' }}
        </button>
      </div>
    </form>
    }
  `,
  styles: `
  form, .form__section {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .actions {
    display: flex;
    gap: 10px;
    margin-block-start: 10px;
  }

  form { 
    align-items: stretch;
    margin: 10px;
  }

  .form__section {
    justify-content: flex-start;
    flex-direction: row;
    align-items: flex-start;
    gap: 20px;
  }

  .mat-mdc-form-field {
    width: 100%;
  }
  `,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatButtonModule,
    AsyncPipe,
  ],
  selector: 'app-upsert-ats',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpsertAtsComponent {
  private readonly atsService = inject(AtsService);

  at$ = this.atsService.editAt$.pipe(
    tap((at) =>
      this.atForm.patchValue(
        at ?? {
          name: '',
          abbreviation: '',
          pattern: '',
          isIncognito: false,
          isActive: true,
        }
      )
    ),
    shareReplay(1),
    takeUntilDestroyed()
  );

  atForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    abbreviation: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Za-z]+$/),
    ]),
    pattern: new FormControl('', [
      Validators.required,
      Validators.pattern(/@{3}/),
    ]),
    default: new FormControl(''),
    isActive: new FormControl(true, [Validators.required]),
    isIncognito: new FormControl(false, [Validators.required]),
  });

  onReset(): void {
    this.at$
      .pipe(
        filter((at): at is At => !!at),
        tap((at) => this.atForm.patchValue(at)),
        take(1)
      )
      .subscribe();
  }

  onSubmit(): void {
    if (this.atForm.invalid || this.atForm.pristine) return;

    this.at$
      .pipe(
        take(1),
        switchMap((at) => {
          return at
            ? atService.updateAt$(at.abbreviation, this.atForm.value as At)
            : atService.addAt$([this.atForm.value as At]);
        })
      )
      .subscribe();
  }

  onResetPattern() {
    this.atForm.patchValue({ pattern: this.atForm.value.default });
    this.atForm.markAsDirty();
  }

  onClear() {
    this.atsService.editAt$.next(undefined);
  }
}
