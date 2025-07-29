import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import News from '../pages/News.vue'
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
    component: News
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
  history: createWebHistory(),
  routes
})

export default router 