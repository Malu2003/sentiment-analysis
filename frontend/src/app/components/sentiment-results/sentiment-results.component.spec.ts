import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentimentResultsComponent } from './sentiment-results.component';

describe('SentimentResultsComponent', () => {
  let component: SentimentResultsComponent;
  let fixture: ComponentFixture<SentimentResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SentimentResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SentimentResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
