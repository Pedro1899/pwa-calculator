import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnityConverterComponent } from './unity-converter.component';

describe('UnityConverterComponent', () => {
  let component: UnityConverterComponent;
  let fixture: ComponentFixture<UnityConverterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnityConverterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnityConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
