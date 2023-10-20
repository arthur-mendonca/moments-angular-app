import { Component, OnInit } from "@angular/core";
import { faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";
import { MomentService } from "src/app/services/moment.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Moment } from "src/app/Moments";
import { environments } from "src/environments/environments";
import { MessagesService } from "src/app/services/messages.service";
import { Comment } from "src/app/Comment";
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
} from "@angular/forms";
import { CommentService } from "src/app/services/comment.service";

@Component({
  selector: "app-moment",
  templateUrl: "./moment.component.html",
  styleUrls: ["./moment.component.css"],
})
export class MomentComponent implements OnInit {
  moment?: Moment;
  baseApiUrl = environments.baseApiUrl;
  faEdit = faEdit;
  faTimes = faTimes;

  commentForm!: FormGroup;

  constructor(
    private momentService: MomentService,
    private router: Router,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private commentService: CommentService
  ) {}

  get text() {
    return this.commentForm.get("text")!;
  }
  get username() {
    return this.commentForm.get("username")!;
  }

  async onSubmit(formDirective: FormGroupDirective) {
    if (this.commentForm.invalid) {
      return;
    }

    const data: Comment = this.commentForm.value;
    data.momentId = Number(this.moment!.id);

    this.commentService.createComment(data).subscribe((comment) => {
      console.log(comment);
      if (this.moment && comment && comment.data) {
        if (!this.moment.comments) {
          this.moment.comments = [];
        }
        this.moment!.comments!.push(comment.data);
      }

      this.messagesService.add("Comentário adicionado.");
    }),
      this.commentForm.reset();
    formDirective.resetForm();
  }

  async removeHandler(id: number) {
    this.momentService.removeMoment(id).subscribe();
    this.messagesService.add("Momento excluído.");
    this.router.navigate(["/"]);
  }

  get commentCount(): number {
    return this.moment?.comments?.length || 0;
  }

  ngOnInit(): void {
    const id: number = Number(this.route.snapshot.paramMap.get("id"));

    this.momentService
      .getMoment(id)
      .subscribe((item) => (this.moment = item.data));

    this.commentForm = new FormGroup({
      text: new FormControl("", [Validators.required]),
      username: new FormControl("", [Validators.required]),
    });
  }
}
