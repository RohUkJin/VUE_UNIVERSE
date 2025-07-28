import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../components/Home.vue'
import NewsMain from '../components/News/NewsMain.vue'
import NewsDetail from '../components/News/NewsDetail.vue'
import SearchMain from '@/components/Search/SearchMain.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/news',
    name: 'News',
    component: NewsMain
  },
  {
    path: '/news/detail/:id',
    name: 'Detail',
    component: NewsDetail,
    props: true
  },
  {
    path: '/search',
    name: 'Search',
    component: SearchMain
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router 