import { Author } from "@shared/author/Author"
import { Category } from "@shared/category/Category"

export interface Book {
    "bookId": number
    "title": string
    "description": string
    "isbn": string
    "publishing_year": number
    "num_of_pages": number
    "count": number
    "authors": Author[]
    "categories": Category[],
    "avgBookRating" : number,
    "bookRatingCount" : number,
    "image" : string
}