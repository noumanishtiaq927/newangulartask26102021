import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NocodeapiCrudService } from 'src/app/dashboard/services/nocodeapi/nocodeapi-crud.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
  serverError: any = null;
  designation: string = '';
  department: string = '';
  gender: string = '';

  minDate: any = new Date();
  datapost = {
    lastName: 'allen',
    gender: 'male',
    mobile: 3461234567,
    password: 'flashisback',
    designation: 'coo',
    department: 'management',
    email: 'flash@gmail.com',
    dateOfJoining: '2021-01-19',
    address: 'central city\n\n',
    firstName: 'barry',
    // profilePic: [
    //   {
    //     url: 'https://dl.airtable.com/.attachments/420222d766f77d7c806adfcd666da7b7/e21c7500/1527078769-the-flash-season-4-finale.jpg',
    //   },
    // ],
  };

  @ViewChild('f') formdata: any;
  @ViewChild('fileuploade') fileuploadvar: ElementRef | undefined;
  errorregister: any;
  firstName: any;
  id: any;
  dar: any = {};
  constructor(
    private servicenocode: NocodeapiCrudService,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    console.log(typeof this.serverError);
    console.log(this.route);
    let id = this.route.snapshot.params.id;
    this.id = id;
    console.log(id);
    if (id) {
      this.servicenocode.singlegetdata(id).subscribe((data: any) => {
        this.dar = data;
      });
    }
  }

  ngOnInit(): void {}
  onSubmit() {
    console.log(this.formdata.value);

    this.datapost.firstName = this.formdata.value.firstName
      .trim()
      .replace(/\s/g, '');
    this.datapost.lastName = this.formdata.value.lastName
      .trim()
      .replace(/\s/g, '');
    this.datapost.email = this.formdata.value.email
      .toLowerCase()
      .trim()
      .replace(/\s/g, '');
    this.datapost.password = this.formdata.value.password;
    this.datapost.department = this.formdata.value.department;
    this.datapost.designation = this.formdata.value.designation;
    this.datapost.dateOfJoining;
    typeof this.formdata.value.dateOfJoining === 'string'
      ? this.formdata.value.dateOfJoining
      : this.formdata.value.dateOfJoining.toLocaleDateString();
    this.datapost.gender = this.formdata.value.gender;
    this.datapost.mobile = this.formdata.value.mobile;
    this.datapost.address = this.formdata.value.address;
    // this.datapost.profilePic[0].url = this.formdata.value.profilePic;

    console.log(this.datapost);
    if (typeof this.id !== 'string') {
      this.servicenocode.findData(this.datapost.email, this.datapost).subscribe(
        (data) => {
          console.log(data);
          if (data.message && data) {
            console.log('one')
            this.serverError = data.message;
            let snackBarRef=  this.snackbar.open(this.serverError, 'Dismiss',{
              horizontalPosition:'center',
              verticalPosition:'top',
              direction:'ltr',

            })
          } else {
            console.log('two')
            console.log({data})

            this.servicenocode.error.subscribe((error) => {
              this.serverError = error;
              console.log({error})
            // this.servicenocode.isAuth = true;
            let snackBarRef=  this.snackbar.open(this.serverError, 'Dismiss',{
              horizontalPosition:'center',
              verticalPosition:'top',
              direction:'ltr',

            })
            // snackBarRef.afterDismissed().subscribe(()=>{
            //   console.log(data)
            //   this.router.navigate(['/dashboard'],{state : data });
            // })
          });
          let snackBarRef=  this.snackbar.open('Registration Successful', 'Dismiss',{
            horizontalPosition:'center',
            verticalPosition:'top',
            direction:'ltr',

          })
          snackBarRef.afterDismissed().subscribe(()=>{
            console.log(this.formdata)
            this.formdata.resetForm();

            // this.router.navigate(['/dashboard'],{state : data });
          })
            // this.router.navigate(['/dashboard']);
          }
        },
        (error: any) => {
          this.serverError = 'Hi Error';
          console.log(error);
        }
      );
    } else {
      this.servicenocode
        .updateData(this.datapost, this.id)
        .subscribe((data) => {
          console.log('data')
          let snackBarRef=  this.snackbar.open(data.message, 'Dismiss',{
            horizontalPosition:'center',
            verticalPosition:'top',
            direction:'ltr',

          })
          snackBarRef.afterDismissed().subscribe(()=>{
            this.formdata.resetForm();
            this.router.navigate(['/dashboard','allusers']);
          })

          console.log(data);
        }, (error)=>{
          console.log('error')
          let snackBarRef=  this.snackbar.open(error.statusText, 'Dismiss',{
            horizontalPosition:'center',
            verticalPosition:'top',
            direction:'ltr',

          })
          console.log(error)
        });
    }
  }
  fileupload() {
    const file = this.fileuploadvar?.nativeElement.files[0];
  }
  getupload() {
    let id = document.getElementById('imageupload');
    id?.click();
  }
  resetForm(){
    this.formdata.resetForm();
  }
}
