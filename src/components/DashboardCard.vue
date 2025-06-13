<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DashboardCard",
});
</script>
<template>
  <div class="popup-box">
    <h1>LOGO</h1>
    <div class="val-container">
      <h1>99</h1>
      <p>minutes</p>
    </div>
    <p>this week</p>
  </div>
</template>

<style lang="css" scoped>
.popup-box {
  padding: 1rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 250px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.val-container {
  display: flex;
  align-items: self-end;
}
h1 {
  flex: 1;
  align-items: center;
}
</style>
