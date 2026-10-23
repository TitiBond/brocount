import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SideMenuButton } from './side-menu-button';

describe('SideMenuButton', () => {
  let component: SideMenuButton;
  let fixture: ComponentFixture<SideMenuButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideMenuButton],
    }).compileComponents();

    fixture = TestBed.createComponent(SideMenuButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
