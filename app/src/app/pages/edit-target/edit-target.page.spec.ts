import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditTargetPage } from './edit-target.page';

describe('EditTargetPage', () => {
  let component: EditTargetPage;
  let fixture: ComponentFixture<EditTargetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTargetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditTargetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
