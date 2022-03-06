import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { StoreOrderDetailComponent } from './store-order-detail.component';

describe('StoreOrder Management Detail Component', () => {
  let comp: StoreOrderDetailComponent;
  let fixture: ComponentFixture<StoreOrderDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoreOrderDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ storeOrder: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(StoreOrderDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(StoreOrderDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load storeOrder on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.storeOrder).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
