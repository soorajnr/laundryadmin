import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import {Component} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PeriodicElement } from './taskmodel';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-on-process',
  templateUrl: './on-process.component.html',
  styleUrls: ['./on-process.component.scss']
})


// @NgModule({
//   declarations: [],
//   imports: [
//     CommonModule
//   ]
// })

export class OnprocessComponent {
  // displayedColumns: string[] = ['property', 'username', 'location', 'status','taskdetail', 'action'];
  addTaskForm: FormGroup;
  assignedTaskForm: FormGroup;
  displayedColumns: string[] = [
    'property',
    'username',
    'location',
    'status',
    'taskdetail',
    'action',
  ];

  ELEMENT_DATA: PeriodicElement[] = [];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  itemCountText = ''; 
  constructor(private fb: FormBuilder, private dialog: MatDialog,private http: HttpClient) {
    
       this.assignedTaskForm = this.fb.group({
        // username: ['', Validators.required],
        // password: ['', Validators.required],
        // location: ['', Validators.required]
      });

      this.addTaskForm = this.fb.group({
        property: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', Validators.required],
        location: ['', Validators.required],
        taskdetail: ['', Validators.required],
      });
  }
  ngOnInit(): void {
    // Fetch data from the API when the component is initialized
    this.fetchDataFromAPI();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }





  fetchDataFromAPI(): void {
    // Make an HTTP GET request to your Django API endpoint
    this.http
      .get<PeriodicElement[]>('https://albecoservice.com/jobapi/jobapi/OnprocessJobCardViewSet/')
      .subscribe(
        (data) => {
          this.ELEMENT_DATA = data;
          this.dataSource.data = this.ELEMENT_DATA.slice();
          const itemCount = this.ELEMENT_DATA.length;
          if (itemCount > 100) {
            this.itemCountText = '100+';
          } else {
            this.itemCountText = itemCount.toString();
          }
        },
        (error) => {
          console.error('Error fetching data from API:', error);
        }
      );
  }
}