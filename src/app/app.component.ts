import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { resolve } from 'q';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'formsReactive';
  reactiveForm: FormGroup;
  clicked: boolean = false;
  project: {projName: string, email: string, projStat: string,
            platform: string, members: string[]} = 
            {projName: '', email: '', projStat: '',
              platform: '', members: []};

  ngOnInit() {
    this.clicked = false;
    this.reactiveForm = new FormGroup({
      "projName" : new FormControl(null, [Validators.required, this.customValidator.bind(this)]),
      "email" : new FormControl(null, [Validators.required, Validators.email]),
      "projStat" : new FormControl(null, Validators.required),
      "details" : new FormGroup({
        "platform" : new FormControl('Angular JS', Validators.required),
        "members" : new FormArray([])
      }),
    });
  }

  onSubmit() {
   this.project.projName = this.reactiveForm.get('projName').value;
   this.project.email = this.reactiveForm.get('email').value;
   this.project.projStat = this.reactiveForm.get('projStat').value;
   this.project.platform = this.reactiveForm.get('details.platform').value;
   this.project.members = this.reactiveForm.get('details.members').value;
   this.clicked = true;
  }

  onAdd() {
    this.clicked = false;
    (<FormArray>this.reactiveForm.get("details.members")).push(new FormControl(null, 
      Validators.required, this.customAsyncValidator.bind(this)));
  }

  onDeleteMember(index: number) {
     this.clicked = false;
     (<FormArray>this.reactiveForm.get('details.members')).removeAt(index);
  }

  customValidator(control: FormControl) {
    let str: string;
     str = control.value;
    //  str = !str ? ' ' : str;
     if(str && str.match(/test/gi)) {
       return {fobiddenValue: true}
     }

     return null;
  } 

  customAsyncValidator(control: FormControl): Promise<any> | Observable<any> {
    
    const promise = new Promise<any>((resolve, reject)=> {
      setTimeout(() => {
        let str: string;
        str = control.value;
        if(str && str.match(/deepika|swathi|chandra/gi)) {
            resolve({'forbiddenMember': true});
        } else {
          resolve(null);
        }
      }, 2000)
    });

    return promise;
  }
}
