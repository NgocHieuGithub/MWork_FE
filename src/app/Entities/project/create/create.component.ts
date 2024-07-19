import {Component, inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {GroupService} from "../../group/group.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit{
  protected route = inject(ActivatedRoute)
  protected group_service = inject(GroupService)
  id = this.route.snapshot.params['id_group']
  members?: any[]

  mainForm: FormGroup;
  formGroups: FormArray;

  constructor(private fb: FormBuilder) {
    this.mainForm = this.fb.group({
      formGroups: this.fb.array([])
    });
    this.formGroups = this.mainForm.get('formGroups') as FormArray;
  }



  ngOnInit(): void {
    this.mainForm = this.fb.group({
      formGroups: this.fb.array([])
    });

    // Optionally, you can initialize with one form group
    this.addFormGroup();
  }

  addFormGroup() {
    this.formGroups = this.mainForm.get('formGroups') as FormArray;
    this.formGroups.push(this.createFormGroup());
  }

  createFormGroup() {
    return this.fb.group({
      name: ['', Validators.required],
      deadline: ['', Validators.required],
      createAt: ['', Validators.required]
    });
  }
  removeFormGroup(index: number) {
    (this.mainForm.get('formGroups') as FormArray).removeAt(index);
  }
  onSubmit() {
    // Handle form submission here
    console.log(this.mainForm.value);
    // Reset form after submission
    this.mainForm.reset();
  }


  GetMemBers(){
    this.group_service.GetMemBers(this.id).subscribe({
      next:res => {
        this.members = res
      }, error:err => {
        console.log('Err is: ', err)
      }
    })
  }
}
