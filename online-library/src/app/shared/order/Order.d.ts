import { Book } from "@shared/book/Book";
import { User } from "@shared/user/User";

export interface Order {
    orderId: number,
    user : User,
    status : number,
    lendedAt : string,
    createdAt : string,
    returnedAt : string,
    returnDate : string,
    withDelivery: boolean
    books : Book[]
}