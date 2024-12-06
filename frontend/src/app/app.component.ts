import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import * as bootstrap from 'bootstrap'; 
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public employees!: Employee[];
  public editEmployee: Employee | null = null;
  public deleteEmployee: Employee | null = null;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (res: Employee[]) => {
        console.log(res)
        this.employees = res;
      },
      error: (err: HttpErrorResponse) => {
        alert(err.message);
      }
    });
  }

  public onOpenModal(employee: Employee | null, mode: string): void {
    let modalId = '';  

    if (mode === 'add') {
      modalId = '#addEmployeeModal';
    } else if (mode === 'edit') {
      // Assign employee, even if it's null
      this.editEmployee = employee;
      modalId = '#updateEmployeeModal';
    } else if (mode === 'delete') {
      this.deleteEmployee = employee;
      modalId = '#deleteEmployeeModal';
    }

    const modalElement = document.querySelector(modalId); 

    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);  
      modal.show(); 
    }
  }

  public onAddEmployee(addForm: NgForm) {
    document.getElementById('add-employee-form')!.click();
    this.employeeService.addEmployees(addForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.getEmployees();
      },
      error: (err: HttpErrorResponse) => {
        alert(err.message);
      }
    });
  }

  public onUpdateEmployee(employee: Employee) {
    this.employeeService.updateEmployees(employee).subscribe({
      next: (res) => {
        console.log(res);
        this.getEmployees();
      },
      error: (err: HttpErrorResponse) => {
        alert(err.message);
      }
    });
  }
  public onDeleteEmployee() {
    if (this.deleteEmployee) {
      this.employeeService.deleteEmployees(this.deleteEmployee.id).subscribe({
        next: ()=> {
          this.getEmployees();
        }
      })
    }
   
  }

  onClose() {
    const modalElement = document.getElementById('addEmployeeModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);  
      modal.hide();  
    }
  }
}
