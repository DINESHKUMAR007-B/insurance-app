import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { PolicyService, Policy } from '../policy.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-policy-list',
  standalone: false,
  templateUrl: './policy-list.component.html',
  styleUrls: ['./policy-list.component.scss'],
})
export class PolicyListComponent implements OnInit, AfterViewInit {
  policies: Policy[] = [];
  displayedColumns: string[] = ['sno', 'policyId', 'name', 'type', 'premium', 'coverage'];
  dataSource: MatTableDataSource<Policy>;
  @ViewChild(MatPaginator) paginator: any;
  searchQuery: string = '';
  filters: any = {
    minPremium: null,
    maxPremium: null,
    type: '',
    minCoverage: null,
  };
  sortOrder: string = 'asc';
  pageSize = 5; // Default page size
  pageSizeOptions: number[] = [5, 10, 20]; // Page size options

  constructor(private policyService: PolicyService) {
    this.dataSource = new MatTableDataSource(this.policies);
  }

  ngOnInit(): void {
    this.fetchPolicies();
  }
  onPageChange(event: any): void {
    this.pageSize = event.pageSize;

  }
  ngAfterViewInit(): void {

    this.dataSource.paginator = this.paginator;
  }

  fetchPolicies(): void {
    this.policyService.getPolicies().subscribe((data) => {
      this.policies = data;
      this.updateDataSource();
    });
  }

  search(): void {
    if (this.searchQuery) {
      this.policyService.searchPolicies(this.searchQuery).subscribe((data) => {
        this.policies = data;
        this.updateDataSource();
      });
    } else {
      this.fetchPolicies();
    }
  }

  applyFilters(): void {
    this.policyService.filterPolicies(this.filters).subscribe((data) => {
      this.policies = data;
      this.updateDataSource();
    });
  }

  sort(): void {
    this.policyService.sortPolicies('premium', this.sortOrder).subscribe((data) => {
      this.policies = data;
      this.updateDataSource();
    });
  }

  private updateDataSource(): void {

    this.dataSource = new MatTableDataSource(this.policies);

    this.dataSource.paginator = this.paginator;
  }
}
