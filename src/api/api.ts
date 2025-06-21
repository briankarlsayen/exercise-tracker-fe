import { routeDeleteApi, routeGetApi, routePostApi, routeUpdateApi } from ".";
import type { IExerciseField } from "../stores/exerciseStore";

interface ICreateExercise extends IExerciseField {
  created_at?: string;
}

interface IUpdateExercise extends ICreateExercise {
  id: number;
}

export const loginApi = async (params: any) => {
  return await routePostApi({ apiRoute: "/auth/token/login/", params })
    .then((res) => {
      console.log("login res", res);
      return res;
    })
    .catch((error) => {
      console.log("error", error);
      return error;
    });
};
export const registerApi = async (params: any) => {
  return await routePostApi({ apiRoute: "/auth/users/", params })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

export const getExercises = async (params?: string) => {
  let route = "/exercises/";
  if (params) {
    route = route + params;
  }
  return await routeGetApi({ apiRoute: route })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

export const getCategories = async () => {
  return await routeGetApi({ apiRoute: "/categories/" })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

export const createExercise = async (params: ICreateExercise) => {
  return await routePostApi({ apiRoute: "/exercises/create", params })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

export const updateExercise = async (params: IUpdateExercise) => {
  return await routeUpdateApi({ apiRoute: `/exercises/${params?.id}/`, params })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

export const deleteExercise = async (id: number) => {
  return await routeDeleteApi({ apiRoute: `/exercises/${id}/` })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

export const getCalendarExercises = async ({
  month,
  year,
}: {
  month: number;
  year: number;
}) => {
  let route = `/exercises/calendar/?month=${month}&year=${year}`;
  return await routeGetApi({ apiRoute: route })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

export const getExerciseStats = async () => {
  let route = "/exercises/stats";
  return await routeGetApi({ apiRoute: route })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};
