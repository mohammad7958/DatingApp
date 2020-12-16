import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  registerForm: any;
  bsConfig: Partial<BsDatepickerConfig>;
  maxDate: Date = new Date();
  validationErrors: string[] = [];


  constructor(private accountService: AccountService, private toastr: ToastrService, 
      private fb: FormBuilder, private router: Router) {
        this.bsConfig = {
          containerClass: 'theme-red',
          dateInputFormat: 'DD MMMM YYYY'
        }
       }

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }


  initializeForm() {
    this.registerForm = this.fb.group( {
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, 
              Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    })
  }


  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return (control?.value === control?.parent?.get(matchTo)?.value) 
        ? null : {isMatching: true}
    }
  }

  register() {
    this.accountService.register(this.registerForm.value).subscribe(response => {
      this.router.navigateByUrl('/members');
      this.cancel();
    }, error => {
      this.validationErrors = error;

    })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
