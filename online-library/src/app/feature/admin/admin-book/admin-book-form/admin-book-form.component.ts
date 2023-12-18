import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '@feature/public/book/service/book.service';
import { Book } from '@shared/book/Book';
import { BookForm } from '@shared/book/BookForm';
import { AuthorService } from '@feature/public/author/service/author.service';
import { CategoryService } from '@feature/public/category/service/category.service';
import { Category } from '@shared/category/Category';
import { Author } from '@shared/author/Author';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environment/environment';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-book-form',
  templateUrl: './admin-book-form.component.html',
  styleUrls: ['./admin-book-form.component.scss']
})
export class AdminBookFormComponent implements OnInit, OnDestroy {

  @Input() book! : Book;

  private resetForm! : Subscription;
  @Input() decideToResetFormEvent! : Observable<Boolean>;
  categorySelect2Value! : number[];
  authorSelect2Value! : number[];

  bookForm! : FormGroup;
  error : string = "";
  overlay = false;
  isDataLoaded = false;

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  preview = '';
  
  authorsSelect2 : any = [
    {
      label: 'Autori disponibili',
      options: [],
    },
  ]
  
  categoriesSelect2 : any = [{
      label: 'Categorii disponibile',
      options: [],
    }]
  
    @Output() bookFormEvent = new EventEmitter<FormData>();

    faUpload = faUpload

  constructor(
      private authorService: AuthorService,
      private categoryService: CategoryService,
      private formBuilder: FormBuilder
    ){
    this.bookForm = this.formBuilder.group({
      
      title: ['', 
      [Validators.required]
      ],
      
      isbn: ['', 
      [Validators.required, Validators.pattern("^[0-9]{13}$")]
      ],
      
      description: ['',
        Validators.required
      ],
      
      publishing_year:['',
        [Validators.required, Validators.pattern("^[0-9]{4}$"), Validators.max(new Date().getFullYear())]
      ],
      
      num_of_pages: ['',
        [Validators.required, Validators.pattern("^[0-9]*$")]
      ],
      
      count: ['',
        [Validators.required, Validators.pattern("^[0-9]*$")]
      ],
      
      authors_id: [[],
        [Validators.required]
      ],
      
      categories_id: [[],
        []
      ]
    });
  }

  get title(){
    return this.bookForm.get("title");
  }

  get isbn(){
    return this.bookForm.get("isbn");
  }

  get description(){
    return this.bookForm.get("description");
  }

  get author(){
    return this.bookForm.get("authors_id")
  }

  get publishingYear(){
    return this.bookForm.get("publishing_year");
  }

  get numOfPages(){
    return this.bookForm.get("num_of_pages");
  }

  get count(){
    return this.bookForm.get("count");
  }

  // get categories(){
  //   return this.bookForm.get("categories_id");
  // }



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



  get isIsbnTouched(){
    return this.isbn?.invalid && (this.isbn?.dirty || this.isbn?.touched);
  }

  get isIsbnEmpty(){
    return this.isbn?.errors?.['required'];
  }

  get isIsbnValid(){
    return this.isbn?.valid;
  }

  get isIsbnInvalid(){
    return this.isIsbnTouched && !this.isIsbnValid;
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



  get isAuthorTouched(){
    return this.author?.invalid && (this.author?.dirty || this.author?.touched);
  }

  get isAuthorEmpty(){
    return this.author?.errors?.['required'];
  }

  get isAuthorValid(){
    return this.author?.valid;
  }

  get isAuthorInvalid(){
    return this.isAuthorTouched && !this.isAuthorValid;
  }



  // get areCategoriesTouched(){
  //   return this.categories?.invalid && (this.author?.dirty || this.categories?.touched);
  // }

  // get areCategoriesEmpty(){
  //   return this.categories?.errors?.['required'];
  // }

  // get areCategoriesValid(){
  //   return this.categories?.valid;
  // }

  // get areCategoriesInvalid(){
  //   return this.areCategoriesTouched && !this.areCategoriesValid;
  // }



  get isPublishingYearTouched(){
    return this.publishingYear?.invalid && (this.publishingYear?.dirty || this.publishingYear?.touched);
  }

  get isPublishingYearEmpty(){
    return this.publishingYear?.errors?.['required'];
  }

  get isPublishingYearValid(){
    return this.publishingYear?.valid;
  }

  get isPublishingYearInvalid(){
    return this.isPublishingYearTouched && !this.isPublishingYearValid;
  }



  get isNumOfPagesTouched(){
    return this.numOfPages?.invalid && (this.numOfPages?.dirty || this.numOfPages?.touched);
  }

  get isNumOfPagesEmpty(){
    return this.numOfPages?.errors?.['required'];
  }

  get isNumOfPagesValid(){
    return this.numOfPages?.valid;
  }

  get isNumOfPagesInvalid(){
    return this.isNumOfPagesTouched && !this.isNumOfPagesValid;
  }


  get isCountTouched(){
    return this.count?.invalid && (this.count?.dirty || this.count?.touched);
  }

  get isCountEmpty(){
    return this.count?.errors?.['required'];
  }

  get isCountValid(){
    return this.count?.valid;
  }

  get isCountInvalid(){
    return this.isCountTouched && !this.isCountValid;
  }

  selectFile(event: any): void {
    this.message = '';
    this.preview = '';
    this.progress = 0;
    this.selectedFiles = event.target.files;
    
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      
      if (file) {
        this.preview = '';
        this.currentFile = file;
  
        const reader = new FileReader();
  
        reader.onload = (e: any) => {
          this.preview = e.target.result;          
        };
  
        reader.readAsDataURL(this.currentFile);
      }
    }
  }

