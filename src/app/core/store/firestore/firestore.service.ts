import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  $cases: Observable<any>;

  constructor(
    private fireAuth: AngularFireAuth,
    private  fireStore: AngularFirestore
  ) {
    this.watchCases();
  }

  watchCases() {
    this.$cases = this.fireAuth.user.pipe(
      switchMap( (auth) => {
        if (auth) {
          return this.fireStore.collection<any>(
            'cases',
            ref => ref.limit(80).orderBy('timestamp', 'desc'))
            .valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  addCase(index) {
    const caseDoc = this.fireStore.collection('cases').doc();
    return caseDoc.set(
      {
        id: caseDoc.ref.id,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        title: `Case ${index}`,
        plot: '',
        victim: {
          age: Math.random(),
          education: 'Collage - Computer Science',
          evidence: [
            'Stab Wounds',
            'Bullet Wounds',
            'Gash Wounds',
            'Body found in Water',
            'Suicide letter found',
            'Gang symbol at crime scene',
            'Suspicious text found on phone from spouse',
            'Suspicious text found on phone from friend',
            'Suspicious text found on phone from family',
          ],
          maritalStatus: 'Single',
          occupation: 'Developer',
          residence: 'Atlanta, Ga',
        },
        suspects: [
          {
            playerId: '2',
            age: Math.random(),
            education: 'Collage - Communications',
            interrogation: [
              '',
              '',
              ''
            ],
            maritalStatus: 'Married',
            occupation: 'Sales Rep',
            residence: 'Atlanta, Ga',
            alibi: 'At home watching TV with husband',
          },
          {
            playerId: '2',
            age: Math.random(),
            education: 'Collage - Communications',
            interrogation: [
              '',
              '',
              ''
            ],
            maritalStatus: 'Married',
            occupation: 'Sales Rep',
            residence: 'Atlanta, Ga',
            alibi: 'At home watching TV with husband',
          }
        ],
        witnesses: [
          {
            age: Math.random(),
            education: 'Collage - Computer Science',
            maritalStatus: 'Single',
            occupation: 'Developer',
            residence: 'Atlanta, Ga',
            views: [
              '',
              '',
              ''
            ]
          },
          {
            age: Math.random(),
            education: 'Collage - Computer Science',
            maritalStatus: 'Single',
            occupation: 'Developer',
            residence: 'Atlanta, Ga',
            views: [
              '',
              '',
              ''
            ]
          },
          {
            age: Math.random(),
            education: 'Collage - Computer Science',
            maritalStatus: 'Single',
            occupation: 'Developer',
            residence: 'Atlanta, Ga',
            views: [
              '',
              '',
              ''
            ]
          },
        ],
        clues: [
          {
            evidenceQuestion: 'How did victim die?',
            answer: 'gun',
            unlock: '' // murder weapon is reveled
          },
          {
            interrogationQuestion: 'Who is the criminal?', // one guess at who the criminal is (if wrong...)
            answer: 'suspect name',
            unlock: '' // one guess for win
          },
          {
            witnessConclusion: 'Who saw the crime?', // reference should be revealed (job, education, marital, age, residence)
            answer: '',
            unlock: '' // reveal connection to suspect
          }
        ],
        murderWeapon: '1',
        criminal: '1'
      }
    );
  }
}
