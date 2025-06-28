<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    return {
      goToLogin() {
        router.push("/login");
      },
    };
  },
});
</script>
<template>
  <div class="container">
    <div class="box-container">
      <div class="content-container">
        <div class="text-container">
          <!-- <img class="not-found-img" :src="animateImg" alt="404 image" /> -->
          <h1 class="logo">404</h1>
          <h1>Oooops Page Not Found</h1>
          <p>Sorry. We cannot find the page you are looking for.</p>
        </div>
        <n-button type="info" @click="goToLogin">Go to login</n-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  gap: 2rem;
  height: 100vh;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.box-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 850px;
  width: 80%;
  /* width: 80vw; */
  /* height: 80vw; */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  padding: 1rem;
  gap: 2rem;
  border-radius: 12px;
}

.content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  text-align: center;
  padding-bottom: 1.5rem;
}

.box1 {
  height: 100%;
  background-color: red;
  width: 100%;
}
.box2 {
  height: 100%;
  background-color: blue;
  width: 100%;
}

.not-found-img {
  width: 200px;
  height: 200px;
}

.logo {
  font-size: 124px;
}
</style>
