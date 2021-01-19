import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '@modules/components.module';

import { TargetPage } from './target.page';

describe('TargetPage', () => {
  let component: TargetPage;
  let fixture: ComponentFixture<TargetPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TargetPage],
      imports: [IonicModule.forRoot(), ComponentsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TargetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
