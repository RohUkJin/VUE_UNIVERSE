<template>
  <CommonHeader />
  <section class="news">
      <div class="inner">
          <h1 class="title">News</h1>
           <ul class="news-list">
            <li class="news-item" v-for="post in news" :key="post.id" @click="moveDetail(post)">
                <div class="news-imgbx">
                    <img :src="post.image_url" :alt="post.title">
                </div>
                <div class="news-txtbx">
                    <span class="news-site">{{ post.news_site }}</span>
                    <h2 class="news-title">{{ post.title }}</h2>
                    <p class="news-summary">{{ post.summary }}</p>
                </div>
            </li>
           </ul>
           
           <div v-if="loading" class="loading-indicator">
               <p>Loading...</p>
           </div>
      </div>
  </section>
</template>

<script>
import {ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

import CommonHeader from '../Common/CommonHeader.vue';

export default {
    components: {
        CommonHeader
    },
    setup(){ 
        const news = ref([]);
        const router = useRouter();
        const loading = ref(false);
        const nextUrl = ref(null);
        const hasMore = ref(true);

        const getData = async (url = null) => {
            // 중복 방지
            if (loading.value) return; 
            
            loading.value = true;

            try {
                const apiUrl = url || `https://api.spaceflightnewsapi.net/v4/blogs/?limit=10&offset=0`;
                const res = await fetch(apiUrl);
                const data = await res.json();
                
                if (url) {
                    news.value = [...news.value, ...data.results]; // 인피니티 스크롤 --> 기존 데이터에 새로운 데이터 추가
                } else {
                    news.value = data.results; // 최초 로딩시
                }
                
                nextUrl.value = data.next;
                hasMore.value = !!data.next;
            } catch(err) {
                console.error('데이터 로딩 실패:', err);
            } finally {
                loading.value = false;
            }
        }

        // 스크롤 핸들러
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.offsetHeight;
            
            if (scrollTop + windowHeight >= documentHeight - 100) {
                if (hasMore.value && !loading.value && nextUrl.value) {
                    getData(nextUrl.value);
                }
            }
        };

        onMounted(() => {
            getData();
            window.addEventListener('scroll', handleScroll);
        });

        onUnmounted(() => {
            window.removeEventListener('scroll', handleScroll);
        });

        const moveDetail = (post) => {
            router.push({
                name: 'Detail',
                params: { id: post.id },
                state: { post: post }
            });
        }
        
        return {
            news, 
            getData, 
            moveDetail,
            loading,
            hasMore
        }
    }
}
</script>

<style scoped>

.news .inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px
}

.title {
    font-size: 54px;
    font-weight: 700;
    padding: 48px 0;
    text-align: center;
}

.news-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    padding-left: 0;
}

.news-item {
    display: flex;
    align-items: flex-start;
    gap: 45px;
    height: 300px;
    cursor: pointer;
    transition: transform 0.2s ease;
    list-style: none;
    border-bottom: 0.5px solid rgba(0,0,0,0.3);
}

.news-item:hover {
    transform: translateY(-2px);
}

.news-item:first-of-type {
    padding: 0 0 45px;
}

.news-item + .news-item {
    padding: 45px 0 45px;
}

.news-imgbx {
    flex: 1;
    height: 300px;
    border-radius: 12px;
    overflow: hidden;
}

.news-imgbx img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.news-txtbx {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    justify-content: flex-start;
    padding-left: 20px;
}

.news-title {
    font-size: 28px;
    font-weight: 700;
    text-align: left;
    margin: 0;
    line-height: 1.4;
}

.news-site {
    font-size: 18px;
    color: #868686;
}

.news-summary {
    text-wrap: balance;
    font-size: 20px;
    text-align: left;
    margin-top: 0;
    line-height: 1.6;
    display: -webkit-box;
    max-height: 155px;
    overflow: hidden;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
}

.loading-indicator {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 18px;
    color: #666;
}

@media screen and (max-width: 1200px) {
    .news-item {
        height: auto;
        flex-direction: column;
        gap: 24px;
    }

    .news-imgbx {
        width: 100%;
        height: 100%;
        max-height: 500px;
        border-radius: 12px;
        overflow: hidden;
    }

    .news-imgbx img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        pointer-events: none;
    }

    .news-txtbx {
        padding-left: 0;
    }
}


</style>