import { defineStore } from 'pinia';

export const useUser = defineStore('userStore', {
    state: () => ({
        user: null,
        token: null,
        expiresAt: null,
    }),

    getters: {
        getUser() {
            return this.user;
        },
        isAuthenticated() {
            const now = new Date();

            return (
                this.user !== null &&
                this.token !== null &&
                this.expiresAt !== null &&
                (this.expiresAt && now.getTime() <= new Date(this.expiresAt).getTime())
            );
        }
    },
    actions: {
        setToken(token) {
            console.log(token);
            this.token = token;
        },
        setUser(user) {
            console.log(user);
            this.user = user;
        },
        setTokenExpiration(expiresAt) {
            const date = new Date(expiresAt);
            this.expiresAt = date;
        }
    },
    persist: true
});