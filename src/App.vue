<template>
  <router-view />
</template>

<script>


export default {
  name: 'App',
  components: {}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

body {
    margin: 0;
    padding: 0;
}


h1,
h2,
h3,
h4,
p,
span {
  word-break: keep-all;
  margin: 0;
  padding: 0;
}

ul {
  padding: 0;
}

li {
  list-style: none;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

a {
  text-decoration: none;
}

button {background:none;border:0;outline:0;padding:0;}

.inner {
  max-width: 1200px;
}

</style>
