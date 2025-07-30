import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-word-score',
  imports: [NgIf, NgFor, FormsModule, DatePipe],
  standalone: true,
  templateUrl: './word-score.component.html',
  styleUrl: './word-score.component.scss',
})
export class WordScoreComponent implements OnInit {
  ngOnInit(): void {
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

  words: WordScore[] = [];

  getWord: string | null = null;

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

    this.api.get(`data/userdata/${id}`).subscribe((res: any) => {
      // console.log(res);

      this.words = res;
      this.total_score = this.sum_sc();
    });
  }

  logicGame(word: string) {
    if (word == null) {
      Swal.fire({
        title: 'กรุณาใส่คำ',
        text: 'ใส่คำที่ต้องการ',
        icon: 'question',
      });

      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: `ต้องการเพิ่ม ${word} ใช่หรือไม่ ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่',
      cancelButtonText: 'ไม่',
    }).then((result) => {
      if (result.isConfirmed) {
        const vowel = {
          A: 2,
          E: 3,
          I: 4,
          O: 5,
          U: 6,
        };

        const upperWord = word.toUpperCase();
        let total = 0;

        let ScoreVowelGroup = 0;
        let inVowelGroupState = false;

        for (let i = 0; i < upperWord.length; i++) {
          const ch = word[i].toUpperCase() as keyof typeof vowel;
          const isVowel = vowel[ch] !== undefined;

          if (isVowel) {
            ScoreVowelGroup += vowel[ch];
            inVowelGroupState = true;
          } else {
            if (inVowelGroupState) {
              total += ScoreVowelGroup * 2;
              ScoreVowelGroup = 0;
              inVowelGroupState = false;
            }
            total += 1;
          }
        }

        if (inVowelGroupState) {
          total += ScoreVowelGroup * 2;
        }

        //
        var new_str = '';

        for (let _str = 0; _str < word.length; _str++) {
          if (word[_str].toUpperCase() in vowel) {
            new_str += word[_str].toUpperCase();
          } else {
            new_str += word[_str].toLowerCase();
          }
        }
        Swal.fire({
          title: 'สำเร็จ',
          text: 'เพิ่มคำสำเร็จ',
          icon: 'success',
        });

        return this.SubmitWord({
          word: new_str,
          score: total,
        });
      }

      return;
    });
  }

  // add word
  SubmitWord(data: InsertWordScore) {
    var userData = sessionStorage.getItem('user')!;

    var id = JSON.parse(userData).user.userId;

    var newData = {
      word: data.word,
      score: data.score,
    };

    this.api
      .post(`data/userdata/wordAdding/${id}`, newData)
      .subscribe((res: any) => {
        return this.getData();
      });
  }

  deleteWord(data: InsertWordScore) {
    var userData = sessionStorage.getItem('user')!;
    var id = JSON.parse(userData).user.userId;

    var newData = {
      word: data.word,
      score: data.score,
    };

    Swal.fire({
      title: `ต้องการลบคำนี้ใช่หรือไม่`,
      showDenyButton: true,
      confirmButtonText: 'ใช่',
      denyButtonText: `ไม่`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.api
          .delete(`data/userdata/DeleteWordAdding/${id}`, newData)
          .subscribe(() => {

            this.getData();
            return Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'ลบสำเร็จ',
              showConfirmButton: false,
              timer: 1500,
            });
          });

      }
      return;
    });
  }
}

interface WordScore {
  word: string;
  score: number;
  date: Date;
}

interface InsertWordScore {
  word: string;
  score: number;
}
