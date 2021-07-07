import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '系统主页', icon: 'dashboard' }
    }]
  },
  {
    path: '/storage',
    name:'Database Storage',
    meta: { title: '数据存储', icon: 'el-icon-s-help' },
    component: Layout,
    children: [
      {
        path: 'compress',
        name: 'data compress',
        component: () => import('@/views/storage/compress/index'),
        meta: { title: '数据压缩', icon: 'table' },
        children: [
          {
            path: 'common',
            name: 'Common',
            component: () => import('@/views/storage/compress/common/index'),
            meta: { title: '压缩技术'},
            children:[
                  {
                    path:'uploadData',
                    hidden: true,
                    component:()=>import('@/views/storage/compress/common/uploadData'),
                    meta: { keepAlive: true }
                  },
                  {
                    path:'analysisRes',
                    hidden: true,
                    component:()=>import('@/views/storage/compress/common/analysisRes'),
                    meta: { keepAlive: true }
                  }
                ]
          },
          {
            path: 'fliter',
            name: 'Fliter',
            component: () => import('@/views/storage/compress/filter/index'),
            meta: { title: '过滤器'}
          }
        ]
      },
      {
        path: 'partition',
        name: 'data partition',
        component: () => import('@/views/storage/partition'),
        
        meta: { title: '数据分区', icon: 'tree' },
        children:[
          {
            path: 'horizonal',
            component: () => import('@/views/storage/partition/horizonal/index'),
            name: 'Horizonal',
            meta: { title: '水平分区' },
            children:[
              {
                path:'getData',
                hidden: true,
                component:()=>import('@/views/storage/partition/horizonal/getData'),
                meta: { keepAlive: true }
              },
              {
                path:'showPartitions',
                hidden: true,
                component:()=>import('@/views/storage/partition/horizonal/showPartitions'),
                meta: { keepAlive: true }
              },
              {
                path:'showResult',
                hidden: true,
                component:()=>import('@/views/storage/partition/horizonal/showResult'),
                meta: { keepAlive: true }
              }
            ]
          },
          {
            path: 'vertical',
            component: () => import('@/views/storage/partition/vertical'),
            name: 'Vertical',
            // redirect: '/vertical/importData',
            meta: { title: '垂直分区' },
            children:[
              {
                path:'importData',
                name:'ImportData',
                hidden: true,
                component:()=>import('@/views/storage/partition/vertical/importData'),
                meta: { keepAlive: true }
              },
              {
                path:'importWorkload',
                hidden: true,
                component:()=>import('@/views/storage/partition/vertical/importWorkload'),
                meta: { keepAlive: true }
              },
              {
                path:'selectMethod',
                hidden: true,
                component:()=>import('@/views/storage/partition/vertical/selectMethod'),
                meta: { keepAlive: true }
              },
              {
                path:'executeAnalysis',
                hidden: true,
                component:()=>import('@/views/storage/partition/vertical/executeAnalysis'),
                meta: { keepAlive: true }
              },
            ]
          },
        ]
      }
    ]
  },
  {
    path: '/query',
    component: Layout,
    redirect: '/query/plan',
    name: 'Example',
    meta: { title: '查询优化', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'plan',
        name: 'QueryPlan',
        component: () => import('@/views/queryPlan/index'),
        meta: { title: '查询处理优化', icon: 'tree' }
      }
    ]
  },
  {
    path: '/learnedIndex',
    component: Layout,
    redirect: '/learnedIndex/query',
    name: 'learnedIndex',
    meta: {
      title: '索引推荐构建',
      icon: 'nested'
    },
    children: [
      // {
      //   path: 'menu1',
      //   component: () => import('@/views/nested/menu1/index'), // Parent router-view
      //   name: 'Menu1',
      //   meta: { title: 'Menu1' },
      //   children: [
      //     {
      //       path: 'menu1-1',
      //       component: () => import('@/views/nested/menu1/menu1-1'),
      //       name: 'Menu1-1',
      //       meta: { title: 'Menu1-1' }
      //     },
      //     {
      //       path: 'menu1-2',
      //       component: () => import('@/views/nested/menu1/menu1-2'),
      //       name: 'Menu1-2',
      //       meta: { title: 'Menu1-2' },
      //       children: [
      //         {
      //           path: 'menu1-2-1',
      //           component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
      //           name: 'Menu1-2-1',
      //           meta: { title: 'Menu1-2-1' }
      //         },
      //         {
      //           path: 'menu1-2-2',
      //           component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
      //           name: 'Menu1-2-2',
      //           meta: { title: 'Menu1-2-2' }
      //         }
      //       ]
      //     },
      //     {
      //       path: 'menu1-3',
      //       component: () => import('@/views/nested/menu1/menu1-3'),
      //       name: 'Menu1-3',
      //       meta: { title: 'Menu1-3' }
      //     }
      //   ]
      // },
      {
        path: 'query',
        component: () => import('@/views/learnedIndex/query/index'),
        name: 'Query',
        meta: { title: '查询' }
      },
      {
        path: 'recommend',
        component: () => import('@/views/learnedIndex/recommend/index'),
        name: 'Recommend',
        meta: { title: '索引推荐' }
      }
    ]
  },
  

  {
    path: '/optimzation',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'optimzation',
        component: () => import('@/views/optimzation/index'),
        meta: { title: '数据库调优', icon: 'form' }
      }
    ]
  },

  

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
