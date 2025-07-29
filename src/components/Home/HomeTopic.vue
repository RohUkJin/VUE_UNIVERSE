<template>
    <section class="topic">
        <div class="inner">
            <h2 class="title">More Topics</h2>
            <ul class="menu-list">
                <li class="menu-item">
                    <router-link to="/news" class="news-button">
                        <div class="imgbx">
                            <img src="../../assets/images/menu-1.jpg" alt="">
                        </div>
                        <div class="txtbx">
                            <p>News</p>
                        </div>
                    </router-link>
                </li>
                <li class="menu-item">
                    <router-link to="/" class="news-button">
                        <div class="imgbx">
                            <img src="../../assets/images/menu-2.jpg" alt="">
                        </div>
                        <div class="txtbx">
                            <p>Upcoming</p>
                        </div>
                    </router-link>
                </li>
                <li class="menu-item">
                    <router-link to="/" class="news-button">
                        <div class="imgbx">
                            <img src="../../assets/images/menu-3.jpg" alt="">
                        </div>
                        <div class="txtbx">
                            <p>Upcoming</p>
                        </div>
                    </router-link>
                </li>
                <li class="menu-item">
                    <router-link to="/" class="news-button">
                        <div class="imgbx">
                            <img src="../../assets/images/menu-4.jpg" alt="">
                        </div>
                        <div class="txtbx">
                            <p>Upcoming</p>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </section>
</template>

<script setup>

</script>

<style scoped>
.topic .title {
    font-size: 48px;
    font-weight: 700;
    padding-bottom: 16px;
}

.topic .inner {
    padding: 80px 24px;
    margin: 0 auto;
}

.topic .menu-list {
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(4, 1fr);
}

.topic .menu-item {
    position: relative;
    width: 100%;
    height: 430px;
    overflow: hidden;
    cursor: pointer;
}

.topic .imgbx {
    width: 100%;
    height: 100%;
    transition: transform 0.3s;
}

.topic .imgbx:hover {
    transform: scale(1.1);
}

.topic .txtbx {
    position: absolute;
    bottom: 7.5%;
    left: 10%;
}

.topic .txtbx p {
    font-size: 24px;
    font-weight: 700;
    color: #fff;
}

@media screen and (max-width: 1200px) {
    .topic .menu-list {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media screen and (max-width: 768px) {
    .topic .menu-list {
        grid-template-columns: repeat(1, 1fr);
    }
}
</style>