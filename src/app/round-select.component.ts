import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-round-select',
  standalone: true,
  imports: [NgFor, FormsModule],
  template: `
    <main class="main">
      <div class="animated-bg">
        <!-- Removed SVG lines for a cleaner look -->
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
      <div class="wbjee-form-container">
        <h2>Wbjee College Predictor</h2>
        <form (ngSubmit)="onSubmit()">
          <div class="wbjee-form-group">
            <label for="roundSelect" class="wbjee-form-label">Select Round:</label>
            <select id="roundSelect" class="wbjee-form-select" [(ngModel)]="selectedRound" name="round" required>
              <option value="" disabled>Select a round</option>
              <option *ngFor="let r of rounds" [value]="r">Round {{ r }}</option>
            </select>
          </div>
          <div class="wbjee-form-group">
            <label for="maxClosingRank" class="wbjee-form-label">Max Closing Rank:</label>
            <input id="maxClosingRank" name="maxClosingRank" type="number" class="wbjee-form-input" [(ngModel)]="maxClosingRank" required min="0">
          </div>
          <div class="wbjee-form-group">
            <label for="seatTypeSelect" class="wbjee-form-label">Seat Type:</label>
            <select id="seatTypeSelect" class="wbjee-form-select" [(ngModel)]="selectedSeatType" name="seatType" required>
              <option value="" disabled>Select seat type</option>
              <option *ngFor="let s of seatTypes" [value]="s">{{ s }}</option>
            </select>
          </div>
          <div class="wbjee-form-group">
            <label for="courseSelect" class="wbjee-form-label">Course:</label>
            <select id="courseSelect" class="wbjee-form-select" [(ngModel)]="selectedCourse" name="course" required>
              <option value="" disabled>Select course</option>
              <option *ngFor="let c of courses" [value]="c">{{ c }}</option>
            </select>
          </div>
          <div class="wbjee-form-group">
            <label for="yearSelect" class="wbjee-form-label">Year:</label>
            <select id="yearSelect" class="wbjee-form-select" [(ngModel)]="selectedYear" name="year">
              <option value="" selected>Select year (optional)</option>
              <option *ngFor="let y of years" [value]="y">{{ y }}</option>
            </select>
          </div>
          <button
            class="wbjee-form-btn"
            [class.ready]="selectedRound && maxClosingRank !== null && maxClosingRank !== undefined && selectedSeatType && selectedCourse"
            type="submit"
            [disabled]="!selectedRound || maxClosingRank === null || maxClosingRank === undefined || !selectedSeatType || !selectedCourse"
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  `,
  styleUrls: ['./app.component.css']
})
export class RoundSelectComponent {
  selectedRound: string = '';
  rounds = ['1', '2', '3'];
  maxClosingRank: number | null = null;
  seatTypes = ['JEE(Main) Seats', 'WBJEE Seats'];
  selectedSeatType: string = '';
  courses = ['Electronics & Communication Engineering', 'Computer Science & Engineering','Information Technology'];
  selectedCourse: string = '';
  years = ['2021', '2022', '2023', '2024'];
  selectedYear: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    console.log('[RoundSelectComponent] onSubmit called with:', {
      selectedRound: this.selectedRound,
      maxClosingRank: this.maxClosingRank,
      selectedSeatType: this.selectedSeatType,
      selectedCourse: this.selectedCourse,
      selectedYear: this.selectedYear,
      typeOfMaxClosingRank: typeof this.maxClosingRank
    });
    // Always send as string, even if 0
    const maxClosingRankStr = this.maxClosingRank !== null && this.maxClosingRank !== undefined ? String(this.maxClosingRank) : '';
    if (this.selectedRound && maxClosingRankStr !== '' && this.selectedSeatType && this.selectedCourse) {
      const queryParams: any = { round: this.selectedRound, maxClosingRank: maxClosingRankStr, seatType: this.selectedSeatType, course: this.selectedCourse };
      if (this.selectedYear) queryParams.year = this.selectedYear;
      this.router.navigate(['/wbjee'], { queryParams });
    }
  }

  onRoundChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedRound = select.value;
    console.log('RoundSelectComponent onRoundChange:', this.selectedRound);
  }

  onSeatTypeChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedSeatType = select.value;
    console.log('RoundSelectComponent onSeatTypeChange:', this.selectedSeatType);
  }

  onCourseChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedCourse = select.value;
    console.log('RoundSelectComponent onCourseChange:', this.selectedCourse);
  }

  onYearChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedYear = select.value;
    console.log('RoundSelectComponent onYearChange:', this.selectedYear);
  }
}
