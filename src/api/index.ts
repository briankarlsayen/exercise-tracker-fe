import { instance } from "./instance";

interface PostApiResponse {
  message?: string;
  success?: boolean;
}

interface PutApiProps {
  apiRoute: string;
  params?: any;
}

interface PostApiProps {
  apiRoute: string;
  params?: any;
}

interface GetApiProps {
  apiRoute: string;
}

const getHeader = async () => {
  const data = localStorage.getItem("auth");
  return data ? "Token " + data : "";
};

export const routePostApi = async ({
  apiRoute,
  params,
}: PostApiProps): Promise<PostApiResponse> => {
  try {
    const headers = { Authorization: await getHeader() };
    const response = await instance.post(apiRoute, params, {
      headers,
    });
    return { ...response, success: true };
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const routeGetApi = async ({ apiRoute }: GetApiProps) => {
  try {
    const headers = { Authorization: await getHeader() };

    const response = await instance.get(apiRoute, { headers });
    return { ...response, success: true };
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const routeUpdateApi = async ({ apiRoute, params }: PutApiProps) => {
  try {
    const headers = { Authorization: await getHeader() };

    const response = await instance.put(apiRoute, params, { headers });
    return { ...response, success: true };
  } catch (error: any) {
    return error?.response?.data;
  }
};
