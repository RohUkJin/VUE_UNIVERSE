<template>
    <CommonHeader />
    <div class="detail-container">
        <button @click="goBack" class="back-btn">← Back</button>

        <article class="detail-article" v-if="post">
            <div class="detail-header">
                <img :src="post.image_url" :alt="post.title" class="detail-image">
                <div class="detail-meta">
                    <span class="detail-site">{{ post.news_site }}</span>
                    <h1 class="detail-title">{{ post.title }}</h1>
                    <p class="detail-date">{{ formatDate(post.published_at) }}</p>
                </div>
            </div>
            <div class="detail-content">
                <p class="detail-summary">{{ post.summary }}</p>
                <a :href="post.url" target="_blank" rel="noopener noreferrer" class="detail-link">
                    Get Original →
                </a>
            </div>
        </article>

        <div v-else class="loading-indicator">
            <p>Loading...</p>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import CommonHeader from '../Common/CommonHeader.vue';

export default {
    components: {
        CommonHeader
    },
    props: {
        id: String
    },
    setup(props) {
        const router = useRouter();
        const post = ref(null);

        onMounted(() => {
            if (history.state && history.state.post) {
                post.value = history.state.post;
            } else {
                fetchPostById(props.id);
            }
        });

        const fetchPostById = async (id) => {
            try {
                const res = await fetch(`https://api.spaceflightnewsapi.net/v4/blogs/${id}/`);
                const data = await res.json();
                post.value = data;
            } catch (err) {
                console.error('포스트 로딩 실패:', err);
            }
        };

        const goBack = () => {
            router.back();
        };

        const formatDate = (dateString) => {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        };

        return {
            post,
            goBack,
            formatDate
        };
    }
}
</script>

<style scoped>
.detail-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 25px 0 0;
}

.back-btn {
    background: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 30px;
    font-size: 16px;
    display: none;
}

.back-btn:hover {
    background: #0056b3;
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
</style>