import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Barter } from 'src/app/shared/interfaces/barter';
import { User } from 'src/app/shared/interfaces/user';
import { BarterService } from 'src/app/shared/services/barter.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-barters-create',
  templateUrl: './barters-create.component.html',
  styleUrls: ['./barters-create.component.scss']
})
export class BartersCreateComponent {
  barterForm: FormGroup;
  fileSelected: HTMLInputElement | null; 
  nameFileSelected: string = "";

  @Output() isCreateBarterRouteEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor(
    private formBuilder: FormBuilder, 
    private barterService: BarterService, 
    private snackBar: MatSnackBar, 
    private userService: UserService,
    private routerService: Router
  ) {
    this.isCreateBarterRouteEmitter.emit(true);

    // Inicializar barterForm con un valor por defecto
    this.barterForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      file: [''],
      date: [new Date()],
      offerer: ['']  // Inicializar con un valor por defecto, puede ser un valor nulo o vacío según tu lógica
    });

    this.userService.getUser().subscribe(user => {
      // Actualizar el valor de offerer en barterForm
      this.barterForm.patchValue({ offerer: user._id });
    });

    this.fileSelected = null; 
  }

  showSnack(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000, // You can customize the duration in milliseconds
    });
  }
  
  onSubmit() {
    try {
      if (this.barterForm.valid) {
        const formData: Barter = this.barterForm.value;
        this.barterService.createBarter(formData).subscribe(response => {
          //console.log('Barter created successfully', response);
          if(this.fileSelected){
            this.barterService.upload(response._id, this.fileSelected).subscribe({
            });
          }
        });
      }
      this.showSnack("Barter Created Successfully", "Success");
      this.routerService.navigate(['barters']);
    } catch (error) {
      this.showSnack("There was an error please try again later", "Error");
    }
  }

  showFileSelector(input: HTMLInputElement){
    input.click()
  }

  onFileSelected(e: Event){
    const input = e.target as HTMLInputElement;
    this.fileSelected = input
    this.nameFileSelected = input.files![0].name;
  }
}