  private setupCategoryData(res : ApiResponse<Category[]>){
    const categoryData : Category[] = res.data;  
    if(categoryData.length > 0) {
      categoryData.forEach( (category) => this.categoriesSelect2[0].options.push(
        { 'value' : category.category_id, 'label': category.title }
      ))
    }else {
      this.categoriesSelect2[0].options.push(
        { 'value' : 0, 'label': 'Nu exista nicio categorie disponibila', 'disabled': true }
      )
    }
    if(this.book!=null){
      this.categorySelect2Value = this.book.categories.map( cat => cat.category_id)
    }
  }

  private categoryDataError(err : HttpErrorResponse){
    if(err.status == 0){
      console.log("Nu s a putut conecta la server");
    }
  }

  private fetchCategories(){
    this.categoryService.getCategories().subscribe({
      next: res => this.setupCategoryData(res),
      error: err => this.categoryDataError(err)
    });
  }

  private setupAuthorsData(res : ApiResponse<Author[]>){
    const authorsData : Author[] = res.data;
    if(authorsData.length > 0){
      authorsData.forEach( (author) =>  this.authorsSelect2[0].options.push(
        { 'value' : author.authorId, 'label': `${author.first_name+" "+author.last_name}`}
      ));
    }else{
      this.authorsSelect2[0].options.push(
        { 'value' : 0, 'label': 'Nu exista niciun autor disponibil', 'disabled': true }
      );
    }
    if(this.book!=null){
      this.authorSelect2Value = this.book.authors?.map(author => author.authorId);
    }
  }
  
  private authorsDataError(err : HttpErrorResponse){
    if(err.status == 0){
      console.log("Nu s a putut conecta la server");
    }
  }

  private fetchAuthors(){
    this.authorService.getAllAuthors().subscribe({
      next: res => this.setupAuthorsData(res),
      error: err => this.authorsDataError(err)
    });
  }

  private setBookIfExists(){
    if(this.book != null){
      this.bookForm.patchValue({
        title : this.book.title,
        isbn : this.book.isbn,
        description : this.book.description,
        publishing_year : this.book.publishing_year,
        num_of_pages : this.book.num_of_pages,
        count : this.book.count
      });
      if(this.book?.image != null && this.book.image.length > 0){
        this.preview = environment.baseUrl + this.book.image;
      }
    }
  }

  private subscribeToResetForm(){    
    if(this.decideToResetFormEvent != null){            
      this.resetForm = this.decideToResetFormEvent.subscribe({
        next: next => this.bookForm.reset(),
      });
    }
  }

  ngOnInit(): void {
    this.fetchCategories();
    this.fetchAuthors();
    this.setBookIfExists();
    this.isDataLoaded=true;
    this.subscribeToResetForm();
  }

  onSubmit(): void {
    let bookData : BookForm = this.bookForm.value;
    const payload = new FormData();
    payload.append("bookData", JSON.stringify(bookData))
    if(this.currentFile){
      payload.append("image", this.currentFile, this.currentFile.name);
    }    
    this.bookFormEvent.emit(payload);
  }

  ngOnDestroy() {
    if(this.decideToResetFormEvent != null){
      this.resetForm.unsubscribe();
    }
  }
}
