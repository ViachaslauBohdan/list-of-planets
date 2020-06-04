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
  // @Input() toFirstPage: Subject<boolean>
  @Input() pageIndex: number
  @Output() onPagerAction = new EventEmitter<PageEvent>()
  constructor() { }

  pagerAction($event):void {
    if ($event.pageIndex > 0) {
      this.onPagerAction.emit($event)
    }
  }
  ngOnInit(): void {

  }

  resetPager(): void {
    this.paginator.firstPage()
  }

}
