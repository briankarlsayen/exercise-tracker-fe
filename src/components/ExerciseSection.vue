<script lang="ts">
import { Add12Filled } from "@vicons/fluent";
import { defineComponent, ref, type PropType } from "vue";
import ExerciseForm from "./ExerciseForm.vue";
import ExerciseCard from "./ExerciseCard.vue";
import type { IExercise } from "../pages/Home.vue";

export default defineComponent({
  name: " ExerciseSection",
  components: {
    Add12Filled,
    ExerciseForm,
    ExerciseCard,
  },
  props: {
    date: {
      type: String,
      required: true,
    },
    exercises: {
      type: Array as PropType<IExercise[]>,
      default: [],
    },
  },
  setup() {
    const isOpen = ref(false);
    return {
      isOpen,
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
          <h1 class="title">Exercises</h1>
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
          <li v-for="(exercise, index) in exercises" :key="exercise?.id">
            <ExerciseCard :exercise="exercise" />
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
