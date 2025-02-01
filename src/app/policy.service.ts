import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Policy {
  id: number;
  name: string;
  type: string;
  premium: number;
  coverage: number;
}

@Injectable({
  providedIn: 'root',
})
export class PolicyService {
  private apiUrl = 'http://localhost:3000/api/policies/'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  getPolicies(): Observable<Policy[]> {
    return this.http.get<Policy[]>(this.apiUrl);
  }

  searchPolicies(query: string): Observable<Policy[]> {

    return this.http.get<Policy[]>(`${this.apiUrl}search?name=${query}`);
  }

  filterPolicies(filters: any): Observable<Policy[]> {
    let url = `${this.apiUrl}/filter?`;
    if (filters.minPremium) url += `minPremium=${filters.minPremium}&`;
    if (filters.maxPremium) url += `maxPremium=${filters.maxPremium}&`;
    if (filters.type) url += `type=${filters.type}&`;
    if (filters.minCoverage) url += `minCoverage=${filters.minCoverage}&`;
    return this.http.get<Policy[]>(url);
  }

  sortPolicies(sortBy: string, order: string): Observable<Policy[]> {
    console.log((`${this.apiUrl}sort?order=${order}`));
    
    return this.http.get<Policy[]>(`${this.apiUrl}sort?order=${order}`);
  }
}