import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {RegisterService} from "./register.service";
import {Router} from "@angular/router";
import { FirebaseService} from "../../Config/FilebaseConfig/FisebaseService";
import {user_req} from "./register.service"
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {NgForOf, NgIf} from "@angular/common";

export interface FileInfo {
  name: string;
  url: string;
}
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  // Values and DI
  protected http = inject(HttpClient)
  protected registerService = inject(RegisterService);
  protected router = inject(Router);
  selectedFile: File | undefined;
  downloadURL: string | undefined;
  protected firebase = inject(FirebaseService)


  // Function

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  onUpload() {
    if (this.selectedFile) {
      const path = 'uploads/';
      this.firebase.uploadFile(this.selectedFile, path).then(url => {
        console.log('File uploaded successfully. URL: ', url);
        this.downloadURL = url;
        alert("Upload file successfully !")
        //window.location.reload()
      }).catch(error => {
        console.error('Error uploading file: ', error);
      });
    } else {
      console.error('No file selected!');
    }
  }

  regisForm = new FormGroup({
    name: new FormControl('', {nonNullable:true, validators:[Validators.required]}),
    username: new FormControl('',{nonNullable:true, validators:[Validators.required]}),
    password: new FormControl('',{nonNullable:true, validators:[Validators.required]}),
    email: new FormControl('',{nonNullable:true, validators:[Validators.required]}),
    sdt: new FormControl('',{nonNullable:true, validators:[Validators.required]}),
  })
  register(): void{
    const req: user_req = {
      name: this.regisForm.get('name')?.value,
      username: this.regisForm.get('username')?.value,
      password: this.regisForm.get('password')?.value,
      email: this.regisForm.get('email')?.value,
      sdt: this.regisForm.get('sdt')?.value,
      url: this.downloadURL
    }
    console.log(req)
    this.registerService.register(req).subscribe({
      next: () => {
        this.router.navigate(['/home'])
    }, error:() => {
        alert("Username is existed !")
      }
    })
  }

  textContent: string = '';
  text: string = '';
  createAndUploadTextFile() {
    // console.log(this.textContent)
    //this.firebase.uploadTextFile(this.textContent, null);
  }

  loadTextFromUrl() {
    this.getTextFromUrl('https://firebasestorage.googleapis.com/v0/b/mwork-storage.appspot.com/o/textfiles%2FmyTextFile2.txt?alt=media&token=450b952c-67f8-4797-8bb3-5071b39b6abd')
      .subscribe(
        data => {
          this.text = data;
        },
        error => {
          console.error('Đã xảy ra lỗi:', error);
        }
      );
  }
  getTextFromUrl(url: string): Observable<string> {
    return this.http.get(url, { responseType: 'text' });
  }


//
  selectedFiles: File[] = [];
  urls: string[] = [];
  fileInfos: FileInfo[] = [];

  onFilesSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
    // this.fileInfos = this.selectedFiles.map(file => ({ name: file.name, url: '' }));
  }

  uploadFiles(): void {
    if (this.selectedFiles.length === 0) {
      return;
    }
    this.fileInfos = this.selectedFiles.map(file => ({ name: file.name, url: '' }));
    this.firebase.uploadFiles(this.selectedFiles, 'uploads').subscribe(
      (urls: string[]) => {
        this.urls = urls;
        // console.log('Uploaded file URLs:', this.urls);
        this.fileInfos = this.selectedFiles.map((file, index) => ({
          name: file.name,
          url: urls[index] // URL tương ứng với tên file
        }));
        console.log('Uploaded file URLs:', this.fileInfos);
      },
      error => {
        console.error('Error uploading files:', error);
      }
    );
  }
//
}
