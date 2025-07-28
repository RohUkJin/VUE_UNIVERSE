<template>
    <CommonHeader />
    <div class="detail-container">
        <article class="detail-article" v-if="item">
            <div class="detail-header">
                <img :src="item.image_url" :alt="item.title" class="detail-image">
                <div class="detail-meta">
                    <span class="detail-site">{{ item.news_site }}</span>
                    <h1 class="detail-title">{{ item.title }}</h1>
                    <p class="detail-date">{{ formatDate(item.published_at) }}</p>
                </div>
            </div>
            <div class="detail-content">
                <p class="detail-summary">{{ item.summary }}</p>
                <a :href="item.url" target="_blank" rel="noopener noreferrer" class="detail-link">
                    Get Original →
                </a>
            </div>
        </article>

        <div v-else class="loading-indicator">
            <p>Loading...</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

import CommonHeader from '../Common/CommonHeader.vue';

const props = defineProps({
    id: Number
});

const item = ref(null);

onMounted(() => {
    getData(props.id);
});

const getData = async (id) => {
    try {
        const res = await fetch(`https://api.spaceflightnewsapi.net/v4/blogs/${id}/`);
        const data = await res.json();
        item.value = data;
    } catch (err) {
        console.error('데이터 로딩 실패:', err);
    }
};

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};
</script>

<style scoped>
.detail-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px 0 24px;
}

.detail-header {
    margin-bottom: 30px;
}

.detail-image {
    width: 100%;
    max-height: 600px;
    object-fit: cover;
    border-radius: 12px;
    margin-bottom: 20px;
}

.detail-meta {
    text-align: left;
}

.detail-site {
    color: #868686;
    font-size: 16px;
    font-weight: 500;
}

.detail-title {
    font-size: 32px;
    font-weight: 700;
    margin: 15px 0;
    line-height: 1.4;
}

.detail-date {
    color: #666;
    font-size: 14px;
}

.detail-content {
    text-align: left;
}

.detail-summary {
    font-size: 18px;
    line-height: 1.6;
    margin-bottom: 30px;
    color: #333;
}

.detail-link {
    display: inline-block;
    border-bottom: 1px solid #868686;
    color: #868686;
    text-decoration: none;
    font-weight: 500;
    padding: 6px;
    transition: all 0.3s;
    cursor: pointer;
}

.detail-link:hover {
    color: #000;
    border-bottom: 1px solid #000;
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

    .detail-article {
        padding: 0 24px;
    }


}
</style>