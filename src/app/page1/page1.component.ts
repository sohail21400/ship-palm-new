import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component {
  data: any; // To hold the data fetched from the JSON file
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.http.get<any>('assets/page1data.json').subscribe(
      (data) => {
        this.data = data; // Assign the data to the class property for further processing
        console.log(data); // Display the fetched data in the browser console for testing
      },
      (error) => {
        console.error('Error:', error); // Handle any errors that occur during the HTTP request
      }
    );
  }

  redirectToPage2(refnumber: any) {
    // Perform any necessary data manipulation or processing
    // Navigate to Page2Component with selectedData
    this.router.navigate(['/page2'], { queryParams: { data: refnumber } });
  }
}
