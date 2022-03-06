import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { TagService } from '../service/tag.service';
import { ITag, Tag } from '../tag.model';
import { IPet } from 'app/entities/pet/pet.model';
import { PetService } from 'app/entities/pet/service/pet.service';

import { TagUpdateComponent } from './tag-update.component';

describe('Tag Management Update Component', () => {
  let comp: TagUpdateComponent;
  let fixture: ComponentFixture<TagUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let tagService: TagService;
  let petService: PetService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [TagUpdateComponent],
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
      .overrideTemplate(TagUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TagUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    tagService = TestBed.inject(TagService);
    petService = TestBed.inject(PetService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Pet query and add missing value', () => {
      const tag: ITag = { id: 456 };
      const pet: IPet = { id: 62942 };
      tag.pet = pet;

      const petCollection: IPet[] = [{ id: 19339 }];
      jest.spyOn(petService, 'query').mockReturnValue(of(new HttpResponse({ body: petCollection })));
      const additionalPets = [pet];
      const expectedCollection: IPet[] = [...additionalPets, ...petCollection];
      jest.spyOn(petService, 'addPetToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ tag });
      comp.ngOnInit();

      expect(petService.query).toHaveBeenCalled();
      expect(petService.addPetToCollectionIfMissing).toHaveBeenCalledWith(petCollection, ...additionalPets);
      expect(comp.petsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const tag: ITag = { id: 456 };
      const pet: IPet = { id: 2611 };
      tag.pet = pet;

      activatedRoute.data = of({ tag });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(tag));
      expect(comp.petsSharedCollection).toContain(pet);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Tag>>();
      const tag = { id: 123 };
      jest.spyOn(tagService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tag });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tag }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(tagService.update).toHaveBeenCalledWith(tag);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Tag>>();
      const tag = new Tag();
      jest.spyOn(tagService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tag });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tag }));
      saveSubject.complete();

      // THEN
      expect(tagService.create).toHaveBeenCalledWith(tag);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Tag>>();
      const tag = { id: 123 };
      jest.spyOn(tagService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tag });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(tagService.update).toHaveBeenCalledWith(tag);
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
