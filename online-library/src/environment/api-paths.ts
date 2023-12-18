export enum ApiPrefix {
    PUBLIC = '/v1',
    SECURED = '/v2',
    REQUIRE_AUTH = '/v3',
    AUTH = '/auth'
 }

 export enum ApiPaths {
    BOOKS = '/books',
    BOOKS_FILTER = '/filteredBooks',
    AUTHORS = '/authors',
    AUTHORS_FIlTERED = '/filteredAuthors',
    All_AUTHORS = '/allAuthors',
    CATEGORIES = '/categories',
    CATEGORIES_FIlTERED = '/filteredCategories',
    ORDERS = '/orders',
    ORDERS_FILTERED = '/filteredOrders',
    USER_ORDERS = '/user/orders',
    USER_ADDRESS = '/user/address',
    CHECKOUT = '/checkout',
    CHECKOUT_PAYMENT = '/checkoutPayment',
    CONFIRM_CHECKOUT_PAYMENT = '/confirmCheckoutPayment',
    RATE_BOOK = '/bookRating',
    USERS = '/users',
    USERS_FIlTERED = '/filteredUsers'
 }