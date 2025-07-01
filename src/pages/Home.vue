<script lang="ts">
import { computed, onMounted } from "vue";
import ExerciseSection from "../components/ExerciseSection.vue";
import CustomCalendar from "../components/CustomCalendar.vue";
import DashboardCard from "../components/DashboardCard.vue";
import { useExerciseStore } from "../stores/exerciseStore";
import { formatDate } from "../utils";
import DashboardScreen from "../components/DashboardScreen.vue";

export interface IExerciseDetails {
  date: string;
  exercises: IExercise[];
}

export interface IExercise {
  id: number;
  name: string;
  intensity?: number;
  duration?: number;
  category?: string;
}

export default {
  name: "Homepage",
  components: {
    ExerciseSection,
    CustomCalendar,
    DashboardCard,
    DashboardScreen,
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
};
</script>
<template>
  <div class="home-container">
    <div class="content-container">
      <n-grid cols="1 l:3" :y-gap="24" :x-gap="14" responsive="screen">
        <n-grid-item>
          <div class="left-container">
            <div class="calendar-container">
              <CustomCalendar />
            </div>
            <div>
              <DashboardScreen />
            </div>
          </div>
        </n-grid-item>
        <n-grid-item :span="2">
          <div class="exercise-section">
            <ExerciseSection />
          </div>
        </n-grid-item>
      </n-grid>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  display: flex;
  height: 100%;
  flex-direction: column;
  padding: 1rem;
}
.left-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}
.calendar-container {
  display: flex;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  height: fit-content;
  padding: 1rem;
  max-width: 600px;
  width: 100%;
}
.content-container {
  display: flex;
  gap: 1.5rem;
  width: 100%;
  height: 100%;
  flex: 1;
}
.exercise-section {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  flex: 1;
}

/* Small screen: apply padding-bottom */
@media (max-width: 640px) {
  .exercise-section {
    margin-bottom: 1rem;
  }
}
</style>
