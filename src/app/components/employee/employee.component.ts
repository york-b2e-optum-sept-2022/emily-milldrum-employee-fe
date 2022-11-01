import { Component, Input, OnInit } from '@angular/core';
import { UiStateService } from 'src/app/services/ui-state.service';
import { Employee } from 'src/Employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  @Input() employee: Employee | undefined
  employeeCopy!: Employee


  // What does the ! do?
  // It is not the same as Employee | undefined
  // It is not the same as Employee | null
  // Typescript wants to check that your code is type correct
  // ! disables that check entirely for this field

  isUpdating: boolean = false;

  constructor(private uiState: UiStateService) { }

  ngOnInit(): void {
  }

  validate(employee: Employee | undefined) {
    if (employee !== undefined && employee.id !== undefined ) {
      return true;
    } else {
      return false;
    }
  }

  onDelete() : void {
    this.uiState.deleteEmployeeById(this.employee?.id)
  }


  onCancel() {
    this.isUpdating = false;
  }

  onSave() {
    if (this.employeeCopy !== undefined && this.employeeCopy.id !== undefined ) {
      this.uiState.updateEmployeeById(this.employeeCopy.id, this.employeeCopy);
    } else {
      console.log('error');
    }
  }

  onUpdate() {

    if (this.employee !== undefined && this.employee.id !== undefined ) {
      this.employeeCopy = {...this.employee};
      this.isUpdating = true;
    } else {
      console.log('error')
    }

  }

  onPromote() {
    this.uiState.onPromote(this.employee);
  }
}
