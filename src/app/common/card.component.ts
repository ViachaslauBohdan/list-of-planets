import { Component, OnInit } from '@angular/core';
import { PlanetsService } from '../planets/planets.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass']
})
export class CardComponent implements OnInit {

  constructor(private plnService: PlanetsService) { }

  ngOnInit(): void {
  }

}
