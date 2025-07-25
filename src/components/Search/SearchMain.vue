<template>
    <CommonHeader />
    <section class="search">
        <div class="inner">
            <h1 class="title">
                Search Result: "{{ searchQuery }}"
                <span class="result-count" v-if="!loading">({{ searchCount }})</span>
            </h1>    
            <ul class="search-list">
                <li class="search-item" v-for="article in searchResults" :key="article.id" @click="moveDetail(article)">
                    <div class="search-imgbx">
                        <img :src="article.image_url" :alt="article.title">
                    </div>
                    <div class="search-txtbx">
                        <span class="search-site">{{ article.news_site }}</span>
                        <h2 class="search-title" v-html="highlightText(article.title)"></h2>
                        <p class="search-summary" v-html="highlightText(article.summary)"></p>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import CommonHeader from '../Common/CommonHeader.vue';

export default {
    components: { CommonHeader },
    setup(){
        const searchCount = ref(0)
        const searchResults = ref([]);
        const searchQuery = ref('');
        const loading = ref(false);
        const route = useRoute();
        const router = useRouter();
        const nextUrl = ref(null);
        const hasMore = ref(true);

        const fetchSearchResults = async (query, url = null) => {
            if (!query.trim()) return;
            
            loading.value = true;

            try {
                const apiUrl = url || `https://api.spaceflightnewsapi.net/v4/blogs/?title_contains=${query.trim()}`
                const res = await fetch(apiUrl)
                const data = await res.json();

                if(url){
                    searchResults.value = [...searchResults.value, ...data.results];
                } else {
                    searchResults.value = data.results;
                    searchCount.value = data.count;
                }
                
                nextUrl.value = data.next;
                hasMore.value = !!data.next;
            } catch(err) {
                console.error('검색 실패:', err);
                searchResults.value = [];
            } finally {
                loading.value = false;
            }
        }

        const highlightText = (text) => {
            if (!text || !searchQuery.value) return text;
            
            const query = searchQuery.value.trim();
            if (!query) return text;
            
            // 정규표현식으로 대소문자 구분 없이 검색어를 찾아서 하이라이트
            const regex = new RegExp(`(${query})`, 'gi');
            return text.replace(regex, '<mark class="highlight">$1</mark>');
        }

        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.offsetHeight;
            
            if (scrollTop + windowHeight >= documentHeight - 100) {
                if (hasMore.value && !loading.value && nextUrl.value) {
                    fetchSearchResults(searchQuery.value, nextUrl.value);
                }
            }
        };

        const moveDetail = (post) => {
            router.push({
                name: 'Detail',
                params: { id: post.id },
                state: { post: post }
            });
        }

        onMounted(() => {
            searchQuery.value = route.query.q || '';
            if (searchQuery.value) {
                fetchSearchResults(searchQuery.value);
                window.addEventListener('scroll', handleScroll);
            }
        });

        onUnmounted(() => {
            window.removeEventListener('scroll', handleScroll);
        });

        return {
            searchCount,
            searchResults,
            searchQuery,
            loading,
            hasMore,
            moveDetail,
            highlightText
        }
    }
}
</script>

<style scoped>
.search .inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
}

.title {
    font-size: 54px;
    font-weight: 700;
    padding: 48px 0;
    text-align: center;
}

.result-count {
    font-size: 24px;
    color: #666;
    font-weight: 400;
}

.loading-indicator,
.no-results {
    text-align: center;
    padding: 60px 0;
    font-size: 20px;
    color: #666;
}

.search-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    padding-left: 0;
}

.search-item {
    display: flex;
    align-items: flex-start;
    gap: 45px;
    height: 300px;
    cursor: pointer;
    transition: transform 0.2s ease;
    list-style: none;
    border-bottom: 0.5px solid rgba(0,0,0,0.3);
}

.search-item:hover {
    transform: translateY(-2px);
}

.search-item:first-of-type {
    padding: 0 0 45px;
}

.search-item + .search-item {
    padding: 45px 0 45px;
}

.search-imgbx {
    flex: 1;
    height: 300px;
    border-radius: 12px;
    overflow: hidden;
}

.search-imgbx img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.search-txtbx {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    justify-content: flex-start;
    padding-left: 20px;
}

.search-title {
    font-size: 28px;
    font-weight: 700;
    text-align: left;
    margin: 0;
    line-height: 1.4;
}

.search-site {
    font-size: 18px;
    color: #868686;
}

.search-summary {
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

/* 검색어 하이라이트 스타일 */
.highlight {
    background-color: #ffff00;
    color: #000;
    padding: 2px 4px;
    border-radius: 3px;
    font-weight: 600;
    box-shadow: 0 1px 3px rgba(255, 255, 0, 0.3);
}

@media screen and (max-width: 1200px) {
    .search-item {
        height: auto;
        flex-direction: column;
        gap: 24px;
    }

    .search-imgbx {
        width: 100%;
        height: 100%;
        max-height: 500px;
        border-radius: 12px;
        overflow: hidden;
    }

    .search-imgbx img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        pointer-events: none;
    }

    .search-txtbx {
        padding-left: 0;
    }

}
</style>