import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'formsReactive';
  reactiveForm: FormGroup;

  ngOnInit() {
    this.reactiveForm = new FormGroup({
      "projName" : new FormControl(null, Validators.required),
      "email" : new FormControl(null, [Validators.required, Validators.email]),
      "projStat" : new FormControl(null, Validators.required),
      "persons" : new FormGroup({
        "members" : new FormArray([new FormControl(null, Validators.required)])
      }),
    });
  }

  onSubmit() {
   console.log(this.reactiveForm);
  }

  onAdd() {
    (<FormArray>this.reactiveForm.get("persons.members")).push(new FormControl(null, Validators.required));
  }
}
