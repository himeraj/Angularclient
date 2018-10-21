import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Employee } from './employee';
import { Department } from './department';

@Injectable()
export class DataService {
  private headers = new Headers(
    {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'If-Modified-Since':0,
      'Pragma': 'no-cache'
    });

  constructor(private http: Http) {}

  // Get all customers
  getEmployees(): Promise<Employee[]> {
    return this.http.get("http://localhost:8090/demo/employees")
      .toPromise()
      .then(response => response.json() as Employee[])
      .catch(this.handleError);
  }

  create(employee: Employee): Promise<Employee> {
    return this.http
      .post("http://localhost:8090/demo/employees/save", JSON.stringify(employee), {headers : this.headers})
      .toPromise()
      .then(res => res.json() as Employee)
      .catch(this.handleError);
  }

  updateEmployee(employee: Employee): Promise<Employee> {
    return this.http
      .post("http://localhost:8090/demo/employees/update", JSON.stringify(employee), {headers : this.headers})
      .toPromise()
      .then(res => res.json() as Employee)
      .catch(this.handleError);
  }

  getDepartments(): Promise<Department[]> {
    return this.http.get("http://localhost:8090/demo/departments")
      .toPromise()
      .then(response => response.json() as Department[])
      .catch(this.handleError);
  }

  getDepartmentById(id : any): Promise<Department> {
    return this.http.get("http://localhost:8090/demo/departments/findByDepartmentId?id="+id)
      .toPromise()
      .then(response => response.json() as Department)
      .catch(this.handleError);
  }

  deleteEmployee(employee : Employee): Promise<String> {
     return this.http.get("http://localhost:8090/demo/employees/delete?eId="+employee.employeeId)
     .toPromise()
     .then(response => (response != null ? response.json() as String : null))
     .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Error', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
