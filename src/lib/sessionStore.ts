const sessionStore = new Map();

export function createSession(userId : string, accessToken: string) {
    const sessionId = crypto.randomUUID();
    sessionStore.set(sessionId, { userId, accessToken });
    return sessionId;
}

export function setSession(key : string, value: any) {
    sessionStore.set(key, value);
}

export function getSession(key: string) {
    return sessionStore.get(key);
}

export function clearSession(key: string) {
    sessionStore.delete(key);
}
