import { Component, OnInit } from '@angular/core';
import { Barter } from 'src/app/shared/interfaces/barter';
import { BarterService } from 'src/app/shared/services/barter.service';

@Component({
  selector: 'app-barters-list',
  templateUrl: './barters-list.component.html',
  styleUrls: ['./barters-list.component.scss']
})
export class BartersListComponent implements OnInit {
  imageUrl: string = 'https://www.prensalibre.com/wp-content/uploads/2018/12/afa2268e-f4dc-411b-b150-1d850801b2a4.jpg?quality=52&w=1200';
  items: Barter[] = [];
  allBartersShown: boolean = true;
  selectedBarter: Barter | null = null;

  constructor(private barterService: BarterService) { }

  ngOnInit() {
    this.showAllBarters();
  }

  showDetails(barter: Barter) {
    this.selectedBarter = barter;
  }

  handleClose() {
    this.selectedBarter = null;
  }
  
  showAllBarters(){
    this.allBartersShown = true;
    this.barterService.getBarters().subscribe((barters: Barter[]) => {
      console.log("Barters: ", barters);
      
      // Fetch files for each barter
      this.items = barters.map(barter => {
        this.barterService.getFiles(barter._id).subscribe(files => {
          // Update the barter with the fetched files
          console.log("files: ", files);
          barter.files = files;
        });
        return barter;
      });
    });
  }

  // Helper function to get the image URL for a file
  getImageUrl(filename: string): string {
    return this.barterService.getImageUrl(filename);
  }

  showMyBarters(){
    this.allBartersShown = false
    this.barterService.getMyBarters().subscribe((barters: Barter[])=> {
      this.items = barters.map(barter => {
        this.barterService.getFiles(barter._id).subscribe(files => {
          // Update the barter with the fetched files
          barter.files = files;
        });
        return barter;
      });
    })
  }
}
