import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Barter } from 'src/app/shared/interfaces/barter';
import { Transaction } from 'src/app/shared/interfaces/transaction';
import { BarterService } from 'src/app/shared/services/barter.service';
import { TransactionService } from 'src/app/shared/services/transaction.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-show-interest',
  templateUrl: './show-interest.component.html',
  styleUrls: ['./show-interest.component.scss']
})

export class ShowInterestComponent {
  @Input() desiredBarter!: Barter;
  @Output() close = new EventEmitter<void>();
  @Output() barterUpdated = new EventEmitter<boolean>(); // Emit a boolean indicating success
  selectedBarters: Barter[] = [];
  transaction: Transaction = {

    offerer: '',
    consumer: '',
    offeredBarter: '',
    desiredBarter: '',
    accepted: false,
    date: new Date()
  }

  items: Barter[] = [];

  constructor(
    private barterService: BarterService,
    private userService: UserService,
    private transactionService: TransactionService
  ){
    this.getMyBarters()
  }


  closeDetails() {
    this.close.emit();
  }


  getMyBarters() {
    this.barterService.getMyBarters().subscribe((barters: Barter[]) => {
      const filteredBarters = barters.filter(barter => barter.status !== 'bartered');
      this.loadBartersData(filteredBarters);
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

  selectBarter() {
    if (this.selectedBarters.length > 0) {
      // Accede al primer elemento del array
      const selectedBarter = this.selectedBarters[0];
      // Do something with the selected barter
      console.log('Selected Barter:', selectedBarter);
      console.log('Selected Barter:', this.desiredBarter);
      this.transaction.offerer = this.desiredBarter.offerer;
      this.transaction.consumer = selectedBarter.offerer;
      this.transaction.desiredBarter = this.desiredBarter._id;
      this.transaction.offeredBarter = selectedBarter._id;

      //console.log('Transaction:', this.transaction)

      this.transactionService.createTransaction(this.transaction).subscribe((transaction: Transaction) => {
        console.log('Transaction created:', transaction);
        this.closeDetails();
      });
      

    }
  }
}
