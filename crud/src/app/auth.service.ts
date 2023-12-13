import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {
    // Check localStorage for a user token on initialization
    this.isLoggedIn = !!localStorage.getItem('user');
  }

  isLoggedIn = false;

  async signup(email: string, password: string) {
    const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
    this.createSession(result.user);
    this.isLoggedIn = true;
    return result;
  }

  async signin(email: string, password: string) {
    const result = await this.afAuth.signInWithEmailAndPassword(email, password);
    this.createSession(result.user);
    this.isLoggedIn = true;
    return result;
  }

  async signout() {
    await this.afAuth.signOut();
    this.logout();
    this.isLoggedIn = false;
  }

  // Call this method after successful login
  createSession(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Call this method to check if user is logged in
  checkSession() {
    return localStorage.getItem('user') !== null;
  }


  // Call this method to log out the user
  logout() {
    localStorage.removeItem('user');
  }

  getCurrentUserEmail() {
    const userItem = localStorage.getItem('user');
    const user = userItem ? JSON.parse(userItem) : null;
    return user ? user.email : null;
  }
}