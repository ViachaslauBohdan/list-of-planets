import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.sass']
})
export class PaginatorComponent implements OnInit {
  @Input() length: number
  @Output() onPageSizeChange = new EventEmitter<PageEvent>()
  constructor() { }

  pageSizeChange($event):void {
    console.log($event)

    this.onPageSizeChange.emit($event)
  }
  ngOnInit(): void {
  }

}
