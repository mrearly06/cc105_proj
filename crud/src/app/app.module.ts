import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { PostComponent } from './post/post.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AuthService } from './auth.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './authGuard.service';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { EditProfileModalComponent } from './edit-profile-modal/edit-profile-modal.component';




const routes: Routes = [
  { path: '', redirectTo: 'auth-si', pathMatch: 'full' },
  { path: 'post-list', component: PostListComponent, canActivate: [AuthGuard] },
  { path: 'post-add', component: PostEditComponent, canActivate: [AuthGuard] },
  { path: 'auth-si', component: AuthComponent },
  { path: 'post-edit/:index', component: PostEditComponent, canActivate: [AuthGuard] },
  { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] }
 
]
const firebaseConfig = {
  apiKey: "AIzaSyBAUCnP_1vxhjCpdp4W5T4u3dUO3v3pTxA",
  authDomain: "projectpost-12d4d.firebaseapp.com",
  databaseURL: "https://projectpost-12d4d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "projectpost-12d4d",
  storageBucket: "projectpost-12d4d.appspot.com",
  messagingSenderId: "754345797045",
  appId: "1:754345797045:web:463f95868adf98d96425fc",
  measurementId: "G-HPYZDK2Y4Z"
};
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    PostComponent,
    PostListComponent,
    PostEditComponent,
    UserProfileComponent,
    EditProfileModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideStorage(() => getStorage()),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }