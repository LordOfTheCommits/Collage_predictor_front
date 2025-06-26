import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WbjeeDto } from './wbjee-dto.model';

@Injectable({ providedIn: 'root' })
export class WbjeeService {
  constructor(private http: HttpClient) {}

  getWbjeeData(round?: string, maxClosingRank?: number | null, seatType?: string, course?: string, year?: string): Observable<WbjeeDto[]> {
    let url = 'http://localhost:8080/api/wbjee/predict';
    const params: string[] = [];
    console.log('[WbjeeService] Called getWbjeeData with:', { round, maxClosingRank, seatType, course, year, typeOfMaxClosingRank: typeof maxClosingRank });
    // Add round if present and not empty
    if (round && round !== '') {
      console.log('[WbjeeService] Adding round param:', round);
      params.push(`round=${encodeURIComponent(round)}`);
    }
    // Add maxClosingRank if present, not null/undefined, and is a finite number
    if (maxClosingRank !== null && maxClosingRank !== undefined && isFinite(Number(maxClosingRank))) {
      console.log('[WbjeeService] Adding maxClosingRank param:', maxClosingRank);
      params.push(`maxClosingRank=${encodeURIComponent(String(maxClosingRank))}`);
    } else {
      console.log('[WbjeeService] maxClosingRank not added to params:', maxClosingRank);
    }
    // Add seatType if present and not empty
    if (seatType && seatType !== '') {
      console.log('[WbjeeService] Adding seatType param:', seatType);
      params.push(`seatType=${encodeURIComponent(seatType)}`);
    }
    // Add course if present and not empty
    if (course && course !== '') {
      console.log('[WbjeeService] Adding course param:', course);
      params.push(`course=${encodeURIComponent(course)}`);
    }
    // Add year if present and not empty
    if (year && year !== '') {
      console.log('[WbjeeService] Adding year param:', year);
      params.push(`year=${encodeURIComponent(year)}`);
    }
    if (params.length > 0) {
      url += `?${params.join('&')}`;
    }
    console.log('[WbjeeService] Final URL:', url);
    return this.http.get<WbjeeDto[]>(url);
  }
}
