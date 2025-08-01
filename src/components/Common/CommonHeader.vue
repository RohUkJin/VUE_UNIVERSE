<template>
    <header>
        <div class="inner">
            <ul class="left-list">
                <li>
                    <router-link to="/"><span>Explore</span></router-link>
                </li>
                <li>
                    <button class="search-btn" :class="{ active: isActive }" @click="clickSearchBtn">
                        <span>Search</span>
                    </button>
                    <div class="search-input-box" v-if="isActive">
                        <input type="text" v-model="searchQuery" placeholder="Enter your search term..." class="search-input"
                            @keyup.enter="handleSearch" />
                    </div>
                </li>
            </ul>
            <ul class="right-list">
                <li>
                    <router-link to="/news"><span>News</span></router-link>
                </li>
            </ul>
        </div>
    </header>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const isActive = ref(false);
const searchQuery = ref('');

const router = useRouter();

const clickSearchBtn = () => {
    isActive.value = !isActive.value;

    if (isActive.value) {
        searchQuery.value = '';
    }
}

const handleSearch = async () => {
    if (searchQuery.value.trim()) {
        console.log('검색어:', searchQuery.value);
        
        router.push({
            name: 'Search',
            query: { q: searchQuery.value.trim() }
        });
        
        isActive.value = false;
    }
}
</script>

<style scoped>
header {
    background: #121212;
}

header .inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    padding: 24px;
}

header span {
    font-size: 18px;
    font-weight: 700;
    color: #fff;
}

header .left-list {
    display: flex;
    align-items: center;
    gap: 20px;
}

header .left-list li:last-child {
    position: relative;
}

header .search-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    transition: all 0.3s;
    font-family: Avenir, Helvetica, Arial, sans-serif;
}

.search-input-box {
    position: absolute;
    top: 50%;
    left: 100%;
    transform: translateY(-50%);
    max-width: 800px;
    margin-left: 16px;
}

.search-input {
    padding: 8px 14px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #fff;
    background: transparent;
    font-size: 16px;
    outline: none;
    transition: all 0.3s ease;
}

.search-input::placeholder {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
}

.search-input:focus {
    border-color: rgba(255, 255, 255, 0.4);
    background: rgba(255, 255, 255, 0.1);
}

</style>