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
  @Input() toFirstPage: Subject<boolean>
  @Output() onPagerAction = new EventEmitter<PageEvent>()
  constructor() { }

  pagerAction($event):void {

    this.onPagerAction.emit($event)
  }
  ngOnInit(): void {
    // setInterval(()=>{console.log(this.pageIndex)},1000)
    // this.toFirstPage.subscribe(v => {
    //   if(v) this.resetPager()
    // })
  }

  resetPager(): void {
    this.paginator.firstPage()
  }

}
