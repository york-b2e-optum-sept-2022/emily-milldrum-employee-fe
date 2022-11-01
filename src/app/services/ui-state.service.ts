import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {Employee, Manager} from 'src/Employee';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UiStateService {
  // public employees: Employee[] = [
  //   {
  //     name: "Max",
  //     role: "Dictator"
  //   },
  //   {
  //     name: "Dav",
  //     role: "Peasant"
  //   }
  // ]
  private employeesSubject: Subject<Employee[]> = new Subject
  private managerSubject: Subject<Manager[]> = new Subject;

  constructor(private http: HttpService) {
    this.http.getAllEmployees().subscribe(employees => {
        // employees = employees.sort;
        this.employeesSubject.next(employees)

        console.log('hello employees')
      }
    )

    this.http.getAllManagers().subscribe(managers => {
        // employees = employees.sort;
        this.managerSubject.next(managers)

        console.log('hello managers')
      }
    )

  }

  whenEmployeesUpdated(): Observable<Employee[]> {
    return this.employeesSubject;
  }

  whenManagersUpdated() : Observable<Manager[]> {
    return this.managerSubject;
  }

  deleteEmployeeById(id: number | undefined): void {
    if (id === undefined)
      return

    this.http.deleteEmployeeById(id).subscribe(message =>
      this.http.getAllEmployees().subscribe(employees =>
        this.employeesSubject.next(employees)
      )
    )
  }

  updateEmployeeById(id: number, employee: Employee) {

    if (id === undefined) return;

    this.http.updateEmployeeById(id, employee).subscribe(message => {
      console.log(message);
      this.http.getAllEmployees().subscribe(employees =>
        this.employeesSubject.next(employees))
    })
  }

  createEmployee(newEmployee: Employee) {
    if (newEmployee.name === undefined) return;
    this.http.createEmployee(newEmployee)
    this.http.getAllEmployees().subscribe(employees => this.employeesSubject.next(employees))
  }

  onCreate(employee: Employee){
    this.http.createEmployee(employee).subscribe(newEmployee =>{
      console.log(newEmployee);
      this.http.getAllEmployees().subscribe(employees =>
        this.employeesSubject.next(employees)
      )
    })
    //this.isCreating();
  }

  onPromote(employee: Employee | undefined) {
    if (employee === undefined) return;
    let manager = {
      id: employee.id,
      name: employee.name,
    }
  if (employee.id !== undefined){
    employee.manager = true;
    this.http.updateEmployeeById(employee.id, employee).subscribe(message => {
      console.log(message);
      this.http.getAllEmployees().subscribe(employees =>
        this.employeesSubject.next(employees))
    })
    this.http.createManager(manager).subscribe(manager =>{
      console.log(manager);
      this.http.getAllManagers().subscribe(managers => this.managerSubject.next(managers))
    })
  }

  }

}
