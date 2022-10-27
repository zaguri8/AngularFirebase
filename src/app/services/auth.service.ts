import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { onAuthStateChanged, User } from '@angular/fire/auth'
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$ = new Observable<User | null>()
  constructor(public auth: AngularFireAuth) {
    // when the user state changes -> do stuff (logout/fetch extra data)
    this.user$ = this.auth.authState as Observable<User | null>
  }

  async signUp(email: string, password: string) {
    // sign up a new user to Firebase Auth
    // response : UserCredential | Error
    try {
      const signUpResult = await this.auth.createUserWithEmailAndPassword(email, password)
      return signUpResult
    } catch (e: any) {
      alert(e.message) //ex. (Firebase Error : email already exists)
      return null
    }
  }

  async signIn(email: string, password: string) {
    // sign in to Firebase Auth
    // response : UserCredential | Error
    try {
      const signInResult = await this.auth.signInWithEmailAndPassword(email, password)
      return signInResult
    } catch (e: any) {
      alert(e.message) //ex. (Firebase Error : wrong password)
      return null
    }
  }

  signOut() {
    this.auth.signOut()
  }

}
