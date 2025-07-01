<script lang="ts">
import { Add12Filled } from "@vicons/fluent";
import { computed, defineComponent, ref } from "vue";
import ExerciseForm from "./ExerciseForm.vue";
import ExerciseCard from "./ExerciseCard.vue";
import { useExerciseStore } from "../stores/exerciseStore";

export default defineComponent({
  name: " ExerciseSection",
  components: {
    Add12Filled,
    ExerciseForm,
    ExerciseCard,
  },
  setup() {
    const exerciseStore = useExerciseStore();
    const isOpen = ref(false);

    const date = computed(() => exerciseStore.date);
    const exercises = computed(() => exerciseStore.exercises);

    const openExerciseForm = () => {
      isOpen.value = true;
      exerciseStore.addExercise();
    };

    return {
      isOpen,
      openExerciseForm,
      date,
      exercises,
    };
  },
});
</script>
<template>
  <div class="exercise-container">
    <ExerciseForm v-model="isOpen" :date="date" />
    <div class="e-container">
      <div class="heading-container">
        <div>
          <h2 class="title">Exercises</h2>
          <p class="date">{{ date }}</p>
        </div>
        <n-button type="info" @click="openExerciseForm">
          <n-icon size="18">
            <Add12Filled />
          </n-icon>
          Add
        </n-button>
      </div>
      <div>
        <ul>
          <li v-for="(exercise, index) in exercises" :key="exercise?.id">
            <ExerciseCard v-model="isOpen" :exercise="exercise" />
            <hr
              v-if="index < exercises?.length - 1"
              style="border: none; height: 1px; background-color: #e0e0e0"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.exercise-container {
  display: flex;
  width: 100%;
  height: 100%;
}
.e-container {
  width: 100%;
  padding: 2.5rem;
}
.heading-container {
  padding-bottom: 0.3rem;
  display: flex;
  justify-content: space-between;
}
.title {
  padding: 0;
  margin: 0;
  line-height: 20px;
  /* text-align: center; */
}
.date {
  font-size: small;
}
</style>
