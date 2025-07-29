<template>
    <section class="hero">
        <swiper :modules="modules" :slides-per-view="1" :autoplay="{ delay: 10000 }" :loop="true" class="main-swiper">
            <swiper-slide>
                <div class="imgbx">
                    <img src="../../assets/images/slide-1.jpg" alt="slide-1-image">
                </div>
                <div class="txtbx">
                    <h1>Universe 1</h1>
                    <p>Universe Text</p>
                </div>
            </swiper-slide>
            <swiper-slide>
                <div class="imgbx">
                    <img src="../../assets/images/slide-2.jpg" alt="slide-2-image">
                </div>
                <div class="txtbx">
                    <h1>Universe 2</h1>
                    <p>Universe Text</p>
                </div>
            </swiper-slide>
        </swiper>
    </section>
</template>

<script setup>
import "swiper/css";
import "swiper/css/autoplay";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay } from "swiper/modules";

const modules = [Autoplay];
</script>

<style scoped>
.hero {
    position: relative;
    height: auto;

}

.hero .imgbx {
    height: 650px;
}

.hero .txtbx {
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 30px;
    max-width: 1200px;
    width: 100%;
    height: 100%;
    color: #fff;
}

@media screen and (max-width: 1200px) {
    .hero .txtbx {
        margin: 0 24px;
    }
}

.hero .txtbx h2 {
    font-weight: 700;
}
</style>