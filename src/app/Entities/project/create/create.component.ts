import {Component, inject, OnInit} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {GroupService} from "../../group/group.service";
import {NgForOf} from "@angular/common";
import {ProjectService} from "../project.service";
import {FooterComponent} from "../../../Layout/footer/footer.component";
import {LeftContainerComponent} from "../../../Layout/left-container/left-container.component";
import {NavbarComponent} from "../../../Layout/navbar/navbar.component";
import {ProjectModel} from "../project.model";
import {FirebaseService} from "../../../Config/FilebaseConfig/FisebaseService";
import {FileInfo} from "../../../Account/register/register.component";

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgForOf,
    FooterComponent,
    LeftContainerComponent,
    NavbarComponent,
    RouterLink
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit{
  // DI
  protected firebase = inject(FirebaseService)
  protected route = inject(ActivatedRoute)
  protected group_service = inject(GroupService)
  protected project_service = inject(ProjectService)
  id = this.route.snapshot.params['id_group']
  members?: any[]

  ngOnInit() {
    this.GetMemBers()
  }
  // Handle if div 2 is showed
  mainForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.mainForm = this.fb.group({
      type: 1,
      id_group: this.id,
      dateCreate: this.GetDateToDay(),
      name: ['', Validators.required],
      taskRequests: this.fb.array([])
    });
  }

  get formList() {
    return this.mainForm.get('taskRequests') as FormArray;
  }

  addForm() {
    const newFormGroup = this.fb.group({
          nameTask: ['', Validators.required],
          deadLine: ['', Validators.required],
          createAt: [this.GetDateToDay()],
          user_id: ['', Validators.required]
    });

    this.formList.push(newFormGroup);
  }

  removeForm(index: number) {
    this.formList.removeAt(index);
  }

  onSubmit() {
    if (this.mainForm.valid) {
      console.log(this.mainForm.value);
      this.project_service.CreateProject(this.mainForm.value).subscribe({
        next:res => {
          if (res){
            window.location.replace('project/' + this.id)
          }
          else {
            console.log('Create project not successfully')
          }
        },error:err => {
          console.log('Err is : ', err)
        }
      })
      //this.mainForm.reset(); // Đặt lại form sau khi submit
    } else {
      console.log('Form is invalid');
    }
  }

  // Handle if div 1 is showed
  // Send post include text and files
  textContent:string = ''
  fileInfos: FileInfo[] = [];
  selectedFile: File[] = [] ;
  CreatePost(){
    this.uploadFiles()
  }

  uploadFiles(): void {
    if (this.selectedFile.length === 0) {
      return;
    }
    this.fileInfos = this.selectedFile.map(file => ({ name: file.name, url: '' }));
    this.firebase.uploadFiles(this.selectedFile, 'uploads').subscribe(
      (urls: string[]) => {
        this.fileInfos = this.selectedFile.map((file, index) => ({
          name: file.name,
          url: urls[index] // URL tương ứng với tên file
        }));
        const x:any = {
          dateCreate: this.GetDateToDay(),
          id_group:this.id,
          type: 0,
          docs: this.fileInfos
        }
        this.firebase.uploadTextFile(this.textContent, x)
      },
      error => {
        console.error('Error uploading files:', error);
      }
    );
  }

  // Prepare files
  DOC(){
    // @ts-ignore
    document.getElementById('inputDOC').click();
  }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFile = Array.from(input.files);
      console.log(this.selectedFile)
    }
  }

  removeFile(file: File) {
    this.selectedFile = this.selectedFile.filter(f => f !== file);
    console.log(this.selectedFile)
  }

  // Additionally function
  GetDateToDay() {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${year}-${formattedMonth}-${formattedDay}`;
  }

  GetMemBers(){
    this.group_service.GetMemBers(this.id).subscribe({
      next:res => {
        this.members = res.result
      }, error:err => {
        console.log('Err is: ', err)
      }
    })
  }

//   CSS function
  showDiv(x:number){
    if (x == 1){
      // @ts-ignore
      document.getElementById('div1').style.display = 'block';
      // @ts-ignore
      document.getElementById('div2').style.display = 'none';
      // @ts-ignore
      document.getElementById('btn1').classList.add('active');
      // @ts-ignore
      document.getElementById('btn2').classList.remove('active');
    } else {
      // @ts-ignore
      document.getElementById('div1').style.display = 'none';
      // @ts-ignore
      document.getElementById('div2').style.display = 'block';
      // @ts-ignore
      document.getElementById('btn2').classList.add('active');
      // @ts-ignore
      document.getElementById('btn1').classList.remove('active');
    }
  }
}
