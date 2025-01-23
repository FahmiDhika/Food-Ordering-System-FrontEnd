import axios, { AxiosError } from "axios";
import { BASE_API_URL } from "@/global";

const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
});

export const get = async (url: string, token: string) => {
  try {
    let headers: any = {
      Authorization: `Bearer ${token}`,
    };
    let result = await axios.get(url, {
      headers,
    });
    return {
      status: true,
      data: result.data,
    };
  } catch (error) {
    const err = error as AxiosError<{ message: string; code: number }>;
    if (err.response) {
      console.log(err.response.data.message);
      return {
        status: false,
        message: `${err.code}: something wrong`,
      };
    }
    console.log(err.response);
    return {
      status: false,
      message: `Something were wrong: ${error}`,
    };
  }
};
