import { Component } from '@angular/core';
import { WbjeeService } from './wbjee.service';
import { WbjeeDto } from './wbjee-dto.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import Swal from 'sweetalert2';
import './result-table.css';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [NgFor, NgIf],
  template: `
    <header class="custom-header">
      <div class="header-content">
        <span class="header-icon">🎓</span>
        <span class="header-title">College Predictor Platform</span>
        <span class="header-subtitle">Empowering your future, one choice at a time</span>
      </div>
    </header>
    <main class="main">
      <div class="animated-lights">
        <div class="light-spot light-spot1"></div>
        <div class="light-spot light-spot2"></div>
        <div class="light-spot light-spot3"></div>
        <div class="light-spot light-spot4"></div>
      </div>
      <div class="animated-bg">
        <div class="floating-circles">
          <div class="circle c1"></div>
          <div class="circle c2"></div>
          <div class="circle c3"></div>
          <div class="circle c4"></div>
          <div class="circle c5"></div>
          <div class="circle c6"></div>
          <div class="circle c7"></div>
          <div class="circle c8"></div>
        </div>
      </div>
      <div class="animated-3d-cubes">
        <div class="cube cube1"></div>
        <div class="cube cube2"></div>
        <div class="cube cube3"></div>
        <div class="cube cube4"></div>
        <div class="cube cube5"></div>
        <div class="cube cube6"></div>
        <div class="cube cube7"></div>
        <div class="cube cube8"></div>
      </div>
      <div class="bg-white bg-opacity-90 rounded-4 shadow-lg p-4 mb-4 wbjee-form-container">
        <h2 class="result-heading">Predicted College based on {{ selectedYear || '2021' }} data</h2>
        <div class="table-responsive bg-white bg-opacity-100 rounded-4 shadow p-2">
          <div *ngIf="loading" class="custom-spinner-container">
            <div class="custom-spinner">
              <div class="dot dot1"></div>
              <div class="dot dot2"></div>
              <div class="dot dot3"></div>
            </div>
            <div class="spinner-text">Loading results, please wait...</div>
          </div>
          <table *ngIf="pagedData.length > 0" class="table table-striped table-hover table-bordered align-middle text-center">
            <thead class="table-success">
              <tr>
                <th>Best Fitted Choice</th>
                <th>Round</th>
                <th>Institute</th>
                <th>Course</th>
                <th>Stream</th>
                <th>Seat Type</th>
                <th>Quota</th>
                <th>Category</th>
                <th>Opening Rank</th>
                <th>Closing Rank</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let row of pagedData; let i = index">
                <td>{{ (page - 1) * pageSize + i + 1 }}</td>
                <td>{{ row.round }}</td>
                <td>{{ row.institute }}</td>
                <td>{{ row.course }}</td>
                <td>{{ row.stream }}</td>
                <td>{{ row.seatType }}</td>
                <td>{{ row.quota }}</td>
                <td>{{ row.category }}</td>
                <td>{{ row.openingRank }}</td>
                <td>{{ row.closingRank }}</td>
              </tr>
            </tbody>
          </table>
          <ng-container *ngIf="(selectedSeatType === 'JEE(Main) Seats') && (selectedYear === '2021' || selectedYear === '2022')">
            <div class="alert alert-warning text-center mt-4" style="font-size:1.1rem; border-radius:1rem; box-shadow:0 2px 16px 0 rgba(255,193,7,0.18); background: #fff3cd; color: #856404; border: 1.5px solid #ffeeba;">
              <i class="bi bi-exclamation-triangle" style="font-size:1.7rem;"></i><br>
              For year 2021 and 2022 or before, WBJEE did not consider JEE Mains Rank.<br>
              <span style="font-size:1rem; color:#856404;">Please select a different year or seat type.</span>
            </div>
          </ng-container>
          <ng-container *ngIf="showNoResultsAlert && !backendError">
            <div class="alert alert-info text-center mt-4" style="font-size:1.2rem; border-radius:1rem; box-shadow:0 2px 16px 0 rgba(99,102,241,0.08); background: linear-gradient(90deg, #f8fafc 0%, #e0e7ff 100%); color: #6366f1;">
              <i class="bi bi-emoji-frown" style="font-size:2rem;"></i><br>
              No results found for your selection.<br>
              <span style="font-size:1rem; color:#64748b;">Try changing your filters or check back later!</span>
            </div>
          </ng-container>
        </div>
        <nav *ngIf="totalPages > 1" aria-label="Page navigation" class="result-pagination-nav">
          <ul class="pagination justify-content-center">
            <li class="page-item" [class.disabled]="page === 1">
              <button class="page-link" (click)="setPage(page - 1)" [disabled]="page === 1">Previous</button>
            </li>
            <li class="page-item" *ngFor="let p of pages" [class.active]="p === page" [class.disabled]="p === '...'"><button class="page-link" *ngIf="p != '...'" (click)="setPage(+p)">{{ p }}</button><span class="page-link" *ngIf="p == '...'">&hellip;</span></li>
            <li class="page-item" [class.disabled]="page === totalPages">
              <button class="page-link" (click)="setPage(page + 1)" [disabled]="page === totalPages">Next</button>
            </li>
          </ul>
        </nav>
        <div style="text-align:center;margin-top:2rem;">
          <button class="btn btn-secondary" (click)="goBack()">Back</button>
        </div>
      </div>
    </main>
  `,
  styleUrls: ['./result-table.css']
})
export class ResultComponent {
  wbjeeDataList: WbjeeDto[] = [];
  pagedData: WbjeeDto[] = [];
  page = 1;
  pageSize = 10;
  totalPages = 1;
  selectedRound: string = '';
  maxClosingRank: number | null = null;
  selectedSeatType: string = '';
  selectedCourse: string = '';
  selectedYear: string = '';
  showNoResultsAlert = false;
  backendError = false;
  loading = false;

