import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { fromEvent } from 'rxjs';
import { of } from "rxjs";
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter
} from "rxjs/operators";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.sass']
})
export class InputComponent implements OnInit {
  @ViewChild('planetInput', { static: true }) planetInput: ElementRef;
  @Output() searchPlanet = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
    fromEvent(this.planetInput.nativeElement, 'keyup').pipe(
      map((event:any) =>  event.target.value)
      , debounceTime(1000)
      , distinctUntilChanged()
    ).subscribe((text: string) => {
      this.searchPlanet.emit(text)
    })
  }

}
