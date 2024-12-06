import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Employee } from "./employee";
import { environment } from "../environments/environment";


@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    private apiUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    public getEmployees(): Observable<Employee[]> {
        return this.http.get<Employee[]>(`${this.apiUrl}/employee/all`);
    }

    public addEmployees(employee: Employee): Observable<Employee> {
        return this.http.post<Employee>(`${this.apiUrl}/employee/add`, employee);
    }

    public updateEmployees(employee: Employee): Observable<Employee> {
        return this.http.put<Employee>(`${this.apiUrl}/employee/update`, employee);
    }

    public deleteEmployees(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/employee/delete/${id}`);
    }
}