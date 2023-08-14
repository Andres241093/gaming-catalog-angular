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
    this.setData();
  }
  setData(): void {
    const value = localStorage.getItem('search');
    if(value){
      this.value.setValue(value);
    }
  }

  search(): void {
    const value = this.value.value ? this.value.value : '';
    if(value.length > 0){
      localStorage.setItem('search',value)
      this.searchValue.emit(value);
    }else{
      this.clearForm();
    }
  }

  clearForm(): void {
    this.value.setValue('');
    localStorage.removeItem('search');
    this.searchValue.emit('');
  }
}
