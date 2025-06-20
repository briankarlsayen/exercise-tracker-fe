<script lang="ts">
import { onMounted } from "vue";
import ExerciseSection from "../components/ExerciseSection.vue";
import CustomCalendar from "../components/CustomCalendar.vue";
import DashboardCard from "../components/DashboardCard.vue";
import { useExerciseStore } from "../stores/exerciseStore";
import { formatDate } from "../utils";

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

    onMounted(async () => {
      const today = new Date();
      const day = today.getDate();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();
      const date = formatDate(new Date(year, month, day));
      await exerciseData.fetchExercises(date);
    });

    return {
      card1,
      card2,
      card3,
      exerciseData,
    };
  },
};
</script>
<template>
  <div class="home-container">
    <div class="content-container">
      <div class="left-container">
        <div class="calendar-container">
          <CustomCalendar />
        </div>
        <h1>Weekly stats:</h1>
        <div style="display: flex; gap: 1rem; justify-content: space-between">
          <DashboardCard
            :cardType="card1.cardType"
            :cardVal="card1.cardValue"
          />
          <DashboardCard
            :cardType="card2.cardType"
            :cardVal="card2.cardValue"
          />
          <DashboardCard
            :cardType="card3.cardType"
            :cardVal="card3.cardValue"
          />
        </div>
      </div>
      <div class="exercise-section">
        <ExerciseSection />
      </div>
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
}
.calendar-container {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  height: fit-content;
  padding: 1rem;
  width: 600px;
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
</style>
