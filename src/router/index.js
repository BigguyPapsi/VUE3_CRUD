import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../components/Login.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { requiresAuth: true }, 
  },
    {
    path: '/currency',
    name: 'Currency',
    component: () => import('../views/Currency.vue'),
    meta: { requiresAuth: true }, 
  },
  {
    path: '/currency/crerte',
    name: 'Create',
    component: () => import('../components/Create.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/currency/edit/:id',
    name: 'Edit',
    component: () => import('../components/Edit.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/:catchAll(.*)',
    component: () => import('../components/Notfound.vue'), 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (to.matched.some((record) => record.meta.requiresAuth) && !token) {
    next('/');
  } else {
    next();
  }
});






export default router;
