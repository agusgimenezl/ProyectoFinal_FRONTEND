import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviromentTsnComponent } from './enviroment.tsn.component';

describe('EnviromentTsnComponent', () => {
  let component: EnviromentTsnComponent;
  let fixture: ComponentFixture<EnviromentTsnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnviromentTsnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnviromentTsnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
