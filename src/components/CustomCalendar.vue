<script lang="ts">
import { onMounted, ref } from "vue";
import { getCalendarExercises } from "../api/api";
import { useExerciseStore } from "../stores/exerciseStore";
import { formatDate } from "../utils";

export default {
  name: "CustomCalendar",
  setup() {
    const attributes = ref();
    const calendar = ref(null) as any;
    const store = useExerciseStore();

    const move = async (params: any) => {
      const { month, year } = params[0];
      await getCalendarDates({ month, year });
    };

    const formatCalendar = (list: any[]) => {
      return list?.map((exercise: any) => {
        const doneHighlight = {
          color: "green",
          fillMode: "solid",
        };
        const emptyHighlist = {
          color: "gray",
          fillMode: "outline",
        };

        return {
          highlight: exercise?.isDone ? doneHighlight : emptyHighlist,
          dates: new Date(exercise?.date).toISOString().split("T")[0],
        };
      });
    };

    const getCalendarDates = async ({ month, year }: any) => {
      try {
        const res = await getCalendarExercises({ month, year });
        if (res?.success) {
          const res1 = formatCalendar(res?.data?.calendar_dates);
          attributes.value = res1;
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    onMounted(async () => {
      const today = new Date();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();
      await getCalendarDates({ month, year });
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
      attributes,
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
