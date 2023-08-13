import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Output() searchValue = new EventEmitter<string>();
  value = new FormControl('');

  constructor() { }

  ngOnInit(): void {
    this.value.valueChanges
    .pipe(debounceTime(500))
    .subscribe({
      next: value => {
        if(typeof value === 'string'){
          this.searchValue.emit(value)
        }
      }
    });
  }

  clearForm(): void {
    this.value.setValue('');
  }
}
