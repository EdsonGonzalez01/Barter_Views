import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-barters',
  templateUrl: './barters.component.html',
  styleUrls: ['./barters.component.scss']
})
export class BartersComponent {

  constructor(private route: ActivatedRoute) { }

}
