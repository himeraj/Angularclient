import {EmployeeComponent} from './employee/employee.component';
import {CreateEmployeeComponent} from './create-employee/create-employee.component';

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', component: EmployeeComponent},
  {path: 'employee', component: EmployeeComponent},
  {path: 'add', component: CreateEmployeeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}

