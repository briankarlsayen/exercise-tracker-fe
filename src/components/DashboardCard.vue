<script lang="ts">
import {
  PresenceAvailable10Regular,
  PresenceAvailable12Regular,
  Timer12Regular,
  Timer16Regular,
} from "@vicons/fluent";
import { defineComponent } from "vue";

export default defineComponent({
  name: "DashboardCard",
  components: {
    Timer12Regular,
    Timer16Regular,
    PresenceAvailable12Regular,
    PresenceAvailable10Regular,
  },
  props: {
    cardType: {
      type: String,
      default: "time",
    },
    cardVal: {
      type: String,
    },
  },
});
</script>
<template>
  <div v-if="cardType === 'time'" class="popup-box">
    <div class="logo">
      <Timer12Regular color="orange" />
    </div>
    <div class="val-container">
      <h1>{{ cardVal }}</h1>
      <p class="subtitle">minutes this week</p>
    </div>
  </div>
  <div v-else-if="cardType === 'streak'" class="popup-box">
    <div class="logo2">
      <PresenceAvailable10Regular color="green" />
    </div>
    <div class="val-container">
      <h1>{{ cardVal }}</h1>
      <p class="subtitle">week streaks</p>
    </div>
  </div>
  <div v-else-if="cardType === 'progress'" class="popup-box">
    <div style="height: 100px; align-content: center">
      <n-space id="progress1">
        <n-progress
          style="width: 100px"
          id="progress2"
          type="line"
          :percentage="60"
          :indicator-placement="'inside'"
          processing
        />
      </n-space>
    </div>
    <div class="val-container">
      <h1>{{ cardVal }}</h1>
      <p class="subtitle">exercises this week</p>
    </div>
  </div>
</template>

<style scoped>
.popup-box {
  padding: 1rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  width: 180px;
  height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#progress1 div {
  width: 100%;
}

.val-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 1rem;
}
h1 {
  flex: 1;
  align-items: center;
  font-size: 52px;
  line-height: 50px;
}
.subtitle {
  font-size: 12px;
}
.logo {
  height: 50px;
  width: 50px;
  flex: 1;
  align-items: center;
  align-content: center;
}
.logo2 {
  height: 40px;
  width: 40px;
  flex: 1;
  align-items: center;
  align-content: center;
}
</style>
