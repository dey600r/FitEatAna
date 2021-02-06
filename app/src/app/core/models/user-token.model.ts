export class UserTokenModel {
    codeAuthorization: string;
    codeVerifier: string;
    token: string;
    refreshToken: string;
    tokenType: string;
    userId: string;
    private authorizationDateExpiration: Date = new Date();
    private autenticationDateExpiration: Date = new Date();
    constructor(auth: string, verf: string, seconds: number) {
        this.mapBase(auth, verf);
        this.setAuthorizationDateExpiration(seconds);
    }

    isAuthorizated(): boolean {
        return !!this.codeAuthorization && new Date() < new Date(this.authorizationDateExpiration);
    }

    isAuthenticated(): boolean {
        return !!this.token && new Date() < new Date(this.autenticationDateExpiration);
    }

    setToken(token: string, expireSeconds: number, refresh: string, type: string, id: string) {
        this.mapBaseToken(token, refresh, type, id);
        this.setAutenticationDateExpiration(expireSeconds);
    }

    setInfo(data: UserTokenModel) {
        if (data) {
            this.mapBase(data.codeAuthorization, data.codeVerifier);
            this.mapBaseToken(data.token, data.refreshToken, data.tokenType, data.userId);
            this.mapBaseDateExpiration(data.authorizationDateExpiration, data.autenticationDateExpiration);
        }
    }

    setAuthorizationDateExpiration(seconds: number): void {
        this.authorizationDateExpiration = new Date();
        this.authorizationDateExpiration.setSeconds(this.authorizationDateExpiration.getSeconds() + seconds);
    }

    setAutenticationDateExpiration(seconds: number): void {
        this.autenticationDateExpiration = new Date();
        this.autenticationDateExpiration.setSeconds(this.autenticationDateExpiration.getSeconds() + seconds);
    }

    private mapBase(auth: string, verf: string) {
        this.codeAuthorization = auth;
        this.codeVerifier = verf;
    }

    private mapBaseToken(token: string, refresh: string, type: string, id: string) {
        this.token = token;
        this.refreshToken = refresh;
        this.tokenType = type;
        this.userId = id;
    }

    private mapBaseDateExpiration(authDate: Date, autenDate: Date) {
        this.authorizationDateExpiration = new Date(authDate);
        this.autenticationDateExpiration = new Date(autenDate);
    }
}
