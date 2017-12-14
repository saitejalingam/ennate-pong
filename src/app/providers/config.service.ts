import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
    constructor() {}

    public get getAdalConfig(): any {
        return {
            tenant: '5a6794c3-49ae-4a77-83ab-74c59d6569e4',
            clientId: 'cf9aaa21-8dd0-4def-93f4-b6ad2ff67187',
            redirectUri: window.location.origin + '/login-callback',
            postLogoutRedirectUri: window.location.origin + '/login',
            cacheLocation: 'localStorage',
            navigateToLoginRequestUrl: false
        };
    }
} 