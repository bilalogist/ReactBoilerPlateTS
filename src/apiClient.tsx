import axios, { AxiosRequestConfig } from "axios";
import { SnackBar } from "./components";

type apiClientObjectType = {
  endpoint: string;
  type: "get" | "put" | "post" | "delete" | "patch";
  data?: object;
  isPrivate?: boolean;
  params?: object;
  isBlob?: boolean;
  noRedirect?: boolean;
  headers?: object;
};

type responseType = {
  data: any;
  error: boolean;
  errors: object;
};

type configType = {
  method: string;
  url: string;
  responseType?: string;
  data?: any;
  headers?: any;
  params?: any;
};
const API_URL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_API_URL
    : window.location.origin;

const apiClient = async ({
  endpoint,
  type,
  data,
  isPrivate,
  params,
  isBlob,
  noRedirect = false,
  headers,
}: apiClientObjectType) => {
  const response: responseType = {
    data: null,
    error: false,
    errors: {},
  };

  // const config: configType = {
  const config: AxiosRequestConfig = {
    method: type,
    url: API_URL + "/api" + endpoint,
    params,
    data,
    ...(isBlob && { responseType: "blob" }),
    ...(isPrivate && {
      headers: {
        authorization: "getToken()",
      },
    }),
  };
  // if (headers) config.headers = {...config?.headers, ...headers};
  try {
    const res = await axios(config);
    response.data = res.data;
    response.error = false;
  } catch (error: any) {
    if (isBlob) {
      // When the response type is set to BLOB response data attribute is set to blob object
      // here we are converting blob to json object incase of error to read error message
      error.response.data = JSON.parse(await error.response.data.text());
    }

    if (error.isAxiosError && !error.response) {
      SnackBar("error", "🤷 Oops! Server not responding.");
    } else if (error.response.status === 401) {
      // logout();
    } else if (error.response.status >= 500) {
      SnackBar("error", "Internal server error");
    } else if (error.response.status === 404) {
      SnackBar("error", "Not Found");
      // if (!noRedirect) {
      //     history.push('/app/not-found');
      // }
    } else if (error.response.status === 403) {
      SnackBar("error", "Not Authorized");
      // if (!noRedirect) {
      //     history.push('/app/dashboard');
      // }
    } else {
      SnackBar("error", error.response.data.message);
    }
    response.error = true;
    response.errors = error.response.data.errors
      ? error.response.data.errors
      : [];
  }
  return response;
};
``;
export default apiClient;
