// firebase.service.ts
import {inject, Injectable} from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize, Observable, switchMap} from "rxjs";
import {ProjectModel} from "../../Entities/project/project.model";
import {ProjectService} from "../../Entities/project/project.service";


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  protected project_service = inject(ProjectService)
  constructor(private storage: AngularFireStorage) { }

  uploadFile(file: File, path: string): Promise<string> {
    const fileRef = this.storage.ref(path + '/' + file.name);
    const task = fileRef.put(file);

    return new Promise((resolve, reject) => {
      task.then(snapshot => {
        snapshot.ref.getDownloadURL().then(url => {
          resolve(url);
        });
      }).catch(error => {
        console.error('Error uploading file: ', error);
        reject(error);
      });
    });
  }

  uploadFiles(files: File[], path: string): Observable<string[]> {
    const uploadPromises = files.map(file => this.uploadFile(file, path));

    return new Observable<string[]>(observer => {
      Promise.all(uploadPromises)
        .then(urls => {
          observer.next(urls);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  uploadTextFile(content: string, x: ProjectModel) {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const storageRef = this.storage.ref('textfiles/myTextFile'+ this.GenerateCodeGroup() +'.txt');
    const uploadTask = storageRef.put(blob);
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          console.log('File đã được lưu trữ tại:', downloadURL);
          x.name = downloadURL;
          console.log(x)
          this.project_service.CreateProject(x).subscribe({
            next:res => {
              if (res){
                window.location.replace('project/' + x.id_group)
              }
            }, error:err => {
              console.log(err);
            }
          })
        });
      })
    ).subscribe();
  }

  GenerateCodeGroup(): string {
    const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString: string = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
    return randomString;
  }
}
