import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FileUploader } from 'ng2-file-upload';
import { CustomerModel } from 'src/app/interface/data.interface';

@Component({
  selector: 'app-add-pins',
  templateUrl: './add-pins.component.html',
  styleUrls: ['./add-pins.component.scss'],
})
export class AddPinsComponent implements OnInit {
  private imageSrc!: string;
  public addPinsFormGroup!: FormGroup;
  public customerList!: CustomerModel[];
  public fileUrl: string = '';
  constructor(
    private readonly formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddPinsComponent>
  ) { }
  ngOnInit(): void {
    this.customerList = JSON.parse(
      localStorage.getItem('customer') || '{}'
    );
    this.createFormGroup();
  }
  public uploader: FileUploader = new FileUploader({
    disableMultipart: true,
  });
  // get name of selected file
  public onFileSelected(event: EventEmitter<File[]> | any) {
    const file: File = event[0];
    this.fileUrl = event[0].name;

    this.readBase64(file).then((imgSrcData: any) => {
      if (imgSrcData) {
        this.imageSrc = imgSrcData;
      }
    });
  }
  // create form group
  private createFormGroup() {
    this.addPinsFormGroup = this.formBuilder.group({
      title: [null, [Validators.required]],
      collaboratory: new FormControl([null, [Validators.required]]),
      privacy: [null, [Validators.required]],
    });
  }
  // get form value after submittion
  public onSubmit(formGroup: FormData) {
    console.log(formGroup);
  }
  //getting form value after the dialog has been closed
  public getFormValue(formGroup: any) {
    this.dialogRef.close({
      collaboratory: [formGroup['collaboratory']],
      privacy: formGroup['privacy'],
      title: formGroup['title'],
      imagePreviewUrl: this.imageSrc,
      fileUrl: this.fileUrl,
    });
  }
  //file upload function
  private readBase64(file: any): Promise<any> | any {
    if (file) {
      let reader = new FileReader();
      let future = new Promise((resolve, reject) => {
        reader.addEventListener(
          'load',
          () => {
            resolve(reader.result);
          },
          false
        );

        reader.addEventListener(
          'error',
          (event) => {
            reject(event);
          },
          false
        );

        reader.readAsDataURL(file);
      });
      return future;
    }
  }
  // get selected collabrator from the available options
  public selectedOption(event: any) {
    console.log(event)
  }
}