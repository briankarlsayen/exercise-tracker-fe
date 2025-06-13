<script lang="ts">
import { ref } from "vue";

const getCalendarDates = ({ month, year }: { month: number; year: number }) => {
  const today = new Date();
  const dateList = [];
  const daysInMonth = new Date(year, month, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const currentDate = new Date(year, month - 1, day + 1);
    if (currentDate < today) {
      dateList.push(currentDate.toISOString().split("T")[0]); // format: YYYY-MM-DD
    }
  }

  return dateList;
};

export default {
  name: "CustomCalendar",
  setup() {
    const exData = [
      "2025-06-13",
      "2025-06-11",
      "2025-06-12",
      "2025-06-06",
      "2025-06-01",
    ];
    const calendarMonth = ref(6);
    const calendarYear = ref(2025);

    const dateList = getCalendarDates({
      month: calendarMonth?.value,
      year: calendarYear?.value,
    });

    const exList = exData.map((e) => {
      const convertDate = new Date(e);
      const year = convertDate.getFullYear();
      const month = convertDate.getMonth();
      const day = convertDate.getDate();

      const data = {
        highlight: {
          color: "green",
          fillMode: "solid",
        },
        dates: new Date(year, month, day),
      };
      return data;
    });
    const pastList = dateList.map((e) => {
      const convertDate = new Date(e);
      const year = convertDate.getFullYear();
      const month = convertDate.getMonth();
      const day = convertDate.getDate();

      const data = {
        highlight: {
          color: "gray",
          fillMode: "outline",
        },

        dates: new Date(year, month, day),
      };
      return data;
    });
    const combinedList = pastList.concat(exList);
    const attributes = ref(combinedList);

    return {
      exData,
      attributes,
    };
  },
};
</script>
<template>
  <VCalendar
    borderless
    transparent
    expanded
    title-position="left"
    show-weeknumbers="right"
    :attributes="attributes"
  />
</template>
