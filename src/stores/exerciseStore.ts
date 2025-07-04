import { defineStore } from "pinia";
import {
  getCalendarExercises,
  getExercises,
  getExerciseStats,
} from "../api/api";

export interface IExerciseField {
  name: string;
  intensity?: number;
  duration?: number;
  category?: number;
}

interface IFetchCalendarExercises {
  month: number;
  year: number;
}

type FormType = "add" | "edit";

export interface IExercise {
  id: number;
  name: string;
  intensity?: number;
  duration?: number;
  category?: string;
}

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

export const useExerciseStore = defineStore("exercises", {
  state: () => ({
    exercises: [] as IExercise[],
    date: "" as string,
    form: {
      type: "add" as FormType,
      field: {} as IExercise,
    },
    calendarAttributes: [] as any[],
    stats: {
      duration: "",
      streak: "",
      progress: "",
    },
    calendarExercises: [],
  }),
  actions: {
    async fetchExercises(params: string) {
      try {
        const res = await getExercises(`?created_at=${params}`);

        if (res?.success) {
          this.exercises = res.data;
          this.date = params;
          return;
        }
      } catch (error) {
        console.log("error: ", error);
      }
    },
    async fetchCalendarExercises({ month, year }: IFetchCalendarExercises) {
      try {
        const res = await getCalendarExercises({ month, year });

        if (res?.success) {
          this.calendarAttributes = formatCalendar(res?.data?.calendar_dates);
          return res;
        }
      } catch (error) {
        console.log("error: ", error);
      }
    },
    async fetchExerciseStats() {
      try {
        const res = await getExerciseStats();

        if (res?.success) {
          this.stats = {
            duration: res?.data?.exercises_duration,
            streak: res?.data?.streak,
            progress: res?.data?.exercise_days_done,
          };
        }
      } catch (error) {
        console.log("error: ", error);
      }
    },
    editExercise(props: IExercise) {
      this.form.type = "edit";
      this.form.field = props;
    },
    addExercise() {
      this.form.type = "add";
    },
    clearForm() {
      console.log("clear");
      this.form.field = {
        id: 0,
        name: "",
      };
    },
  },
});
