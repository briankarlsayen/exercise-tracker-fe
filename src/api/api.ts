import { routeGetApi, routePostApi } from ".";

interface ICreateExercise {
  name: string;
  category?: number;
  duration?: number;
  intensity?: number;
  created_at: string;
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
