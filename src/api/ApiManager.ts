import BaseApiManager from "./BaseApiManager";
import Actions from "redux-store/actions";
import store from "../redux-store/index";
import API_METHODS from "constants/ApiMethods";
import SERVER_RESPONSES from "constants/ServerResponses";
import axios from "axios";
import {
  clientSettings,
  onFailureFunction,
  onRejectFunction,
  onSuccessFunction,
} from "utils/types";

const ApiManager = (function () {
  function handleFormData(payload: any) {
    const data = new FormData();
    for (const key in payload) {
      data.append(key, payload[key]);
    }

    return data;
  }

  function generateRequest(
    payload: any,
    headers = {},
    method = API_METHODS.POST,
    methodName: string,
    useFormData = false
  ) {
    store.dispatch(Actions.requestStarted());

    const url = BaseApiManager.buildeUrl(methodName);
    const defaultHeaders = BaseApiManager.getHeaders(useFormData);
    const allHeaders = { ...headers, ...defaultHeaders };

    const settings: clientSettings = {
      method,
      url,
      headers: allHeaders,
      withCredentials: true,
    };

    if (method !== API_METHODS.GET) {
      let data = payload;
      if (useFormData) {
        data = handleFormData(data);
      }
      settings.data = data;
    } else {
      settings.params = payload;
    }
    return settings;
  }

  function execute(
    props: any,
    methodType: string,
    methodName: string,
    onSuccess: onSuccessFunction,
    onFailure: onFailureFunction,
    onReject: onRejectFunction
  ) {
    const settings = generateRequest(
      props.payload,
      props.headers,
      methodType,
      methodName,
      props?.useFormData
    );

    store.dispatch(Actions.setLoader(true));

    return axios(settings)
      .then((response) => {
        store.dispatch(Actions.requestEnded());
        typeof props.callback === "function" && props.callback(response);

        if (response.status === 200) {
          if (typeof response.data === "string") {
            response.data = JSON.parse(response.data);
          }

          if (response.data.status === SERVER_RESPONSES.SUCCESS) {
            onSuccess ? onSuccess(response.data) : BaseApiManager.onSuccess();
          } else if (response.data.status === SERVER_RESPONSES.REJECTED) {
            onReject
              ? onReject(response.data)
              : BaseApiManager.onReject(response.data);
          }
        }
        store.dispatch(Actions.setLoader(false));
        return response.data;
      })
      .catch((error) => {
        store.dispatch(Actions.requestEnded());

        BaseApiManager.onFailure(
          error?.response?.data?.message ?? error.message
        );
        typeof onFailure === "function" && onFailure(error.data.message);
        store.dispatch(Actions.setLoader(false));
      });
  }
  return {
    execute,
  };
})();

export default ApiManager;
