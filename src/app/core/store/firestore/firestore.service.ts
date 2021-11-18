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
        plot: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugiat asperiores inventore beatae accusamus odit minima enim, commodi quia, doloribus eius! Ducimus nemo accusantium maiores velit corrupti tempora reiciendis molestiae repellat vero. Eveniet ipsam adipisci illo iusto quibusdam, sunt neque nulla unde ipsum dolores nobis enim quidem excepturi, illum quos!\n',
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
            interrogationQuestion: 'Who\'s alibi is right?', // can keep guessing until wrong (false alibi's should be included)
            answer: 'suspect name',
            unlock: '' // remove one suspect from list
          },
          {
            witnessConclusion: 'Who saw the crime?', // reference should be revealed (job, education, marital, age, residence)
            answer: '',
            unlock: '' // dynamic
          }
        ],
        murderWeapon: '1',
        criminal: '1'
      }
    );
  }
}
