import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {Planet} from '../../planets/planets.interface'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass']
})
export class CardComponent implements OnInit, OnChanges {
  @Input() planet: Planet | null

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    console.log(this.planet)
  }

}