  constructor(private wbjeeService: WbjeeService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.selectedRound = params['round'] || '';
      // Log the raw param value
      console.log('[ResultComponent] raw maxClosingRank param:', params['maxClosingRank']);
      // Always parse as number, treat NaN as null
      const rankParam = params['maxClosingRank'];
      const parsed = Number(rankParam);
      this.maxClosingRank = (!isNaN(parsed)) ? parsed : null;
      this.selectedSeatType = params['seatType'] || '';
      this.selectedCourse = params['course'] || '';
      this.selectedYear = params['year'] || '';
      console.log('[ResultComponent] parsed maxClosingRank:', this.maxClosingRank, 'type:', typeof this.maxClosingRank, 'selectedSeatType:', this.selectedSeatType, 'selectedCourse:', this.selectedCourse, 'selectedYear:', this.selectedYear);
      this.fetchData();
    });
  }

  fetchData() {
    this.showNoResultsAlert = false;
    this.backendError = false;
    this.loading = true;
    this.wbjeeService.getWbjeeData(this.selectedRound, this.maxClosingRank, this.selectedSeatType, this.selectedCourse, this.selectedYear).subscribe({
      next: data => {
        console.log('ResultComponent received data:', data);
        let filtered = data;
        if (this.selectedRound && this.maxClosingRank !== null && this.maxClosingRank !== undefined && typeof this.maxClosingRank === 'number' && !isNaN(this.maxClosingRank)) {
          // If both params are present, assume backend filtered, do not filter again
        } else {
          if (this.selectedRound) {
            filtered = filtered.filter(row => row.round === this.selectedRound);
          }
          if (typeof this.maxClosingRank === 'number' && !isNaN(this.maxClosingRank)) {
            filtered = filtered.filter(row => +row.closingRank <= this.maxClosingRank!);
          }
        }
        this.wbjeeDataList = filtered;
        this.totalPages = Math.ceil(this.wbjeeDataList.length / this.pageSize);
        this.setPage(1);
        // Only show no results alert if backend is up and there are no results
        this.showNoResultsAlert = this.pagedData.length === 0 && !this.backendError;
        this.loading = false;
      },
      error: err => {
        this.showNoResultsAlert = false;
        this.backendError = true;
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Oops! Service Unavailable',
          text: 'We’re having trouble connecting to the server right now. Please check your internet connection or try again in a few minutes. If the problem persists, contact support.',
          confirmButtonColor: '#6366f1',
          background: '#f8fafc',
        });
      }
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

  goBack() {
    this.router.navigate(['/']);
  }
}
