import { Component, OnInit, ViewChild } from '@angular/core';
import { MatProgressBar, MatButton } from '@angular/material';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-signup',
  templateUrl: './signup-with-store.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;

  signupForm: FormGroup;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const required = new FormControl('', Validators.required)
    // const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

    this.signupForm = new FormGroup({
      user: new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: required,
      }),
      store: new FormGroup({
        name: required,
      }),
      agreed: new FormControl('', (control: FormControl) => {
        const agreed = control.value;
        if(!agreed) {
          return { agreed: true }
        }
        return null;
      })
    })
  }

  signup() {
    const signupData = this.signupForm.value;
    console.log(signupData);

    this.submitButton.disabled = true;
    this.progressBar.mode = 'indeterminate';

    this.http.post("http://localhost:5000/api/signup",
      {
        "store": {
          "name": "name"
        },
        "user": {
          "password": "pass",
          "email": "email@d-m.com.au"
        }
      }
      ).subscribe(
        res => {
          console.log(res)
        }
      )
  }
}
