import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { DataService } from '../data.service';

@Component({
  selector: 'customers-list',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})

export class EmployeeComponent implements OnInit {
  employees: Employee[];

  constructor(private dataService: DataService) {}

  getEmployees() {
     this.dataService.getEmployees().then(employees => this.employees = employees);
  }

  ngOnInit(): void {
     this.getEmployees();
  }
}