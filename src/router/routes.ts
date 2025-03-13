import { RouteNamesEnum } from '@/router/router.types.ts'

type PromiseImportComponent = Promise<typeof import('*.vue')>

const HomePage = (): PromiseImportComponent => import('@/pages/HomePage.vue')

export default [
    {
        path: '/',
        name: RouteNamesEnum.home,
        component: HomePage,
    },
]
