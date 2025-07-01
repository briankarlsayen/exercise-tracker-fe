<script lang="ts">
import { Add12Filled } from "@vicons/fluent";
import { defineComponent, ref } from "vue";
import ExerciseForm from "../components/ExerciseForm.vue";
import ExerciseCard from "../components/ExerciseCard.vue";

export default defineComponent({
  name: "Exercises",
  components: {
    Add12Filled,
    ExerciseForm,
    ExerciseCard,
  },
  setup() {
    const date = "2025-06-11";
    const exercises = [
      {
        id: 1,
        name: "Bicept curls",
        intensity: 5,
        duration: 30,
      },
      {
        id: 2,
        name: "Concentration curl",
        intensity: 7,
        duration: 33,
      },
      {
        id: 3,
        name: "Hammer curl",
        intensity: 7,
        duration: 22,
      },
    ];
    const isOpen = ref(false);
    return {
      exercises,
      date,
      isOpen,
    };
  },
});
</script>

<template>
  <ExerciseForm v-model="isOpen" />
  <div class="container">
    <div class="e-container">
      <div class="heading-container">
        <div>
          <h2 class="title">Exercises</h2>
          <p class="date">{{ date }}</p>
        </div>
        <n-button type="info" @click="isOpen = true" ghost>
          <n-icon size="18">
            <Add12Filled />
          </n-icon>
          Add
        </n-button>
      </div>
      <div>
        <ul>
          <li v-for="(exercise, index) in exercises" :key="exercise.id">
            <ExerciseCard :exercise="exercise" />
            <hr
              v-if="index < exercises.length - 1"
              style="border: none; height: 1px; background-color: #e0e0e0"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 2rem;
}
.e-container {
  max-width: 400px;
  width: 100%;
  border: "black";
  border-style: solid;
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
  line-height: 10px;
  /* text-align: center; */
}
.date {
  font-size: small;
}
</style>
