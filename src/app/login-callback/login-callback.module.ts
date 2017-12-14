import { OAuthCallbackHandler } from './authcallback-guard.service';
import { LoginCallbackComponent } from './login-callback.component';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [],
    declarations: [LoginCallbackComponent],
    providers: [OAuthCallbackHandler]
})
export class LoginCallbackModule { } 