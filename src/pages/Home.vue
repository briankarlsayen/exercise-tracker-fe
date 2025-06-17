<script lang="ts">
import { onMounted, ref } from "vue";
import ExerciseSection from "../components/ExerciseSection.vue";
import CustomCalendar from "../components/CustomCalendar.vue";
import DashboardCard from "../components/DashboardCard.vue";
import { getExercises } from "../api/api";
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
  name: "Homepage",
  components: {
    ExerciseSection,
    CustomCalendar,
    DashboardCard,
  },
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

    const exerciseData = ref<IExerciseDetails>({
      date: "",
      exercises: [],
    });

    onMounted(async () => {
      try {
        const currDate = formatDate(new Date());
        const res = await getExercises(`?created_at=${currDate}`);

        if (res?.success) {
          exerciseData.value = {
            date: currDate,
            exercises: res.data,
          };
        }
      } catch (error) {
        console.log("error: ", error);
      }
    });

    return {
      exData,
      attributes,
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
        <ExerciseSection
          :date="exerciseData.date"
          :exercises="exerciseData.exercises"
        />
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
