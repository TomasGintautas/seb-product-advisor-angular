import { NgModule, Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Answer } from '../core/models/answer.model';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent {

  answer: Answer;
  answerForm: FormGroup;
  recommendedProducts: String[] = [];

  constructor(private http: HttpClient,
              private fb: FormBuilder) {

    this.answer = new Answer();
    this.answerForm = this.fb.group({
      'ageRange': ['', Validators.required],
      'incomeRange': ['', Validators.required],
      'isStudent': ['', Validators.required]
    });
  }

  onSubmitSend() {
    const headers = {
      'Content-Type': 'application/json'
    };
  
    this.answerForm.setValue({
      ageRange: this.answer.ageRange,
      incomeRange: this.answer.incomeRange,
      isStudent: this.answer.isStudent
    });
  
    this.http.post('http://localhost:8080/v1/suggestProducts', JSON.stringify(this.answerForm.value), {headers})
      .subscribe((response: any) => {
        this.recommendedProducts = response;
      });
  }
}
