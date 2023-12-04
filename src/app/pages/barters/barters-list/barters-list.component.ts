import { Component, OnInit } from '@angular/core';
import { Barter } from 'src/app/shared/interfaces/barter';
import { Transaction } from 'src/app/shared/interfaces/transaction';
import { User } from 'src/app/shared/interfaces/user';
import { BarterService } from 'src/app/shared/services/barter.service';
import { TransactionService } from 'src/app/shared/services/transaction.service';
import { UserService } from 'src/app/shared/services/user.service';

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
  selectedInterest: Barter | null = null;
  selectedOffers: Barter | null = null;
  loggedUser: User = {} as User 
  offersCountMap: { [key: string]: number } = {}; 


  constructor(
    private barterService: BarterService, 
    private userService:UserService, 
    private transactionService: TransactionService) 
  { }

  ngOnInit() {
    this.loadBarters();
    this.userService.getUser().subscribe({
      next: (user: User) =>{
        console.log(user);
        this.loggedUser = user
      },
      error: (err) =>{
        console.log(err);
        
      }
    })
  }

  loadBarters() {
    if (this.allBartersShown) {
      this.showAllBarters();
    } else {
      this.showMyBarters();
    }
  }

  showDetails(barter: Barter) {
    this.selectedBarter = barter;
  }

  showInterest(barter: Barter) {
    this.selectedInterest = barter;
  }

  showOffers(barter: Barter) {
    this.selectedOffers = barter;
  }
  

  handleClose() {
    this.selectedBarter = null;
    this.loadBarters(); // Reload barters after closing the details modal
  }

  handleCloseInterest() {
    this.selectedInterest = null;
    this.loadBarters(); // Reload barters after closing the interest modal
  }

  handleCloseOffers() {
    this.selectedOffers = null;
    this.loadBarters(); // Reload barters after closing the interest modal
  }

  reloadBarters(success: boolean) {
    if (success) {
      this.loadBarters(); // Reload barters on successful update
    }
  }

  showAllBarters() {
    this.allBartersShown = true;
    this.barterService.getBarters().subscribe((barters: Barter[]) => {
      barters = barters.filter(barter => barter.status !== 'bartered');
      this.transactionService.getOffererTransactions().subscribe((transactions: Transaction[]) => {
        this.offersCountMap = {}; // Resetea el mapa para una nueva carga
        barters.forEach(barter => {
          this.offersCountMap[barter._id] = 0;
        });

        transactions.forEach(transaction => {
          if (this.offersCountMap.hasOwnProperty(transaction.desiredBarter)) {
            // Incrementa el conteo de ofertas para el barter correspondiente
            this.offersCountMap[transaction.desiredBarter]++;
          }
        });

        
        this.loadBartersData(barters);
      });
    });
  }

  showMyBarters() {
    this.allBartersShown = false;
    this.barterService.getMyBarters().subscribe((barters: Barter[]) => {
      const filteredBarters = barters.filter(barter => barter.status !== 'bartered');
      this.loadBartersData(filteredBarters);
    });
  }

  showBarteredBarters() {
    this.barterService.getBarters().subscribe((barters: Barter[]) => {
      // Filtrar los barters que tengan estado 'bartered' y el usuario logueado sea el offerer
      const barteredBarters = barters.filter(barter => 
        barter.status === 'bartered' && barter.offerer === this.loggedUser._id
      );
      this.loadBartersData(barteredBarters);
    });
  }
  

  private loadBartersData(barters: Barter[]) {
    this.items = [];

    // Fetch files for each barter
    barters.forEach(barter => {
      this.barterService.getFiles(barter._id).subscribe(files => {
        // Update the barter with the fetched files
        barter.files = files;
      });
      this.items.push(barter);
    });
  }

  // Helper function to get the image URL for a file
  getImageUrl(filename: string): string {
    return this.barterService.getImageUrl(filename);
  }
}
