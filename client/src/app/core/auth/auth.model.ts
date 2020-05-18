export interface AuthModel {
    readonly isLoggedIn: boolean;
    readonly showLoading: boolean;
    readonly id: string;
    readonly needsLogin: boolean;
}

export interface AuthLoginCheckResponse {
    loggedIn: boolean;
    idmId: string;
}
