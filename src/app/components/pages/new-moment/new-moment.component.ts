import { Component } from "@angular/core";
import { Moment } from "src/app/Moments";
import { MomentService } from "src/app/services/moment.service";
import { MessagesService } from "src/app/services/messages.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-new-moment",
  templateUrl: "./new-moment.component.html",
  styleUrls: ["./new-moment.component.css"],
})
export class NewMomentComponent {
  constructor(
    private momentService: MomentService,
    private messageService: MessagesService,
    private router: Router
  ) {}

  btnText: string = "Compartilhar";

  async createHandler(moment: Moment) {
    const formData = new FormData();

    formData.append("title", moment.title);
    formData.append("description", moment.description);
    if (moment.image) {
      formData.append("image", moment.image);
    }

    this.momentService.createMoment(formData).subscribe({
      next: () => {
        this.messageService.add("Momento adicionado.");
        this.router.navigate(["/"]);
      },
    });
  }
}
