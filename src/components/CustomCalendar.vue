<script lang="ts">
import { computed, onMounted, ref } from "vue";
import { useExerciseStore } from "../stores/exerciseStore";
import { formatDate } from "../utils";

export default {
  name: "CustomCalendar",
  setup() {
    const calendar = ref(null) as any;
    const store = useExerciseStore();
    const attributes = computed(() => store.calendarAttributes);

    const move = async (params: any) => {
      const { month, year } = params?.[0];
      await store.fetchCalendarExercises({ month, year });
    };

    onMounted(async () => {
      const today = new Date();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();
      await store.fetchCalendarExercises({ month, year });
    });

    const calendarDateClick = async (params: any) => {
      const { day, month, year } = params;
      const date = formatDate(new Date(year, month, day));

      await store.fetchExercises(date);
    };

    return {
      move,
      calendarDateClick,
      calendar,
      attributes: attributes,
    };
  },
};
</script>
<template>
  <VCalendar
    @did-move="move"
    @dayclick="calendarDateClick"
    ref="calendar"
    borderless
    transparent
    expanded
    title-position="left"
    show-weeknumbers="right"
    :attributes="attributes"
    :first-day-of-week="2"
  />
</template>
