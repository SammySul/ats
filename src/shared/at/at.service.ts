import {
  Observable,
  ReplaySubject,
  filter,
  map,
  of,
  startWith,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { storageService } from '../storage.service';
import { At, defaultAts } from './at.model';

class AtService {
  private readonly _ats$ = new ReplaySubject<At[]>(1);
  readonly ats$ = this._ats$.asObservable();

  constructor() {
    this.getAts$()
      .pipe(
        switchMap((ats) => {
          return ats.length === 0
            ? this.addAt$(defaultAts)
            : of(ats).pipe(tap((ats) => this._ats$.next(ats)));
        })
      )
      .subscribe();
  }

  addAt$(ats: At[]): Observable<At[]> {
    return this.getAts$().pipe(
      startWith([]),
      switchMap((oldAts) =>
        storageService
          .set$<At[]>('ats', [
            ...ats.filter(
              (at) =>
                !oldAts.find((oldAt) => oldAt.abbreviation === at.abbreviation)
            ),
            ...oldAts,
          ])
          .pipe(
            tap((ats) => {
              this._ats$.next(ats);
            }),
            map(() => ats)
          )
      )
    );
  }

  removeAt$(abbreviation: string): Observable<At> {
    return this.getAts$().pipe(
      switchMap((ats) =>
        storageService
          .set$(
            'ats',
            ats.filter((b) => b.abbreviation !== abbreviation)
          )
          .pipe(
            tap((ats) => this._ats$.next(ats)),
            map((ats) => ats.find((at) => at.abbreviation === abbreviation)!)
          )
      )
    );
  }

  updateAt$(abbreviation: string, editedAt: At): Observable<At> {
    return this.ats$.pipe(
      take(1),
      filter((ats) => !!ats.find((at) => at.abbreviation === abbreviation)),
      switchMap((ats) => {
        return storageService
          .set$('ats', [
            editedAt,
            ...ats.filter((b) => b.abbreviation !== abbreviation),
          ])
          .pipe(
            tap((ats) => this._ats$.next(ats)),
            map(() => editedAt)
          );
      })
    );
  }

  getSearchUrl(at: At, query: string): string {
    const patternToUse = at.pattern ?? at.default;
    return patternToUse.replace('@@@', query);
  }

  private getAts$(): Observable<At[]> {
    return storageService.get$<At[]>('ats').pipe(map((data) => data ?? []));
  }
}

export const atService = new AtService();
