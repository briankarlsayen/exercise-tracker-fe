<script lang="ts">
import { SignOut20Filled } from "@vicons/fluent";
import { useRouter } from "vue-router";

export default {
  name: "PrivateLayout",
  components: {
    SignOut20Filled,
  },
  setup() {
    const router = useRouter();

    return {
      logout: () => {
        localStorage.clear();
        router.push("/login");
      },
    };
  },
};
</script>

<template>
  <div class="container">
    <nav>
      <div class="nav-logo">
        <h1>Exercise Tracker</h1>
      </div>
      <n-icon class="icon" size="24" @click="logout">
        <SignOut20Filled />
      </n-icon>
    </nav>
    <router-view />
  </div>
</template>

<style scoped>
nav {
  /* padding: 1rem; */
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: #2a5ba6;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  height: 5vh;
  justify-content: space-between;
}
.nav-logo {
  color: white;
  padding-right: 1rem;
}
.container {
  height: 95vh;
}
.icon {
  color: white;
}

.icon:hover {
  color: #cfcfcf;
  transition: color 0.3s;
  cursor: pointer;
}
</style>
