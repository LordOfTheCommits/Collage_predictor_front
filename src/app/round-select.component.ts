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
      <header class="custom-header" style="background: linear-gradient(90deg, #f8fafc 0%, #a5b4fc 100%); border-bottom-left-radius: 2.5rem; border-bottom-right-radius: 2.5rem; box-shadow: 0 4px 24px 0 rgba(99,102,241,0.10); margin-bottom: 1.5rem;">
        <div class="header-content" style="max-width: 900px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 0.2rem; padding: 1.2rem 0;">
          <span class="header-icon" style="background: #e0e7ff; border-radius: 50%; padding: 0.5rem 0.7rem; box-shadow: 0 2px 12px #a5b4fc55; font-size: 2.3rem; margin-bottom: 0.2rem; display: inline-block; color: #6366f1;">
            🧭
          </span>
          <span class="header-title" style="font-size: 2rem; font-weight: 800; letter-spacing: 1.1px; color: #22223b; margin-bottom: 0.1rem; text-shadow: 0 2px 8px #a5b4fc33;">
            Welcome to the WBJEE College Predictor
          </span>
          <span class="header-subtitle" style="font-size: 1.1rem; color: #374151; font-weight: 500; letter-spacing: 0.6px; text-shadow: 0 2px 8px #a5b4fc33; display: block;">
            Enter your details below to discover the best colleges for you!
          </span>
        </div>
      </header>
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
            <label for="maxClosingRank" class="wbjee-form-label">Your Expected | Actual rank:</label>
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
  courses =  [
    "Agricultural Engineering",
    "Apparel & Production Management",
    "Architectural Engineering",
    "Architecture",
    "ARTIFICIAL INTELLIGENCE (AI)",
    "ARTIFICIAL INTELLIGENCE (AI) AND DATA SCIENCE",
    "Artificial Intelligence And Data Science",
    "Artificial Intelligence And Machine Learning",
    "Automobile Engineering",
    "B ARCH",
    "B.Pharm/Pharmaceutical Technology",
    "Biomedical Engineering",
    "CERAMIC ENGINEERING AND TECHNOLOGY",
    "CHEMICAL TECHNOLOGY (Ceramic Engineering Oil Technology Petrochem & petro refinery Engg Pharmaceutical & Fine Chemical Technology)",
    "Chemical Engineering",
    "Civil And Environmental Engineering",
    "Civil Engineering",
    "CLOUD COMPUTING",
    "Computer Science",
    "COMPUTER SCIENCE & ENGINEERING (NETWORKS)",
    "COMPUTER SCIENCE & ENGINEERING (ROBOTICS AND ARTIFICIAL INTELLIGENCE)",
    "COMPUTER SCIENCE AND APPLIED MATHEMATICS",
    "COMPUTER SCIENCE AND INFORMATION TECHNOLOGY",
    "COMPUTER SCIENCE & ENGINEERING (Artificial Intelligence)",
    "COMPUTER SCIENCE & ENGINEERING (Artificial Intelligence And Machine Learning)",
    "COMPUTER SCIENCE & ENGINEERING (Cyber Security)",
    "COMPUTER SCIENCE & ENGINEERING (Data Science)",
    "COMPUTER SCIENCE & ENGINEERING (Internet Of Things And Cyber Security Including Block Chain Technology)",
    "COMPUTER SCIENCE & ENGINEERING (IOT)",
    "Computer Science & Engineering",
    "Computer Science & Engineering (Artificial Intelligence)",
    "Computer Science & Engineering (Artificial Intelligence And Machine Learning)",
    "Computer Science & Engineering (Cyber Security)",
    "Computer Science & Engineering (Data Science)",
    "Computer Science & Engineering (Internet Of Things And Cyber Security Including Block Chain Technology)",
    "Computer Science & Engineering (IOT)",
    "Computer Science & Technology",
    "Computer Science And Business System",
    "Computer Science And Design",
    "Construction Engineering",
    "Data Science",
    "Dairy Technology",
    "Electrical & Electronics Engineering",
    "Electrical Engineering",
    "ELECTRONICS & COMPUTER SCIENCE",
    "ELECTRONICS ENGINEERING (VLSI DESIGN AND TECHNOLOGY)",
    "Electronics & Communication Engineering",
    "Electronics & Tele-Communication Engineering",
    "Electronics And Instrumentation Engineering",
    "Food Technology",
    "Food Technology And Bio Chemical Engineering",
    "Information Technology",
    "Instrumentation & Electronics",
    "Instrumentation Engineering",
    "Jute & Fibre Technology",
    "Leather Technology",
    "Mechanical Engineering",
    "Metallurgical And Materials Engineering",
    "Metallurgical Engineering",
    "Mining Engineering",
    "Optics & Optoelectronics",
    "Polymer Science & Technology",
    "Power Engineering",
    "PRINTING ENGINEERING",
    "Production Engineering",
    "Textile Technology"
];
selectedCourse: string = '';
  years = ['2021', '2022', '2023', '2024', '2025'];
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
    let yearToSend = this.selectedYear ? this.selectedYear : '2024';
    if (this.selectedRound && maxClosingRankStr !== '' && this.selectedSeatType && this.selectedCourse) {
      const queryParams: any = { round: this.selectedRound, maxClosingRank: maxClosingRankStr, seatType: this.selectedSeatType, course: this.selectedCourse };
      if (yearToSend) queryParams.year = yearToSend;
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
