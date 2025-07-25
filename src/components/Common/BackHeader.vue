<template>
  <header>
    <button class="back-btn" @click="goBack">← Back</button>
  </header>
</template>
<script>
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();


    const goBack = () => {
      router.back();
    }

    return { goBack }
  }
}
</script>

<style scoped>
header {
  display: flex;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.back-btn {
  margin: 30px 0 10px; 
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  color: white;
  background: #007bff;
  cursor: pointer;
  transition: all 0.3s;
}

.back-btn:hover {
  background: #017cffe3;
}

</style>