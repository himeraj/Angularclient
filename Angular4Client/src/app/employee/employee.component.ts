import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { DataService } from '../data.service';
import { Department } from 'app/department';

@Component({
  selector: 'customers-list',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})

export class EmployeeComponent implements OnInit {
  employees: Employee[];
  editRowId : any;
  employeeName : string;
  departmentName : string;
  departments : Department[];
  selectedOption : any;
  dep : Department;

  constructor(private dataService: DataService) {
    this.editRowId = 0;
  }

  getEmployees() {
     this.dataService.getEmployees().then(employees => this.employees = employees);
  }

  getDepartments() {
    this.dataService.getDepartments().then(departments => this.departments = departments);
  }

  setSelectedOption(selectedOption : any) : void {
    this.selectedOption = selectedOption;
    this.dataService.getDepartmentById(this.selectedOption).then(dep => this.dep = dep);
  }

  edit(emp) {
    this.editRowId = emp.employeeId;
    this.getDepartments();
  }

  save(emp) {
    this.editRowId = 0;
  }

  cancel(){
    this.editRowId = 0;
  }

  delete(emp) {
    this.dataService.deleteEmployee(emp);
    this.getEmployees();
  }

  update(emp) {
    emp.departmentId = this.dep.departmentId;
    emp.departmentName = this.dep.departmentName;
    this.dataService.updateEmployee(emp);
    this.editRowId = 0;
  }

  ngOnInit(): void {
     this.getEmployees();
  }
}