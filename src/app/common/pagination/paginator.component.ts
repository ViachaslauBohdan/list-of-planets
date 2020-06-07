import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.sass']
})
export class PaginatorComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;
  @Input() length: number
  @Output() onPagerAction = new EventEmitter<PageEvent>()

  public initialPageSize = 10
  private skipAction: boolean = false
  private event: PageEvent

  constructor() { }

  ngOnInit(): void {
  }
  getInitialPageSize(): number {
    return this.initialPageSize
  }
  pagerAction($event):void {
    this.event = $event
    if (!this.skipAction) {
      this.onPagerAction.emit($event)
    } else {
      this.skipAction = false
    }
  }

  resetPager(): void {
    if (this.event && this.event.pageIndex !== 0) {
      console.log('skipAction')
      this.skipAction = true
    }
    this.paginator.firstPage()
  }

}
