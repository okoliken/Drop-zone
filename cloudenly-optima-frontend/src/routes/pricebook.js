

const Pricebook = () => import("../views/apps/Pricebook/pricebook.vue");


export default [

      {
        path: '/catalogue/pricebook',
        name: 'Pricebook',
        component: Pricebook,
        meta: {
            requiresAuth : true,
            breadcrumb: [
                {
                    title: 'Dashboard',
                    url: '/'
                },
                {
                    title: 'Pricebook'
                },
                {
                    title: 'Pricebook List',
                    active: true
                },
            ],
            pageTitle: 'Pricebook List'
        },
        
    },
    
]