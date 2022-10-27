import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './auth.service';
import Note from '../models/note.model';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  userNotesCollection: AngularFirestoreCollection<Note> | undefined

  userNotes$: Observable<Note[]> | undefined

  userSubscription: Subscription
  constructor(public store: AngularFirestore, private authService: AuthService) {

    this.userSubscription = this.authService.user$.subscribe((user) => {
      if (user !== null) {
        this.userNotesCollection = store.collection(`users`).doc(user.uid).collection('notes')
        this.userNotes$ = this.store.collection(`users`).doc(user.uid).collection<Note>('notes').valueChanges()
      }
    })
  }

  saveNote(user: any, note: Note) {
    const id = this.store.createId()
    note.id = id;
    this.store.collection(`users`)
      .doc(user.uid)
      .collection('notes')
      .doc(id)
      .set(note)
  }

  deleteNote(user: any, note: Note) {
    this.store.collection(`users`)
      .doc(user.uid)
      .collection('notes')
      .doc(note.id)
      .delete()
  }


  ngOnDestroy(): void {
    this.userSubscription.unsubscribe()
  }
}
