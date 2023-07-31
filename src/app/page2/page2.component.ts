import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css'],

})
export class Page2Component {
  refnumber: any; // To hold the data passed from Page1Component
  data: any; // To hold the data fetched from the JSON file
  constructor(private route: ActivatedRoute, private http: HttpClient) { }
  columnSums: any = {}; // To hold the sums of the columns

  ngOnInit() {
    this.http.get<any>('assets/page2data.json').subscribe(
      (data) => {
        this.data = data; // Assign the data to the class property for further processing
        console.log("Data fetched from json2: ", data); // Display the fetched data in the browser console for testing
        this.calculateColumnSums();
      },
      (error) => {
        console.error('Error:', error); // Handle any errors that occur during the HTTP request
      }
    );

    this.refnumber = this.route.snapshot?.queryParams;

    console.log("Data passed: ", this.refnumber.data);
    // TODO: print the data passed from Page1Component on the drop down
  }

  calculateColumnSums() {
    this.columnSums = {
      totaldistance: 0,
      totalhsfocons: 0,
      totalvlsfocons: 0,
      totallsmgocons: 0,
    };

    this.data.forEach((item: any) => {
      this.columnSums.totaldistance += Number(item.totaldistance);
      this.columnSums.totalhsfocons += Number(item.totalhsfocons);
      this.columnSums.totalvlsfocons += Number(item.totalvlsfocons);
      this.columnSums.totallsmgocons += Number(item.totallsmgocons);
    });
    console.log(this.columnSums);
  }

  toggleApprovalStatus(i: number) {
    if (this.data[i].approvestatus == "Verify") {
      this.data[i].approvestatus = "Verified";
      this.data[i].rejectstatus = "Reject";
    } else if (this.data[i].approvestatus == "Verified") {
      this.data[i].approvestatus = "Verify";
    }
  }
  toggleRejectStatus(i: number) {
    if (this.data[i].rejectstatus == "Reject") {
      this.data[i].rejectstatus = "Rejected";
      this.data[i].approvestatus = "Verify";
    } else if (this.data[i].rejectstatus == "Rejected") {
      this.data[i].rejectstatus = "Reject";
    }
  }
}
