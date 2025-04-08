import {Component, Renderer2, importProvidersFrom, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { FirebaseService } from '../../shared/services/firebase.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import {AuthService} from "../../shared/services/authentication/auth.service";
import {SessionStorageService} from "../../shared/services/sessionStorage/session.storage.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,AngularFireAuthModule,FormsModule, ReactiveFormsModule ,AngularFireModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,ToastrModule
],

    providers: [FirebaseService,{ provide: ToastrService, useClass: ToastrService }],


  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  // public showPassword = false;
  disabled = '';
  active: any;
  public showLoader : boolean=false;
  formLogin! : FormGroup;

  constructor(
    public authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private firebaseService: FirebaseService,
    private toastr: ToastrService,
    private sessionStorageService : SessionStorageService
  ) {
    // AngularFireModule.initializeApp(environment.firebase);

     const bodyElement = this.renderer.selectRootElement('body', true);
    //  this.renderer.setAttribute(bodyElement, 'class', 'cover1 justify-center');
  }
  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      username : this.formBuilder.control(""),
      password : this.formBuilder.control(""),
    })
    this.formLogin.get('username')?.setValue('admin');
    this.formLogin.get('password')?.setValue('12345');

  }
   firestoreModule = this.firebaseService.getFirestore();
   databaseModule = this.firebaseService.getDatabase();
   authModule = this.firebaseService.getAuth();
  // firebase
  // email = 'spruko@admin.com';
  // password = 'sprukoadmin';
  errorMessage = ''; // validation _error handle
  _error: { name: string; message: string } = { name: '', message: '' }; // for firbase _error handle

  clearErrorMessage() {
    this.errorMessage = '';
    this._error = { name: '', message: '' };
  }

  login() {

    // this.disabled = "btn-loading"
    this.clearErrorMessage();
    let username = this.formLogin.value.username;
    let password = this.formLogin.value.password;
    if (this.validateForm(username, password)) {
      this.authService.login(username, password).subscribe({
        next : data => {
          this.authService.loadProfile(data);
          this.sessionStorageService.setToken(data["access-token"]);
          this.sessionStorageService.setRefreshToken(data["refresh-token"]);

          this.router.navigateByUrl("/dashboard/crm");
          this.showLoader = true;
        },
        error : err => {
          this.showLoader = false;
          console.log(err)
        }
      });


      // then(() => {
      //     this.router.navigate(['/dashboard/crm']);
      //     console.clear();
      //
      //   })
      //   .catch((_error: any) => {
      //     this._error = _error;
      //     this.router.navigate(['/']);
      //   });


        this.toastr.success('log in successful','ynex', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
    }

  }

  validateForm(email: string, password: string) {
    if (email.length === 0) {
      this.errorMessage = 'please enter email id';
      return false;
    }

    if (password.length === 0) {
      this.errorMessage = 'please enter password';
      return false;
    }

    // if (password.length < 6) {
    //   this.errorMessage = 'password should be at least 6 char';
    //   return false;
    // }

    this.errorMessage = '';
    return true;
  }

  //angular
  public formGroup!: FormGroup;
  public error: any = '';

  get form() {
    return this.formLogin.controls;
  }

  // Submit() {
  //   console.log(this.formLogin)
  //   if (
  //     this.formLogin.controls['username'].value === 'spruko@admin.com' &&
  //     this.formLogin.controls['password'].value === 'sprukoadmin'
  //   ) {
  //     this.router.navigate(['/dashboard/crm']);
  //   } else {
  //     this.error = 'Please check email and passowrd';
  //   }
  //
  // }

  // public togglePassword() {
  //   this.showPassword = !this.showPassword;
  // }

  ngOnDestroy(): void {
    const bodyElement = this.renderer.selectRootElement('body', true);
    this.renderer.removeAttribute(bodyElement, 'class');
  }
  showPassword = false;
  toggleClass = "off-line";
  toggleVisibility() {
    this.showPassword = !this.showPassword;
    if (this.toggleClass === "off-line") {
      this.toggleClass = "line";
    } else {
      this.toggleClass = "off-line";
    }
  }
}

