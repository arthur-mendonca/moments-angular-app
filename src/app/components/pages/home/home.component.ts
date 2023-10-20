import { Component, OnInit } from "@angular/core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Moment } from "src/app/Moments";
import { MomentService } from "src/app/services/moment.service";
import { environments } from "src/environments/environments";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  allMoments: Moment[] = [];
  moments: Moment[] = [];
  faSearch = faSearch;
  baseApiUrl = environments.baseApiUrl;
  searchTerm: string = "";

  constructor(private momentService: MomentService) {}

  logMoment(moment: Moment) {
    console.log(moment);
  }

  search(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    this.moments = this.allMoments.filter((moment) => {
      return moment.title.toLocaleLowerCase().includes(value);
    });
  }

  ngOnInit(): void {
    this.momentService.getAllMoments().subscribe((response) => {
      const responseData = response.data;
      console.log(response);

      responseData.map((item) => {
        item.created_at = new Date(item.created_at!).toLocaleDateString(
          "pt-BR"
        );
        item.updated_at = new Date(item.updated_at!).toLocaleDateString(
          "pt-BR"
        );
      });
      this.allMoments = responseData;
      this.moments = responseData;
    });
  }
}
