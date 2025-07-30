import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordScoreComponent } from './word-score.component';

describe('WordScoreComponent', () => {
  let component: WordScoreComponent;
  let fixture: ComponentFixture<WordScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordScoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
