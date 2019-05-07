import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import "ngx-pagination";
import { EmployeeService } from '../service/employee.service';
import { Employee } from '../models/employee';
import { ValidationService } from '../validation.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.less']
})
export class EmployeeComponent implements OnInit {
  msg: string;
  updateEmpForm: any;
  empId: any;

  constructor(private employeeService: EmployeeService,private formbuilder: FormBuilder) {   }

  employee : Employee[];
  emp=[];
  empName;
  empSalary;
  empAge;
  pageSelectedValue = 10;
  addEmpForm;
  sort = "";
  sortCol = "";
  sortType = "";
  search = "";

  ngOnInit() {
    this.getEmp();
    this.addEmpForm = this.formbuilder.group({
      empName: [
        "",
        [Validators.required, ValidationService.stringValidator]
      ],
      empSalary: ["", [Validators.required, ValidationService.numberValidator]],
      empAge: ["", [Validators.required, ValidationService.numberValidator]]
    });
    this.updateEmpForm = this.formbuilder.group({
      empName: [
        "",
        [Validators.required, ValidationService.stringValidator]
      ],
      empSalary: ["", [Validators.required, ValidationService.numberValidator]],
      empAge: ["", [Validators.required, ValidationService.numberValidator]]
    });
  }

  getEmp() {
    this.employeeService.getEmployees().subscribe((res : Employee[])=>{
      this.employee = res;
      this.emp = this.employee;
    },
    err=>{
      alert(err.message);
    });
  }

  pageShowValue(event) {
    this.pageSelectedValue = event.target.value;
  }

  sortBy(column) {
    if (column == 'employee_name') {
      if (this.sortCol == column) {
        this.employee.sort(function (a, b) {
          if (a[column] > b[column])
            return -1
          if (a[column] < b[column])
            return 1
          return 0
        });
        this.sortCol = "";
        this.sort = column;
        this.sortType = "asc";
      }
      else {
        this.employee.sort(function (a, b) {
        
          if (a[column] < b[column]) {
            return -1
          }
          if (a[column] > b[column]) {
            return 1
          }
          return 0
        });
        this.sortCol = column;
        this.sort = column;
        this.sortType = "des";
      }
    }
    if (column == 'id') {
      if (this.sortCol == column) {
        this.employee.sort(function (a, b) {
          return a[column] - b[column]
        });
        this.sortCol = "";
        this.sort = column;
        this.sortType = "asc";
      }
      else {
        this.employee.sort(function (a, b) {
          return b[column] -a[column]
        });
        this.sortCol = column;
        this.sort = column;
        this.sortType = "des";
      }
    }
    if (column == 'employee_salary') {
      if (this.sortCol == column) {
        this.employee.sort(function (a, b) {
          return a[column] - b[column]
        });
        this.sortCol = "";
        this.sort = column;
        this.sortType = "asc";
      }
      else {
        this.employee.sort(function (a, b) {
          return b[column] -a[column]
        });
        this.sortCol = column;
        this.sort = column;
        this.sortType = "des";
      }
    }
    if (column == 'employee_age') {
      if (this.sortCol == column) {
        this.employee.sort(function (a, b) {
          return a[column] - b[column]
        });
        this.sortCol = "";
        this.sort = column;
        this.sortType = "asc";
      }
      else {
        this.employee.sort(function (a, b) {
          return b[column] -a[column]
        });
        this.sortCol = column;
        this.sort = column;
        this.sortType = "des";
      }
    }
  }

  searchBy() {
    this.employee = this.emp.filter((row) => {
      return row['employee_name'].includes(this.search) ||  row['employee_salary'].includes(this.search) ||  row['employee_age'].includes(this.search) || row['id'].includes(this.search);
    })
  }

  createEmp() {
    let name = this.addEmpForm.get('empName').value;
    let salary = this.addEmpForm.get('empSalary').value;
    let age = this.addEmpForm.get('empAge').value;

    let data = {
      "name":name,
      "salary":salary,
      "age":age
    }
    this.employeeService.addEmployee(data).subscribe((res : Employee[])=>{
      if(res) {
      this.msg = "Employee Added Successfully!!"
      this.getEmp();
      }
      else {
        document.getElementById('notoggle').removeAttribute("data-toggle");
      }
    },
    err=>{
      alert(err.message);
    });
  }

  deleteEmp(empId){
    this.employeeService.deleteEmployee(empId).subscribe(res => {
      if(res){
        this.msg =res['success']['text'];
        this.getEmp();
      }
      else{
        document.getElementById('del').removeAttribute("data-toggle");
      }
    },
    err => {
      alert(err.message);
    }); 
  }

  fetchDetails(empId){
    this.employeeService.getSingleEmployee(empId).subscribe(res => {
      this.empName =res['employee_name'];
      this.empSalary =res['employee_salary'];
      this.empAge =res['employee_age'];
      this.empId =res['id'];
    },
    err => {
      alert(err.message);
    }); 
  }

  updateEmp(){
    let name = this.empName;
    let salary = this.empSalary;
    let age = this.empAge;
    let data = {
      "name":name,
      "salary":salary,
      "age":age
    }
    this.employeeService.updateEmployee(this.empId,data).subscribe(res => {
      if(res){
        this.msg ="Employee Updated Successfully!!";
        this.getEmp();
      }
      else{
        document.getElementById('update').removeAttribute("data-toggle");
      }
    },
    err => {
      alert(err.message);
    }); 
  }

}
