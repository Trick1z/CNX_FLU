import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import Swal from 'sweetalert2';
import { DxDataGridModule } from 'devextreme-angular';

@Component({
  selector: 'app-word-score',
  imports: [NgIf, NgFor, FormsModule, DatePipe, DxDataGridModule],
  standalone: true,
  templateUrl: './word-score.component.html',
  // styleUrl: './word-score.component.scss',

  styleUrls: ['./word-score.component.scss'], // <-- แก้ตรงนี้
})
export class WordScoreComponent implements OnInit {
  ngOnInit(): void {
    this.getData();
    this.getUser();
    this.getTopFive();
    this.getMyHistory();
  }
  columns = ['CompanyName', 'City', 'State', 'Phone', 'Fax'];
  temp = [
    {
      ID: 1,
      CompanyName: 'ABC',
      City: 'Bangkok',
      State: '',
      Phone: '',
      Fax: '',
    },
    {
      ID: 2,
      CompanyName: 'XYZ',
      City: 'Chiang Mai',
      State: '',
      Phone: '',
      Fax: '',
    },
  ];

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
  // logic here
  games(word: string) {
    if (this.IsVip) {
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
      let vowelGroupCount = 0;

      for (let i = 0; i < upperWord.length; i++) {
        const ch = upperWord[i] as keyof typeof vowel;
        const isVowel = vowel[ch] !== undefined;

        if (isVowel) {
          ScoreVowelGroup += vowel[ch];
          vowelGroupCount++;
          inVowelGroupState = true;
        } else {
          // เจอพยัญชนะ => บวกคะแนนกลุ่มสระก่อนหน้า
          if (inVowelGroupState) {
            if (vowelGroupCount > 1) {
              if (Math.random() < 0.1) {
                console.log('(VIP) Lucky! Bonus x2 applied 🎉');
                total += ScoreVowelGroup * 2;
              } else {
                total += ScoreVowelGroup;
              }
            } else {
              total += ScoreVowelGroup;
            }
            // รีเซ็ตกลุ่มสระ
            ScoreVowelGroup = 0;
            vowelGroupCount = 0;
            inVowelGroupState = false;
          }

          total += 1; // คะแนนพยัญชนะ
        }
      }

      // จัดการกรณีคำลงท้ายด้วยสระ (หลังจบลูป)
      if (inVowelGroupState) {
        if (vowelGroupCount > 1) {
          if (Math.random() < 0.1) {
            console.log('(VIP) Lucky! Bonus x2 applied at end 🎉');
            total += ScoreVowelGroup * 2;
          } else {
            total += ScoreVowelGroup;
          }
        } else {
          total += ScoreVowelGroup;
        }
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

      return { word: new_str, score: total };
    } else {
      // normal user
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
      let vowelGroupCount = 0;

      for (let i = 0; i < upperWord.length; i++) {
        const ch = upperWord[i] as keyof typeof vowel;
        const isVowel = vowel[ch] !== undefined;

        if (isVowel) {
          ScoreVowelGroup += vowel[ch];
          vowelGroupCount++;
          inVowelGroupState = true;
        } else {
          // เจอพยัญชนะ => บวกคะแนนกลุ่มสระก่อนหน้า
          if (inVowelGroupState) {
            if (vowelGroupCount > 1) {
              if (Math.random() < 0.05) {
                console.log('Lucky! Bonus x2 applied 🎉');
                total += ScoreVowelGroup * 2;
              } else {
                total += ScoreVowelGroup;
              }
            } else {
              total += ScoreVowelGroup;
            }
            // รีเซ็ตกลุ่มสระ
            ScoreVowelGroup = 0;
            vowelGroupCount = 0;
            inVowelGroupState = false;
          }

          total += 1; // คะแนนพยัญชนะ
        }
      }

      // จัดการกรณีคำลงท้ายด้วยสระ (หลังจบลูป)
      if (inVowelGroupState) {
        if (vowelGroupCount > 1) {
          if (Math.random() < 0.05) {
            console.log('Lucky! Bonus x2 applied at end 🎉');
            total += ScoreVowelGroup * 2;
          } else {
            total += ScoreVowelGroup;
          }
        } else {
          total += ScoreVowelGroup;
        }
      }

      var new_str = '';

      for (let _str = 0; _str < word.length; _str++) {
        if (word[_str].toUpperCase() in vowel) {
          new_str += word[_str].toUpperCase();
        } else {
          new_str += word[_str].toLowerCase();
        }
      }

      return { word: new_str, score: total };
    }
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
        var res = this.games(word);

        Swal.fire({
          title: 'สำเร็จ',
          text: 'เพิ่มคำสำเร็จ',
          icon: 'success',
        });

        return this.SubmitWord({
          word: res.word,
          score: res.score,
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

    this.getWord = null;

    this.api.post(`data/userdata/wordAdding/${id}`, newData).subscribe({
      next: (res: any) => {
        return this.getData();
      },
      error: (err) => {
        // this.getData();

        if (err.status === 409) {
          return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'ไม่สามารถใช้คำซ้ำได้',
          });
        } else {
          return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something when wrong !',
          });
        }
      },
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

  // edit

  editWord: string | null = null;
  editId: number | null = null;

  EditPopup(word: string, id: number) {
    this.editWord = word;
    this.editId = id;
  }

  submitEdit() {
    if (!this.editWord) {
      return Swal.fire({
        title: 'ไม่มีคำ',
        text: 'กรุณาใส่คำที่ต้องการ',
        icon: 'question',
      });
    }

    var id = this.editId;
    var word = this.editWord;

    var data = this.games(word!);
    this.api.put(`data/userdata/wordEditing/${id}`, data).subscribe({
      next: (res: any) => {
        this.getData();

        return Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'แก้ไขคำสำเร็จ',
          showConfirmButton: false,
          timer: 1500,
        });
      },
      error: (err) => {
        this.getData();

        return Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      },
    });

    return;
  }

  // history
  topFivePlayer: TopFive[] = [];
  getTopFive() {
    this.api.get('api/history/top-players').subscribe((res: any) => {
      console.log(res);
      this.topFivePlayer = res;
    });
  }

  myHistory: History[] = [];
  getMyHistory() {
    var data = sessionStorage.getItem('user')!;
    var id = JSON.parse(data).user.userId;

    this.api.get(`api/history/playerHistory/${id}`).subscribe((res: any) => {
      this.myHistory = res;
      console.log(res);
    });
  }
}

interface TopFive {
  username: string;
  score: number;
  isVip: boolean;
}
interface History {
  word: string;
  score: number;
  updateTime: Date;
}

interface WordScore {
  wordId: number;
  word: string;
  score: number;
  date: Date;
}

interface InsertWordScore {
  word: string;
  score: number;
}
