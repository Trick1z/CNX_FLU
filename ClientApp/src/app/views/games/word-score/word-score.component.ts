import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-word-score',
  imports: [NgIf, NgFor, FormsModule],
  standalone: true,
  templateUrl: './word-score.component.html',
  styleUrl: './word-score.component.scss',
})
export class WordScoreComponent implements OnInit {
  ngOnInit(): void {
    this.total_score = this.sum_sc();
  }

  constructor(private route: Router) {}

  GameStart: boolean = false;
  IsVip: boolean = true;

  startAndStopGame() {
    this.GameStart = !this.GameStart;
  }

  // valuables

  words: WordScore[] = [
    { word: 'left1', score: 21 },
    { word: 'lefttt2', score: 22 },
    { word: 'leftttt3', score: 23 },
    { word: 'lefttttttt4', score: 24 },
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

  //setvip
  setVIP() {
    this.IsVip = !this.IsVip;
  }


}

interface WordScore {
  word: string;
  score: number;
}
