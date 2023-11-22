import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userForm: FormGroup;
  user: User = {} as User;

  editMode: boolean = false;


  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.userForm = this.formBuilder.group({
      name: [''], 
      location: ['']
    });
  }
  
  ngOnInit(): void {
    this.userService.getUser().subscribe(user => {
      this.user = user;
      // Update the form with the user data
      this.userForm.patchValue({
        name: user.name, 
        location: user.location
      });
    });
  }  

  toggleEditMode() {
    this.editMode = !this.editMode;
    if (!this.editMode) {
      this.saveChanges();
    }
  }

  saveChanges() {
    const userData = {
      name: this.userForm.controls['name'].value,
      location: this.userForm.controls['location'].value
    }
    this.userService.updateUser(userData).subscribe(response => {
    })
  }
}
