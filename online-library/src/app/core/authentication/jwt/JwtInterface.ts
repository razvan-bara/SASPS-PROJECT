export interface JwtInterface {
    exp : number,
    iat : number,
    id : number,
    iss : string,
    sub : string,
    isAdmin : boolean
}