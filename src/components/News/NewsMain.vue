<template>
    <CommonHeader />
    <section class="news">
        <div class="inner">
            <h1 class="title">News</h1>
            <ul class="news-list">
                <li class="news-item" v-for="item in news" :key="item.id" @click="moveDetail(item)">
                    <div class="news-imgbx">
                        <img :src="item.image_url" :alt="item.title">
                    </div>
                    <div class="news-txtbx">
                        <span class="news-site">{{ item.news_site }}</span>
                        <h2 class="news-title">{{ item.title }}</h2>
                        <p class="news-summary">{{ item.summary }}</p>
                    </div>
                </li>
            </ul>

            <div v-if="isLoading" class="loading-indicator">
                <p>Loading...</p>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

import CommonHeader from '../Common/CommonHeader.vue';

const news = ref([]);
const isLoading = ref(false);
const nextData = ref(null);
const hasMoreData = ref(true);

const router = useRouter();

// API 호출 함수
const getData = async (next = null) => {
    if (isLoading.value) return;

    isLoading.value = true;

    try {
        const apiUrl = next || `https://api.spaceflightnewsapi.net/v4/blogs/?limit=10&offset=0`;
        const res = await fetch(apiUrl);
        const data = await res.json();

        if (next) {
            // 파라미터에 URL 들어올시(무한 스크롤)
            news.value = [...news.value, ...data.results];
        } else {
            // 최초 로딩시
            news.value = data.results;
        }

        nextData.value = data.next;
        hasMoreData.value = !!data.next;
    } catch (err) {
        console.error('데이터 로딩 실패:', err);
    } finally {
        isLoading.value = false;
    }
}

// 상세 페이지 클릭 이벤트
const moveDetail = (post) => {
    router.push({
        name: 'Detail',
        params: { id: post.id },
    });
}

// 스크롤 감지 이벤트
const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.offsetHeight;

    if (scrollTop + windowHeight >= documentHeight - 100) {
        if (hasMoreData.value && !isLoading.value && nextData.value) {
            getData(nextData.value);
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
}

.news-item:hover {
    transform: translateY(-2px);
}

.news-item:first-of-type {
    padding: 0 0 45px;
}

.news-item+.news-item {
    padding: 45px 0 45px;
    border-top: 0.5px solid rgba(0, 0, 0, 0.3);
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
    align-items: flex-end;
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