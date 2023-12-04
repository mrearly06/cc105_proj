import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}
  isLoggedIn = false;
  async signup(email: string, password: string) {
    const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
    this.isLoggedIn = true;
    return result;
  }

  async signin(email: string, password: string) {
    const result = await this.afAuth.signInWithEmailAndPassword(email, password);
    this.isLoggedIn = true;
    return result;
  }

  async signout() {
    await this.afAuth.signOut();
     this.isLoggedIn = false;
  }
}