import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '@shared/category/Category';
import { CategoryForm } from '@shared/category/CategoryForm';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-category-form',
  templateUrl: './admin-category-form.component.html',
  styleUrls: ['./admin-category-form.component.scss']
})
export class AdminCategoryFormComponent implements OnInit, OnDestroy {

  @Input() category! : Category;

  private resetForm! : Subscription;
  @Input() decideToResetFormEvent! : Observable<Boolean>;

  categoryForm! : FormGroup;
  error : string = "";
  overlay = false;
  isDataLoaded = false;

  @Output() categoryFormEvent = new EventEmitter<CategoryForm>();

  constructor(
    private formBuilder: FormBuilder
  ){
    this.categoryForm = this.formBuilder.group({
      title: ['', 
        [Validators.required, Validators.pattern("^[A-Za-z]( ?[A-Za-z] ?)*$")]
      ],
      description: ['', 
        [Validators.required]
      ]
      });
  }

  get title(){
    return this.categoryForm.get("title");
  }

  get description(){
    return this.categoryForm.get("description");
  }



  get isTitleTouched(){
    return this.title?.invalid && (this.title?.dirty || this.title?.touched);
  }

  get isTitleEmpty(){
    return this.title?.errors?.['required'];
  }

  get isTitleValid(){
    return this.title?.valid;
  }

  get isTitleInvalid(){
    return this.isTitleTouched && !this.isTitleValid;
  }



  get isDescriptionTouched(){
    return this.description?.invalid && (this.description?.dirty || this.description?.touched);
  }

  get isDescriptionEmpty(){
    return this.description?.errors?.['required'];
  }

  get isDescriptionValid(){
    return this.description?.valid;
  }

  get isDescriptionInvalid(){
    return this.isDescriptionTouched && !this.isDescriptionValid;
  }


  

  private setCategoryIfExists(){
    if(this.category != null){
      this.categoryForm.patchValue({
        title : this.category.title,
        description : this.category.description,
      });
    }
  }

  private subscribeToResetForm(){    
    if(this.decideToResetFormEvent != null){            
      this.resetForm = this.decideToResetFormEvent.subscribe({
        next: next => this.categoryForm.reset(),
      });
    }
  }

  ngOnInit(): void {
    this.setCategoryIfExists();
    this.isDataLoaded=true;
    this.subscribeToResetForm();
  }

  onSubmit(): void {
    const categoryData : CategoryForm = this.categoryForm.value;
    this.categoryFormEvent.emit(categoryData);
  }

  ngOnDestroy() {
    if(this.decideToResetFormEvent != null){
      this.resetForm.unsubscribe();
    }
  }
}
