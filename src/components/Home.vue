<template>
    <CommonHeader />
    <div class="container">
        <section class="sc-kv">
            <swiper 
                :modules="modules"
                :slides-per-view="1"
                :autoplay="{ delay: 10000 }"
                :loop="true"
                class="main-swiper"
            >
                <swiper-slide>
                    <div class="imgbx">
                        <img src="../assets/images/slide-1.jpg" alt="">
                    </div>
                    <div class="txtbx">
                        <h1>슬라이드 1</h1>
                        <p>슬라이드 1 내용</p>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="imgbx">
                        <img src="../assets/images/slide-2.jpg" alt="">
                    </div>
                    <div class="txtbx">
                        <h1>슬라이드 2</h1>
                        <p>슬라이드 2 내용</p>
                    </div>
                </swiper-slide>
                
            </swiper>
        </section>
        <section class="sc-topics">
            <div class="inner">
                <h2 class="title">More Topics</h2>
                <ul class="menu-list">
                    <li class="menu-item">
                        <router-link to="/news" class="news-button">
                            <div class="imgbx">
                                <img src="../assets/images/menu-1.jpg" alt="">
                            </div>
                            <div class="txtbx">
                                <p>News</p>
                            </div>
                        </router-link>
                    </li>
                    <li class="menu-item">
                        <router-link to="/" class="news-button">
                            <div class="imgbx">
                                <img src="../assets/images/menu-2.jpg" alt="">
                            </div>
                            <div class="txtbx">
                                <p>Upcoming</p>
                            </div>
                        </router-link>
                    </li>
                    <li class="menu-item">
                        <router-link to="/" class="news-button">
                            <div class="imgbx">
                                <img src="../assets/images/menu-3.jpg" alt="">
                            </div>
                            <div class="txtbx">
                                <p>Upcoming</p>
                            </div>
                        </router-link>
                    </li>
                    <li class="menu-item">
                        <router-link to="/" class="news-button">
                            <div class="imgbx">
                                <img src="../assets/images/menu-4.jpg" alt="">
                            </div>
                            <div class="txtbx">
                                <p>Upcoming</p>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>
        </section>
    </div>
</template>

<script>
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/autoplay";

import CommonHeader from './Common/CommonHeader.vue';

export default {
    name: 'HomePage',
    components: {
        CommonHeader,
        Swiper,
        SwiperSlide,
    },
    setup() {
        const modules = [Autoplay];
        
        return {
            modules
        };
    }
}
</script>
<style scoped>
.sc-topics .title {
    font-size: 48px;
    font-weight: 700;
    padding-bottom: 16px;
}

.sc-topics .inner {
    padding: 80px 24px;
    margin: 0 auto;
}

.sc-topics .menu-list {
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(4, 1fr);
}

.sc-topics .menu-item {
    position: relative;
    width: 100%;
    height: 430px;
    overflow: hidden;
    cursor: pointer;
}

.sc-topics .imgbx {
    width: 100%;
    height: 100%;
    transition: transform 0.3s;
}

.sc-topics .imgbx:hover {
    transform: scale(1.1);
}

.sc-topics .txtbx {
    position: absolute;
    bottom: 7.5%;
    left: 10%;
}

.sc-topics .txtbx p {
    font-size: 24px;
    font-weight: 700;
    color: #fff;
}

.sc-kv {
    position: relative;
}

.sc-kv .imgbx {
    height: 650px;
}

.sc-kv .txtbx {
    position: absolute;
    bottom: 7.5%;
    left: 10%;
    color: #fff;
    z-index: 2;
}

.sc-kv .txtbx h2 {
    font-weight: 700;
}

@media screen and (max-width: 1200px) {
    .sc-topics .menu-list {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media screen and (max-width: 768px) {
    .sc-topics .menu-list {
        grid-template-columns: repeat(1, 1fr);
    }
}
</style>