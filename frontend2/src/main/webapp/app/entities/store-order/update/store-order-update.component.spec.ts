import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { StoreOrderService } from '../service/store-order.service';
import { IStoreOrder, StoreOrder } from '../store-order.model';
import { IPet } from 'app/entities/pet/pet.model';
import { PetService } from 'app/entities/pet/service/pet.service';

import { StoreOrderUpdateComponent } from './store-order-update.component';

describe('StoreOrder Management Update Component', () => {
  let comp: StoreOrderUpdateComponent;
  let fixture: ComponentFixture<StoreOrderUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let storeOrderService: StoreOrderService;
  let petService: PetService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [StoreOrderUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(StoreOrderUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(StoreOrderUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    storeOrderService = TestBed.inject(StoreOrderService);
    petService = TestBed.inject(PetService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Pet query and add missing value', () => {
      const storeOrder: IStoreOrder = { id: 456 };
      const petId: IPet = { id: 81646 };
      storeOrder.petId = petId;

      const petCollection: IPet[] = [{ id: 37001 }];
      jest.spyOn(petService, 'query').mockReturnValue(of(new HttpResponse({ body: petCollection })));
      const additionalPets = [petId];
      const expectedCollection: IPet[] = [...additionalPets, ...petCollection];
      jest.spyOn(petService, 'addPetToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ storeOrder });
      comp.ngOnInit();

      expect(petService.query).toHaveBeenCalled();
      expect(petService.addPetToCollectionIfMissing).toHaveBeenCalledWith(petCollection, ...additionalPets);
      expect(comp.petsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const storeOrder: IStoreOrder = { id: 456 };
      const petId: IPet = { id: 62763 };
      storeOrder.petId = petId;

      activatedRoute.data = of({ storeOrder });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(storeOrder));
      expect(comp.petsSharedCollection).toContain(petId);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<StoreOrder>>();
      const storeOrder = { id: 123 };
      jest.spyOn(storeOrderService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ storeOrder });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: storeOrder }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(storeOrderService.update).toHaveBeenCalledWith(storeOrder);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<StoreOrder>>();
      const storeOrder = new StoreOrder();
      jest.spyOn(storeOrderService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ storeOrder });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: storeOrder }));
      saveSubject.complete();

      // THEN
      expect(storeOrderService.create).toHaveBeenCalledWith(storeOrder);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<StoreOrder>>();
      const storeOrder = { id: 123 };
      jest.spyOn(storeOrderService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ storeOrder });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(storeOrderService.update).toHaveBeenCalledWith(storeOrder);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackPetById', () => {
      it('Should return tracked Pet primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackPetById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
