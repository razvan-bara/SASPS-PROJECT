import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { BearerInterceptor } from "./bearer.interceptor";

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: BearerInterceptor, multi: true },
  ];