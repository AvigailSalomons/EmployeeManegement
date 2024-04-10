import * as XLSX from 'xlsx';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from '../models/employee.model';
import saveAs from 'file-saver';


export function exportToExcel(dataSource: MatTableDataSource<Employee>, filename: string) {
    const data: Employee[] = dataSource.data;

    // צור את הגיליון באקסל
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    // יצוא הקובץ
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const excelBlob: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(excelBlob, filename + '.xlsx');
  
  }
  