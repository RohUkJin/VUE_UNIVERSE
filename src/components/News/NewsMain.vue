<template>
    <section class="news">
        <div class="inner">
            <h1 class="title">News</h1>
            <ul class="news-list">
                <li class="news-item" v-for="item in news" :key="item.id" @click="moveDetail(item)">
                    <div class="news-imgbx">
                        <img 
                            :src="item.image_url || replaceImage" 
                            :alt="item.title"
                            @error="getReplaceImage"
                        >
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

const news = ref([]);
const isLoading = ref(false);
const nextData = ref(null);
const hasNextData = ref(true);

const router = useRouter();

// 상세 페이지 클릭시, 디테일 페이지 이동
const moveDetail = (item) => {
    router.push(`news/detail/${item.id}`);
}

// API 호출 함수
const getData = async (next = null) => {
    if (isLoading.value) return;
    isLoading.value = true;

    try {
        const response = await fetch(next || `https://api.spaceflightnewsapi.net/v4/blogs/?limit=10&offset=0`);
        const data = await response.json();

        if (next) {
            // 무한 스크롤 - 파라미터에 URL 들어올시 불변성 유지하며 신규 데이터 추가
            news.value = [...news.value, ...data.results];
        } else {
            // 컴포넌트가 처음 마운트 될 때만
            news.value = data.results;
        }

        nextData.value = data.next;
        hasNextData.value = !!data.next;
    } catch (err) {
        console.error('데이터 로딩 실패:', err);
    } finally {
        isLoading.value = false;
    }
}

// 스크롤 감지 이벤트
const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.offsetHeight;

    // 현재 스크롤 위치가 밑에서 100px 이내로 가면
    if (scrollTop + windowHeight >= documentHeight - 100) {
        // 다음 데이터와 여부가 존재하고, 로딩중이지 않을 때 API 재호출
        if (hasNextData.value && !isLoading.value && nextData.value) {
            getData(nextData.value);
        }
    }
};

// 데이터에 이미지가 없을 때 대체 이미지 삽입
const replaceImage = new URL('../../assets/images/Image-not-found.png', import.meta.url).href;
const getReplaceImage = (e) => {
    if (e.target.src !== replaceImage) {
        e.target.src = replaceImage;
    }
};

// 컴포넌트가 마운트 될 때, API 호출 및 스크롤 이벤트 추가
onMounted(() => {
    getData();
    window.addEventListener('scroll', handleScroll);
});

// 컴포넌트가 언마운트 될 때, 스크롤 이벤트 제거
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

    .news-summary {
        font-size: 18px;
        max-height: 180px;
    }
}
</style>