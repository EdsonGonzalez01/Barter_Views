import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
  users: User[] = [];

  constructor(private userService: UserService, private snackBar: MatSnackBar){
    this.loadUsers()
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (users: User[]) => {
        this.users = users;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  showSnack(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000, // You can customize the duration in milliseconds
    });
  }

  makeAdmin(user: User) {
    this.userService.makeAdmin(user).subscribe({
      next: (response) => {
        this.loadUsers()
        this.showSnack("User updated to admin succesfully", "Success")
      },
      error: (err) => {
        console.log(err);
        this.showSnack("An error ocurred updating to admin", "Error")
      }
    })
  }

  removeAdmin(user: User) {
    this.userService.removeAdmin(user).subscribe({
      next: (response) => {
        this.loadUsers()
        this.showSnack("User admin removed succesfully", "Success")
      },
      error: (err) => {
        console.log(err);
        this.showSnack("An error ocurred removing admin", "Error")
      }
    })
  }

  

}
