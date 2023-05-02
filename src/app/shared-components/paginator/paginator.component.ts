import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PAGINATOR_INITIAL_VALUES } from 'src/app/const/paginator-initial-values';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
  @Output() paginatorData = new EventEmitter<any>();
  @Input() length = 0;
  @Input() pageSize = 0;
  pageSizeOptions = PAGINATOR_INITIAL_VALUES.pageSizeOptions;
  constructor() { }

  ngOnInit(): void {
  }

  onChange(event: PageEvent): void {
    this.paginatorData.emit(event);
  }
}
