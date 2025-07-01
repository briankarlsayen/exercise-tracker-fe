<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import { useExerciseStore } from "../stores/exerciseStore";
import { formatDate } from "../utils";
import DashboardCard from "./DashboardCard.vue";

export default defineComponent({
  name: "DashboardScreen",
  components: {
    DashboardCard,
  },
  setup() {
    const card1 = {
      cardType: "time",
      cardValue: "224",
    };
    const card2 = {
      cardType: "streak",
      cardValue: "33",
    };
    const card3 = {
      cardType: "progress",
      cardValue: "3/5",
    };

    const exerciseData = useExerciseStore();

    const streak = computed(() => exerciseData?.stats?.streak);
    const duration = computed(() => exerciseData?.stats?.duration);
    const progress = computed(() => exerciseData?.stats.progress);

    onMounted(async () => {
      const today = new Date();
      const day = today.getDate();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();
      const date = formatDate(new Date(year, month, day));
      await exerciseData.fetchExercises(date);
      await exerciseData.fetchExerciseStats();
    });

    return {
      card1,
      card2,
      card3,
      exerciseData,
      stats: {
        streak: streak,
        duration: duration,
        progress: progress,
      },
    };
  },
});
</script>
<template>
  <div>
    <h2>Weekly stats:</h2>
    <n-grid
      cols="2 xs:2 s:3 m:5 l:2 xl:3"
      :y-gap="24"
      :x-gap="24"
      responsive="screen"
    >
      <n-grid-item>
        <DashboardCard
          :cardType="card1.cardType"
          :cardVal="stats.duration?.value?.toString()"
        />
      </n-grid-item>
      <n-grid-item>
        <DashboardCard
          :cardType="card2.cardType"
          :cardVal="stats?.streak?.value?.toString()"
        />
      </n-grid-item>
      <n-grid-item>
        <DashboardCard
          :cardType="card3.cardType"
          :cardVal="stats?.progress?.value?.toString()"
        />
      </n-grid-item>
    </n-grid>
    <!-- <div style="display: flex; gap: 1rem; justify-content: space-between">
      <DashboardCard
        :cardType="card1.cardType"
        :cardVal="stats.duration?.value?.toString()"
      />
      
  
    </div> -->
  </div>
</template>
