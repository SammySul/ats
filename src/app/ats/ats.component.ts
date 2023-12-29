import { AsyncPipe } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ViewChild,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import {
  MatExpansionModule,
  MatExpansionPanel,
} from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  filter,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { At } from '../../shared/at/at.model';
import { atService } from '../../shared/at/at.service';
import { AtComponent } from './at.component';
import { AtsService } from './ats.service';
import { UpsertAtsComponent } from './upsert-ats.component';

@Component({
  template: `
    <mat-accordion multi>
      <mat-expansion-panel #atsAddExpPanel>
        <mat-expansion-panel-header>
          <mat-panel-title>Add/Edit</mat-panel-title>
          <mat-panel-description> </mat-panel-description>
        </mat-expansion-panel-header>
        <app-upsert-ats></app-upsert-ats>
      </mat-expansion-panel>
      <mat-expansion-panel expanded #atsListExpPanel>
        <mat-expansion-panel-header>
          <mat-panel-title>List</mat-panel-title>
          <mat-panel-description> </mat-panel-description>
        </mat-expansion-panel-header>
        <div class="mat-expansion__content">
          @if(ats$ | async; as ats){
          <mat-form-field appearance="outline" color="accent">
            <input
              placeholder="Search"
              matInput
              [formControl]="searchTermCtrl"
            />
          </mat-form-field>
          @for (at of ats; track $index) {
          <app-at [at]="at"></app-at>
          @if($last === false){ <mat-divider></mat-divider> } } @empty {
          <div>
            <span>No {{ '@s' }} found</span>
          </div>
          } }
        </div>
      </mat-expansion-panel>
    </mat-accordion>
  `,
  styles: `
  mat-form-field {
    padding-inline-end: 3rem;
    --mdc-outlined-text-field-container-shape: 30px !important;

  }

  .mat-expansion__content {
    max-height: 75vh;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  `,
  imports: [
    UpsertAtsComponent,
    MatExpansionModule,
    AsyncPipe,
    AtComponent,
    MatDividerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  selector: 'app-ats',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtsComponent implements AfterViewInit {
  private readonly atsService = inject(AtsService);
  private readonly destroyRef = inject(DestroyRef);

  @ViewChild('atsAddExpPanel') atsAddExpPanel: MatExpansionPanel;
  @ViewChild('atsAddExpPanel') atsListExpPanel: MatExpansionPanel;

  readonly searchTermCtrl = new FormControl<string>('');

  ats$ = new BehaviorSubject<At[] | undefined>(undefined);

  constructor() {
    this.searchTermCtrl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((searchTerm) =>
          atService.ats$.pipe(
            tap((ats) =>
              this.ats$.next(
                ats.filter((at) =>
                  (at.name ?? '')
                    .toLowerCase()
                    .includes(searchTerm?.toLowerCase() ?? '')
                )
              )
            )
          )
        ),
        takeUntilDestroyed()
      )
      .subscribe();
  }

  ngAfterViewInit(): void {
    this.atsService.editAt$
      .pipe(
        filter((at) => !!at),
        tap(() => this.atsAddExpPanel.open()),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
}
