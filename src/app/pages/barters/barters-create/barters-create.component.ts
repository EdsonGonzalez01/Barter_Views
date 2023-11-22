import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Barter } from 'src/app/shared/interfaces/barter';
import { BarterService } from 'src/app/shared/services/barter.service';

@Component({
  selector: 'app-barters-create',
  templateUrl: './barters-create.component.html',
  styleUrls: ['./barters-create.component.scss']
})
export class BartersCreateComponent {
  barterForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private barterService:BarterService) {
    this.barterForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['new'],
      date: [new Date()],
    });
  }
  
  onSubmit() {
    if (this.barterForm.valid) {
      const formData: Barter = this.barterForm.value;
      this.barterService.createBarter(formData).subscribe(response => {
        console.log('Barter created successfully', response);
      });
    }
  }

}
