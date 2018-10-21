import {Employee} from '../employee';
import {DataService} from '../data.service';
import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import { Department } from 'app/department';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})

export class CreateEmployeeComponent implements OnInit {
  employee = new Employee();
  employees : Employee[];
  departments : Department[];
  dep : Department;
  submitted = false;
  selectedOption : any;

  constructor(private dataService: DataService,
    private location: Location) {}

  ngOnInit() {
    this.getDepartments();
  }

  public getDepartments() : Department[] {
    this.dataService.getDepartments().then(departments => this.departments = departments);
    return this.departments;
  }

  newCustomer(): void {
    this.submitted = false;
    this.employee = new Employee();
  }

  private save(): void {
    this.dataService.create(this.employee);
  }

  setSelectedOption(selectedOption : any) : void {
    this.selectedOption = selectedOption;
    this.dataService.getDepartmentById(this.selectedOption).then(dep => this.dep = dep);
  }

  onSubmit() {
    this.employee.departmentId = this.dep.departmentId;
    this.employee.departmentName = this.dep.departmentName;
    this.submitted = true;
    this.save();
  }

  goBack(): void {
    this.dataService.getEmployees().then(employees => this.employees = employees);
    this.location.back();
  }
}
