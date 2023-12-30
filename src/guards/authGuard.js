import { useUser } from '@/stores/user';

export const authGuard = async (to, from, next) => {
    const userStore = useUser();

    // Check if the user is authenticated
    if (userStore.isAuthenticated) {
        next();
    } else {
        next('/login');
    }
};