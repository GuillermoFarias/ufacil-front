import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import themeLoader from './theme';
import { createRouter, createWebHashHistory } from 'vue-router';
import IndexVue from './pages/Index.vue';
import LoginVue from './pages/Login.vue';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: IndexVue
        },
        {
            path: '/login',
            name: 'Login',
            component: LoginVue
        },
    ]
});

const app = createApp(App)

app.use(createPinia())
themeLoader(app);
app.use(router);
app.mount('#app')
