import { Observable, from, map, take } from 'rxjs';

class StorageService {
  // constructor() {
  //   chrome.storage.sync.clear();
  // }

  get$<T extends object>(key: string): Observable<T> {
    return from(chrome.storage.sync.get(key)).pipe(
      map((x) => x[key] as T),
      take(1)
    );
  }

  set$<T>(key: string, val: T): Observable<T> {
    return from(chrome.storage.sync.set({ [key]: val })).pipe(
      map(() => val),
      take(1)
    );
  }

  delete$(key: string): Observable<void> {
    return from(chrome.storage.sync.remove(key)).pipe(take(1));
  }
}

export const storageService = new StorageService();
