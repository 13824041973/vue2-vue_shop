export const routes = [{
        name: "login",
        path: "/login",
        component: () =>
            import ("@/views/login/loginName.vue"),
    },
    {
        name: "home",
        path: "/",
        alias: "/home",
        component: () =>
            import ("@/views/home/homeName.vue")
    },
    {
        name: "user",
        path: "/user",
        // alias: '/user',
        component: () =>
            import ("@/views/user/userName.vue"),
    },
    {
        name: "list",
        path: "/list",
        props: (route) => {
            return {
                idx: route.query.idx
            };
        },
        component: () =>
            import ("@/views/list/listName.vue")
    },
    {
        name: "details",
        path: "/details",
        props: (route) => {
            return {
                id: route.query.id
            };
        },
        component: () =>
            import ("@/views/details/detailsName.vue"),
    },
    {
        name: "shopcar",
        path: "/shopcar",
        component: () =>
            import ("@/views/shopcar/shopcarName.vue")
    },
]