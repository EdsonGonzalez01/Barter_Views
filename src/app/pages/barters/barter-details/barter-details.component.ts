import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
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
  offerer: User = {} as User;
  offererImgUrl:string = ""

  constructor(
    private barterService:BarterService,
    private userService:UserService
  ){}



  ngOnInit(): void {

    this.barterService.getFiles(this.barter._id).subscribe(files => {
      // Update the barter with the fetched files
      console.log("files on modal: ", files);
      this.barter.files = files
      this.userService.getUserByID(this.barter.offerer).subscribe(offerer => {
        console.log("offerer: ", offerer)
        this.offerer = offerer
        this.userService.getProfilePicById(offerer._id!).subscribe(file => {
          console.log("File: ", file);
          if(file.length == 0){
            this.offererImgUrl = `${environment.apiUrl}assets/user.png`
          }else{
            console.log(this.getImageUrl(file[0].filename))
            this.offererImgUrl = this.getImageUrl(file[0].filename);
          }
        })
      })
    });

  }

  closeDetails() {
    this.close.emit(); 
  }

  getImageUrl(filename: string): string {
    return this.barterService.getImageUrl(filename);
  }
}
