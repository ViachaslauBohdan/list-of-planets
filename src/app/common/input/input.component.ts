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
  @Output() passPlanet = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
    fromEvent(this.planetInput.nativeElement, 'keyup').pipe(
      map((event:any) => {
        return event.target.value
      })
      // , filter(value => value.length > 0)
      , debounceTime(1000)
      , distinctUntilChanged()
    ).subscribe((text: string) => {
      console.log(text)
      this.passPlanet.emit(text)
    })
  }

}
