import { User } from './user.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

import firebase from 'firebase/app';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

public user$:Observable<User>;
  constructor(public toastController: ToastController,public afAuth:AngularFireAuth, 
    private afs:AngularFirestore, private router: Router) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user)=>{
        if (user){
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();

        }
        return of(null);
      })
    );
   }

   async toast(){
    const toast = await this.toastController.create({
      message: 'Bienvenido de nuevo',
      duration: 2000,
      color:'success'
    });
    toast.present();
   }
  async logout(): Promise<void>{

    try{
      await this.afAuth.signOut();
      
      const toast = await this.toastController.create({
        message: 'Acabas de cerrar sesion',
        duration: 2000,
        color:'danger'
      });
      toast.present();
    }
    catch(error){
      const toast = await this.toastController.create({
        message: error.message,
        duration: 2000,
        color:'danger'
      });
      toast.present();
    }

   }


   async loginGoogle(): Promise<User>{
    try{
     const {user} = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
     this.updateUserData(user);
     this.toast()
     return user;
    }
    catch(error){
     const toast = await this.toastController.create({
       message:error.message,
       duration: 2000,
       color:'danger'
     });
     toast.present();
   }
  }

 async loginAndroidGoogle(){

  /*
    return this.googleAuth.login({}).then(result=>{
      const user_data_google = result //data

      this.afs.collection('users').doc(user_data_google.idToken).set({
        uid:user_data_google.idToken,
        email:user_data_google.email,
        displayName:user_data_google.displayName,
        photoURL:user_data_google.imageUrl

      })
     return   this.afAuth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(null,user_data_google.accessToken))

    })
    */
  }
  private updateUserData(user:User){
    const userRef:AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const data:User = {
      uid:user.uid,
      email:user.email,
      displayName:user.displayName,
      photoURL:user.photoURL,
    };
    return userRef.set(data, {merge:true});
  }
  private registerName(user:User, displayName:string){
   const userRef:AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
   const data : any={
     displayName:displayName
   };
   return userRef.set(data, {merge:true});
 }
}
