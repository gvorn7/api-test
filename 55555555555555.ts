import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { Observable } from "rxjs";

@Component({
  selector: "app-your-component",
  templateUrl: "./your-component.component.html",
  styleUrls: ["./your-component.component.css"],
})
export class YourComponent implements OnInit {
  form: FormGroup;
  suggestions$: Observable<string[]>;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      PartNo: new FormControl(null),
    });

    this.suggestions$ = this.form.get("PartNo").valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((value) => this.fetchSuggestions(value))
    );
  }

  fetchSuggestions(value: string): Observable<string[]> {
    // Call your service method to fetch suggestions
    return this.http.post<string[]>(`${this.apiUrl}/Post_PartNo`, {
      data: value,
    });
  }

  // Optionally, you can call this function to get the process based on the selected part number
  getProcess() {
    // Implement your logic here
  }
}
