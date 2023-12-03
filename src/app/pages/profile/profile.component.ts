import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/interfaces/user';
import { File } from 'src/app/shared/interfaces/file';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userForm: FormGroup;
  user: User = {} as User;
  editMode: boolean = false;
  imageUrl: string = "";
  fileSelected: HTMLInputElement | null; 
  

  constructor(
    private formBuilder: FormBuilder, 
    private userService: UserService,
    private snackBar: MatSnackBar
    ){
    this.userForm = this.formBuilder.group({
      name: [''], 
      location: ['']
    });

    this.fileSelected = null;
  }
  
  ngOnInit(): void {
    this.userService.getUser().subscribe(user => {
      //console.log(user)
      this.user = user;
      this.userService.getProfilePic().subscribe(file => {
        //console.log("Length: ", file.length);
        if(file.length == 0){
          this.imageUrl = `${environment.apiUrl}assets/user.png`
        }else{
          this.imageUrl = this.getImageUrl(file[0].filename);
        }
        
      });
      this.userForm.patchValue({
        name: user.name, 
        location: user.location
      });
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length) {
      this.fileSelected = input; // Almacenar la referencia al input
  
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target) {
          this.imageUrl = e.target.result as string; // Actualizar la vista previa de la imagen
        }
      };
      reader.readAsDataURL(file);
    }
  }
  
  
  
  toggleEditMode() {
    this.editMode = !this.editMode;
    if (!this.editMode) {
      this.onSubmit();
    }
  }

  showSnack(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000, // You can customize the duration in milliseconds
    });
  }

  onSubmit() {
    try {
      const userData = {
        name: this.userForm.controls['name'].value,
        location: this.userForm.controls['location'].value
      };
      this.userService.updateUser(userData).subscribe();
  
      if (this.fileSelected) {
        this.userService.updateProfilePic(this.user._id!, this.fileSelected)
          .subscribe({
          });
      }

      this.showSnack("Profile updated successfully", "Success");
    } catch (error) {
      this.showSnack("An error ocured, please try again", "Error");
    }
  }

  getImageUrl(filename: string): string {
    return this.userService.getImageUrl(filename);
  }

}
