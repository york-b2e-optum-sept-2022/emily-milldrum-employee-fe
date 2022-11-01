import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from 'src/Employee';
import { Manager } from 'src/Employee';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getAllEmployees() : Observable<Employee[]> {
    return this.http.get<Employee[]>('http://localhost:8080/api/employee')
  }

  deleteEmployeeById(id: number) : Observable<string> {
    return this.http.delete<string>(`http://localhost:8080/api/employee/${id}`)
  }

  updateEmployeeById(id: number, employee: Employee) : Observable<string> {
    return this.http.put<string>(`http://localhost:8080/api/employee/${id}`, employee)}

  createEmployee(newEmployee: Employee) : Observable<Employee>{
    console.log('http service')
    console.log(newEmployee)
    return this.http.post<Employee>("http://localhost:8080/api/employee/add", newEmployee)};

  // createEmployee(newEmployee: Employee) {
  //
  //   return this.http.post(`http://localhost:8080/api/employee/`, newEmployee) as Observable<Employee>;
  //
  // }
  createManager(manager: Manager) : Observable<Manager>{
      console.log('http service')
      console.log(manager)
      return this.http.post<Manager>("http://localhost:8080/api/manager/add", manager)
  }

  getAllManagers() : Observable<Manager[]> {
    console.log('get managers http')
    return this.http.get<Manager[]>('http://localhost:8080/api/manager')
  }
}
