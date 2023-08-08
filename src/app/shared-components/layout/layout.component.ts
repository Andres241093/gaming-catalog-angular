import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isLoading = false;

  constructor(private readonly loadingService: LoadingService) { }

  ngOnInit(): void {
    this.loadingService.isLoading.subscribe({
      next: (load: boolean) => this.isLoading = load
    });
  }

}
