import { Injectable } from '@angular/core';
import { Student } from '../../modules/dashboard/pages/students/models';
import { generateRandomString } from '../../shared/utils';
import { delay, interval, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StudentsService {
  getStudentsPromise(): Promise<Student[]> {
    return new Promise<Student[]>((resolve, reject) => {
      setTimeout(() => {
        resolve([
          {
            id: generateRandomString(6),
            name: 'Matias',
            lastName: 'Silva',
          },
          {
            id: generateRandomString(6),
            name: 'Luis',
            lastName: 'Alberto',
          },
        ]);
      }, 3000);
    });
  }

  getStudentsObservable(): Observable<Student[]> {
    return new Observable<Student[]>((subscriber) => {
      const students = [
        {
          id: generateRandomString(6),
          name: 'Matías',
          lastName: 'Silva',
        },
        {
          id: generateRandomString(6),
          name: 'Luis',
          lastName: 'Alberto',
        },
      ];

      setInterval(() => {
        students.push({
          id: generateRandomString(6),
          name: 'NUEVO',
          lastName: 'ESTUDIENTE ' + students.length,
        });

        subscriber.next(students);

        if (students.length === 10) {
          subscriber.complete();
        }
      }, 1000);
    });
  }

  getInterval(): Observable<number> {
    return interval(1000);
  }

  getRoles(): Observable<string[]> {
    return of(['ADMIN', 'STUDENT', 'SELLER']).pipe(delay(1000));
  }

  getFrutas(): Observable<string[]> {
    return of(['Manzanas', 'Bananas', 'Peras']).pipe(delay(3000));
  }
}
