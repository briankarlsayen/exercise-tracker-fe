<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ExerciseCard",
  props: {
    exercise: {
      type: Object,
      default: null,
    },
  },
  setup() {},
});
</script>

<template>
  <div class="card">
    <h4>{{ exercise?.name }}</h4>
    <p><span>Intensity: </span> {{ exercise?.intensity }}</p>
    <p><span>Duration: </span> {{ exercise?.duration }} minutes</p>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  padding-top: 1rem;
  padding-bottom: 1rem;
}
</style>
