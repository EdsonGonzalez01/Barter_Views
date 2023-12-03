import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Barter } from 'src/app/shared/interfaces/barter';
import { User } from 'src/app/shared/interfaces/user';
import { BarterService } from 'src/app/shared/services/barter.service';
import { UserService } from 'src/app/shared/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-barter-details',
  templateUrl: './barter-details.component.html',
  styleUrls: ['./barter-details.component.scss']
})
export class BarterDetailsComponent implements OnInit {
  @Input() barter!: Barter;
  @Output() close = new EventEmitter<void>();
  @Output() barterUpdated = new EventEmitter<boolean>(); // Emit a boolean indicating success

  loggedUser: User = {} as User;
  offerer: User = {} as User;
  offererImgUrl: string = '';
  isEditing: boolean = false;
  editForm: FormGroup;
  imageUrl: string | null = '';
  fileSelected: HTMLInputElement | null;

  constructor(
    private barterService: BarterService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.editForm = this.formBuilder.group({
      title: [''],
      description: ['']
    });

    this.fileSelected = null;
  }

  ngOnInit(): void {
    this.imageUrl = this.barter.files && this.barter.files.length > 0 ? this.getImageUrl(this.barter.files[0].filename) : null;
    this.userService.getUser().subscribe(user => {
      this.loggedUser = user;
    });
    this.loadFormValues();
    this.loadBarterData();
  }

  loadFormValues() {
    if (this.barter) {
      this.editForm.patchValue({
        title: this.barter.title,
        description: this.barter.description
      });
    }
  }

  closeDetails() {
    this.close.emit();
  }

  getImageUrl(filename: string): string {
    return this.barterService.getImageUrl(filename);
  }

  isBarterOwner(offererId: string): boolean {
    return offererId === this.loggedUser._id;
  }

  editBarter() {
    this.isEditing = true;
  }

  cancelEdit() {
    this.isEditing = false;
    this.close.emit(); // Cerrar el modal
  }
  

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length) {
      this.fileSelected = input;
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target) {
          this.imageUrl = e.target.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  async onSubmit() {
    try {
      const barterData = {
        title: this.editForm.controls['title'].value,
        description: this.editForm.controls['description'].value
      };

      if (this.editForm && this.editForm.valid) {
        await this.barterService.updateBarter(this.barter._id, barterData).subscribe();
    
        if (this.fileSelected) {
          await this.barterService.updateBarterPic(this.barter._id!, this.fileSelected)
            .subscribe();
        }
        
        this.barterUpdated.emit(true);
        this.showSnack("Barter updated successfully", "Success");
      }
    } catch (error) {
      this.barterUpdated.emit(false);
      this.showSnack("An error occurred, please try again", "Error");
    }
  }

  loadBarterData() {
    this.barterService.getFiles(this.barter._id).subscribe(files => {
      this.barter.files = files;
      this.userService.getUserByID(this.barter.offerer).subscribe(offerer => {
        this.offerer = offerer;
        this.userService.getProfilePicById(offerer._id!).subscribe(file => {
          if (file.length == 0) {
            this.offererImgUrl = `${environment.apiUrl}assets/user.png`;
          } else {
            this.offererImgUrl = this.getImageUrl(file[0].filename);
          }
        });
      });
    });
  }

  showSnack(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
