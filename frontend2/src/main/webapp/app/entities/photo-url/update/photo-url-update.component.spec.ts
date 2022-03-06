import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PhotoUrlService } from '../service/photo-url.service';
import { IPhotoUrl, PhotoUrl } from '../photo-url.model';
import { IPet } from 'app/entities/pet/pet.model';
import { PetService } from 'app/entities/pet/service/pet.service';

import { PhotoUrlUpdateComponent } from './photo-url-update.component';

describe('PhotoUrl Management Update Component', () => {
  let comp: PhotoUrlUpdateComponent;
  let fixture: ComponentFixture<PhotoUrlUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let photoUrlService: PhotoUrlService;
  let petService: PetService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PhotoUrlUpdateComponent],
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
      .overrideTemplate(PhotoUrlUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PhotoUrlUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    photoUrlService = TestBed.inject(PhotoUrlService);
    petService = TestBed.inject(PetService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Pet query and add missing value', () => {
      const photoUrl: IPhotoUrl = { id: 456 };
      const pet: IPet = { id: 28991 };
      photoUrl.pet = pet;

      const petCollection: IPet[] = [{ id: 92006 }];
      jest.spyOn(petService, 'query').mockReturnValue(of(new HttpResponse({ body: petCollection })));
      const additionalPets = [pet];
      const expectedCollection: IPet[] = [...additionalPets, ...petCollection];
      jest.spyOn(petService, 'addPetToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ photoUrl });
      comp.ngOnInit();

      expect(petService.query).toHaveBeenCalled();
      expect(petService.addPetToCollectionIfMissing).toHaveBeenCalledWith(petCollection, ...additionalPets);
      expect(comp.petsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const photoUrl: IPhotoUrl = { id: 456 };
      const pet: IPet = { id: 5305 };
      photoUrl.pet = pet;

      activatedRoute.data = of({ photoUrl });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(photoUrl));
      expect(comp.petsSharedCollection).toContain(pet);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<PhotoUrl>>();
      const photoUrl = { id: 123 };
      jest.spyOn(photoUrlService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ photoUrl });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: photoUrl }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(photoUrlService.update).toHaveBeenCalledWith(photoUrl);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<PhotoUrl>>();
      const photoUrl = new PhotoUrl();
      jest.spyOn(photoUrlService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ photoUrl });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: photoUrl }));
      saveSubject.complete();

      // THEN
      expect(photoUrlService.create).toHaveBeenCalledWith(photoUrl);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<PhotoUrl>>();
      const photoUrl = { id: 123 };
      jest.spyOn(photoUrlService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ photoUrl });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(photoUrlService.update).toHaveBeenCalledWith(photoUrl);
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
