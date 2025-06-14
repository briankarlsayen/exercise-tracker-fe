<template>
  <div class="container">
    <nav>
      <div class="nav-logo">
        <h1>Exercise Tracker</h1>
      </div>
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
}
.nav-logo {
  color: white;
  padding-right: 1rem;
}
.container {
  height: 95vh;
}
</style>
