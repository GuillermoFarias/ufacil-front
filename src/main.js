import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import themeLoader from './theme';
import { createRouter, createWebHashHistory } from 'vue-router';
import IndexVue from './pages/Index.vue';
import LoginVue from './pages/Login.vue';
import { authGuard } from './guards/authGuard'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'dashboard',
            component: IndexVue,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/login',
            name: 'login',
            component: LoginVue
        },
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        authGuard(to, from, next);
    } else {
        next();
    }
});

const app = createApp(App)
themeLoader(app);

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router);

app.mount('#app')
