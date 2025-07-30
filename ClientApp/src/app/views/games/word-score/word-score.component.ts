import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-word-score',
  imports: [NgIf, NgFor, FormsModule,DatePipe],
  standalone: true,
  templateUrl: './word-score.component.html',
  styleUrl: './word-score.component.scss',
})
export class WordScoreComponent implements OnInit {
  ngOnInit(): void {
    this.total_score = this.sum_sc();
    this.getData();
    this.getUser();
  }

  constructor(private route: Router, private api: ApiService) {}

  GameStart: boolean = false;
  IsVip!: boolean;

  startAndStopGame() {
    this.GameStart = !this.GameStart;
  }

  // valuables

  words: WordScore[] = [
  ];

  getWord: string | null = null;

  // word : Array<string>  = []

  total_score: number = 0;

  // sum total score
  sum_sc(index: number = this.words.length): number {
    if (index == 0) {
      return 0;
    }

    return this.words[index - 1].score + this.sum_sc(index - 1);
  }

  star(length: number) {
    return '*'.repeat(length);
  }

  //get user

  getUser() {
    var userData = sessionStorage.getItem('user')!;
    var _userData = JSON.parse(userData).user;
    this.IsVip = _userData.isVip;
  }

  getData() {
    var data = sessionStorage.getItem('user')!;
    var id = JSON.parse(data).user.userId;

    this.api.get(`data/userdata/${id}`).subscribe((res : any ) => {
      console.log(res);

      this.words = res

    })
  }
}

interface WordScore {
  word: string;
  score: number;
  date : Date
}
