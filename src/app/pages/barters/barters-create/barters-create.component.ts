import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Barter } from 'src/app/shared/interfaces/barter';
import { BarterService } from 'src/app/shared/services/barter.service';

@Component({
  selector: 'app-barters-create',
  templateUrl: './barters-create.component.html',
  styleUrls: ['./barters-create.component.scss']
})
export class BartersCreateComponent {
  barterForm: FormGroup;
  fileSelected: HTMLInputElement | null; 

  constructor(private formBuilder: FormBuilder, private barterService:BarterService, private snackBar: MatSnackBar) {
    this.barterForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      file: [''],
      date: [new Date()],
    });

    this.fileSelected = null; 
  }

  showSnack(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000, // You can customize the duration in milliseconds
    });
  }
  
  onSubmit() {
    if (this.barterForm.valid) {
      const formData: Barter = this.barterForm.value;
      this.barterService.createBarter(formData).subscribe(response => {
        console.log('Barter created successfully', response);
        if(this.fileSelected){
          this.barterService.upload(response._id, this.fileSelected).subscribe({
            next: () => {
              this.showSnack("File uploaded successfully", "Success");
            },
            error: () => {
              this.showSnack("File not supported", "Error");
            }

          });
        }
      });
    }
  }

  showFileSelector(input: HTMLInputElement){
    input.click()
  }

  onFileSelected(e: Event){
    const input = e.target as HTMLInputElement;
    console.log(input.files![0]); 
    this.fileSelected = input
  }
}
