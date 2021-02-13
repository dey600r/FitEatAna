import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FoodLogsPage } from './food-logs.page';

describe('FoodLogsPage', () => {
  let component: FoodLogsPage;
  let fixture: ComponentFixture<FoodLogsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodLogsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FoodLogsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
