import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-barters-list',
  templateUrl: './barters-list.component.html',
  styleUrls: ['./barters-list.component.scss']
})
export class BartersListComponent {
  imageUrl:string = 'https://www.prensalibre.com/wp-content/uploads/2018/12/afa2268e-f4dc-411b-b150-1d850801b2a4.jpg?quality=52&w=1200' 
  items = Array.from({length: 12}).map((_, i) => `Item ${i + 1}`);

  constructor(private router: Router) {}

  navigateToChat(): void {
    this.router.navigate(['/chat']);
  }
}
