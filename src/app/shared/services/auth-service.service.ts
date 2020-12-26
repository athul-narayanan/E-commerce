import { Injectable } from '@angular/core';
import firebase from 'firebase'
import { AngularFireAuth } from '@angular/fire/auth'
import { Observable,of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from '../models/app-user';
import { UserService } from './user.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  user: Observable<firebase.User>
  AppUsers : Observable<AppUser>;
  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute,private userService:UserService) {
    this.user = afAuth.authState;
    this.AppUsers = this.getAppUsers();
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/'
    sessionStorage.setItem("returnUrl",returnUrl);
    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
  }

  logOut() {
    this.afAuth.signOut();
  }

  getAppUsers() : Observable<AppUser>{
    return this.user.pipe(
      switchMap(user=> {
        if(user) return this.userService.get(user.uid);
        return of(null)
      })
    )
  }
}
