import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environments } from "src/environments/environments";
import { Comment } from "../Comment";
import { Response } from "../Response";

@Injectable({
  providedIn: "root",
})
export class CommentService {
  private baseUrl = environments.baseApiUrl;
  private apiUrl = `${this.baseUrl}api/moments`;

  createComment(data: Comment): Observable<Response<Comment>> {
    const url = `${this.apiUrl}/${data.momentId}/comments`;
    console.log(data);

    return this.http.post<Response<Comment>>(url, data);
  }

  constructor(private http: HttpClient) {}
}
