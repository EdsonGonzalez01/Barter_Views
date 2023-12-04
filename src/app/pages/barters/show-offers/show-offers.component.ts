import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Barter } from 'src/app/shared/interfaces/barter';
import { Transaction } from 'src/app/shared/interfaces/transaction';
import { User } from 'src/app/shared/interfaces/user';
import { TransactionService } from 'src/app/shared/services/transaction.service';
import { UserService } from 'src/app/shared/services/user.service';
import { BarterService } from 'src/app/shared/services/barter.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-show-offers',
  templateUrl: './show-offers.component.html',
  styleUrls: ['./show-offers.component.scss']
})
export class ShowOffersComponent {
  @Input() offeredBarter!: Barter;
  @Output() close = new EventEmitter<void>();
  @Output() barterUpdated = new EventEmitter<boolean>();

  selectedBarters: Barter[] = [];
  items: Barter[] = [];
  loggedUser: User = {} as User;
  private barterTransactionMap = new Map<string, string>();

  constructor(
    private transactionService: TransactionService, 
    private userService: UserService,
    private barterService: BarterService
  ) {
    this.userService.getUser().subscribe({
      next: (user: User) => {
        this.loggedUser = user;
      },
      error: (err) => {
        console.error(err); 
      }
    });

    this.transactionService.getOffererTransactions().subscribe({
      next: (transactions: Transaction[]) => {
        const barterObservables = transactions
          .filter(transaction => transaction.desiredBarter == this.offeredBarter._id)
          .map(transaction => {
            this.barterTransactionMap.set(transaction.offeredBarter, transaction._id!);
            return this.barterService.getBarterById(transaction.offeredBarter).pipe(
              map(barter => ({...barter, _id: transaction.offeredBarter}))
            );
          });

        forkJoin(barterObservables).subscribe({
          next: (barters) => {
            const filteredBarters = barters.filter(barter => barter.status !== 'bartered');
            this.items = filteredBarters;
          },
          error: (err) => {
            console.error('Error al obtener detalles de barters', err);
          }
        });
      },
      error: (err) => {
        console.error('Error al obtener transacciones', err);
      }
    });
  }

  closeDetails() {
    this.close.emit();
  }

  selectOffer() {
    if (this.selectedBarters.length > 0) {
      const selectedBarter = this.selectedBarters[0]; // Asumiendo una sola selección
      const transactionId = this.barterTransactionMap.get(selectedBarter._id);
  
      if (transactionId) {
        this.transactionService.updateTransaction(transactionId, 'accepted').subscribe({
          next: () => {
            console.log('Transacción actualizada con éxito');
  
            // Obtén la transacción para encontrar los IDs de los barters
            this.transactionService.getTransactionById(transactionId).subscribe({
              next: (transaction: Transaction) => {
                // Actualiza el estado de ambos barters
                this.updateBarterStatus(transaction.offeredBarter, 'bartered');
                this.updateBarterStatus(transaction.desiredBarter, 'bartered');
              },
              error: (err) => {
                console.error('Error al obtener la transacción', err)
              } 
            });
  
            this.barterUpdated.emit(true);
          },
          error: (error) => console.error('Error al actualizar la transacción', error)
        });
      } else {
        console.log('No se encontró la transacción asociada');
      }
    } else {
      console.log('No hay ninguna oferta seleccionada');
    }
  }
  
  updateBarterStatus(barterId: string, status: string) {
    this.barterService.updateBarter(barterId, { status }).subscribe({
      next: () => console.log(`Estado del barter ${barterId} actualizado a ${status}`),
      error: (err) => console.error('Error al actualizar el estado del barter', err)
    });
  }
  
}
