import { Component, inject } from '@angular/core';
import { RouterOutlet, ActivatedRoute } from '@angular/router';
import { WbjeeService } from './wbjee.service';
import { WbjeeDto } from './wbjee-dto.model';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-first-angular-app';
  selectedRound: string = '';
  wbjeeDataList: WbjeeDto[] = [];
  pagedData: WbjeeDto[] = [];
  page = 1;
  pageSize = 10;
  totalPages = 1;

  constructor(private wbjeeService: WbjeeService) {
    const route = inject(ActivatedRoute);
    route.queryParams.subscribe(params => {
      this.selectedRound = params['round'] || '';
      this.fetchData();
    });
  }

  fetchData() {
    this.wbjeeService.getWbjeeData(this.selectedRound).subscribe(data => {
      this.wbjeeDataList = data;
      this.totalPages = Math.ceil(this.wbjeeDataList.length / this.pageSize);
      this.setPage(1);
    });
  }

  setPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.page = page;
    const start = (page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedData = this.wbjeeDataList.slice(start, end);
  }

  get pages(): (number | string)[] {
    const pages: (number | string)[] = [];
    if (this.totalPages <= 7) {
      for (let i = 1; i <= this.totalPages; i++) pages.push(i);
    } else {
      if (this.page <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push('...');
        pages.push(this.totalPages);
      } else if (this.page >= this.totalPages - 3) {
        pages.push(1);
        pages.push('...');
        for (let i = this.totalPages - 4; i <= this.totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = this.page - 1; i <= this.page + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(this.totalPages);
      }
    }
    return pages;
  }
}
