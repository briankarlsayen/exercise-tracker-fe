<script lang="ts">
import { SignOut20Filled } from "@vicons/fluent";
import { useRouter } from "vue-router";
import Notfound from "../pages/Notfound.vue";

export default {
  name: "PrivateLayout",
  components: {
    SignOut20Filled,
    Notfound,
  },
  setup() {
    const router = useRouter();
    const authExist = localStorage.getItem("auth");

    return {
      authExist,
      logout: () => {
        localStorage.clear();
        router.push("/login");
      },
    };
  },
};
</script>

<template>
  <div v-if="authExist" class="container">
    <nav>
      <div class="nav-logo">
        <h2>Exercise Tracker</h2>
      </div>
      <n-icon class="icon" size="24" @click="logout">
        <SignOut20Filled />
      </n-icon>
    </nav>
    <router-view />
  </div>
  <div v-else>
    <Notfound />
    <!-- <p>eyy</p> -->
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
