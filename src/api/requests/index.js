import ApiManager from "api/ApiManager";
import API_METHODS from "constants/ApiMethods";

import store from "redux-store/index.ts";
import Actions from "redux-store/actions/index.ts";
import LOCAL_STORAGE_KEYS from "constants/LocalStorage";
import { chekcForJWTexp, parseJWT } from "utils/functions";

class ApiRequests {
  #accessTokenHeaders = async () => {
    let token = store.getState()?.tokens.accessToken;
    const isExpired = chekcForJWTexp(token);

    if (isExpired) {
      function onSuccess(data) {
        token = data.access_token;
      }

      await this.refreshToken({ onSuccess });
    }

    return { Authorization: `Bearer ${token}` };
  };

  #refreshTokenHeaders = () => {
    const token = store.getState()?.tokens.refreshToken;
    return { Authorization: `Bearer ${token}` };
  };

  Init = async (props = {}) => {
    function onSuccess(res) {
      store.dispatch(Actions.setInit(res.body));

      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }

    props.headers = await this.#accessTokenHeaders();

    return ApiManager.execute(props, API_METHODS.GET, "initcms", onSuccess);
  };

  addNewText = async (props = {}) => {
    function onSuccess(res) {
      store.dispatch(Actions.addNewText(res.body));

      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await this.#accessTokenHeaders();

    return ApiManager.execute(props, API_METHODS.POST, "texts", onSuccess);
  };

  updateText = async (props = {}) => {
    function onSuccess(res) {
      store.dispatch(Actions.addNewText(props.payload));

      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }

    props.headers = await this.#accessTokenHeaders();

    return ApiManager.execute(props, API_METHODS.PUT, "texts", onSuccess);
  };

  deleteText = async (props = {}) => {
    function onSuccess(res) {
      store.dispatch(Actions.deleteText(props.payload));

      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await this.#accessTokenHeaders();

    return ApiManager.execute(props, API_METHODS.DELETE, "texts", onSuccess);
  };

  addImage = async (props = {}) => {
    function onSuccess(res) {
      store.dispatch(Actions.addImage(res.body));

      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await this.#accessTokenHeaders();

    return ApiManager.execute(props, API_METHODS.POST, "image", onSuccess);
  };

  login = async (props = {}) => {
    function onSuccess(res) {
      store.dispatch(Actions.setAccessToken(res.body.access_token));
      store.dispatch(Actions.setRefreshToken(res.body.refresh_token));
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.REFRESH_TOKEN,
        res.body.refresh_token
      );
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }

    return ApiManager.execute(props, API_METHODS.POST, "login", onSuccess);
  };

  refreshToken = async (props = {}) => {
    function onSuccess(res) {
      store.dispatch(Actions.setAccessToken(res.body.access_token));
      if (res.body?.refresh_token) {
        store.dispatch(Actions.setRefreshToken(res.body.refresh_token));
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.REFRESH_TOKEN,
          res.body.refresh_token
        );
      }

      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }

    props.headers = this.#refreshTokenHeaders();

    return ApiManager.execute(props, API_METHODS.GET, "refresh", onSuccess);
  };

  addNewLanguage = async (props = {}) => {
    function onSuccess(res) {
      store.dispatch(Actions.addGeneralInfo(res.body));

      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }

    props.headers = await this.#accessTokenHeaders();

    return ApiManager.execute(props, API_METHODS.POST, "languages", onSuccess);
  };

  updateLanguage = async (props = {}) => {
    function onSuccess(res) {
      store.dispatch(Actions.updateGeneralInfo(res.body));

      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }

    props.headers = await this.#accessTokenHeaders();

    return ApiManager.execute(props, API_METHODS.PUT, "languages", onSuccess);
  };

  deleteLanguage = async (props = {}) => {
    function onSuccess(res) {
      store.dispatch(Actions.removeGeneralInfo(res.body));

      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }

    props.headers = await this.#accessTokenHeaders();

    return ApiManager.execute(
      props,
      API_METHODS.DELETE,
      "languages",
      onSuccess
    );
  };
  updateGeneralInfo = async (props = {}) => {
    function onSuccess(res) {
      store.dispatch(Actions.updateGeneralInfo(res.data));

      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }

    props.headers = await this.#accessTokenHeaders();

    return ApiManager.execute(props, API_METHODS.PUT, "generalinfo", onSuccess);
  };

  addGeneralInfo = async (props = {}) => {
    function onSuccess(res) {
      store.dispatch(Actions.addGeneralInfo(res.body));

      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }

    props.headers = await this.#accessTokenHeaders();

    return ApiManager.execute(
      props,
      API_METHODS.POST,
      "generalinfo",
      onSuccess
    );
  };

  deleteGeneralInfo = async (props = {}) => {
    function onSuccess(res) {
      store.dispatch(Actions.removeGeneralInfo(res.body));

      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }

    props.headers = await this.#accessTokenHeaders();

    return ApiManager.execute(
      props,
      API_METHODS.DELETE,
      "generalinfo",
      onSuccess
    );
  };

  addMedia = async (props = {}) => {
    function onSuccess(res) {
      store.dispatch(Actions.addMedia(res.body));

      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }

    props.headers = await this.#accessTokenHeaders();

    return ApiManager.execute(props, API_METHODS.POST, "media", onSuccess);
  };

  removeMedia = async (props = {}) => {
    function onSuccess(res) {
      store.dispatch(Actions.removeMedia(props.payload.id));

      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }

    props.headers = await this.#accessTokenHeaders();

    return ApiManager.execute(props, API_METHODS.DELETE, "media", onSuccess);
  };

  uploadClientsFile = async (props = {}) => {
    function onSuccess(res) {
      store.dispatch(Actions.setPendingClients(res.body.pending_clients));

      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }

    props.headers = await this.#accessTokenHeaders();

    return ApiManager.execute(props, API_METHODS.POST, "clients", onSuccess);
  };

  getLinkForPendingClients = async (props = {}) => {
    function onSuccess(res) {
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }

    props.headers = await this.#accessTokenHeaders();

    return ApiManager.execute(
      props,
      API_METHODS.GET,
      "linkpendingclients",
      onSuccess
    );
  };

  getLinkForAvailableClients = async (props = {}) => {
    function onSuccess(res) {
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }

    props.headers = await this.#accessTokenHeaders();

    return ApiManager.execute(
      props,
      API_METHODS.GET,
      "linkavailableclients",
      onSuccess
    );
  };
  getPendingClients = async (props = {}) => {
    function onSuccess(res) {
      store.dispatch(Actions.setPendingClients(res.body.pending_clients));

      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }

    props.headers = await this.#accessTokenHeaders();

    return ApiManager.execute(
      props,
      API_METHODS.GET,
      "pendingclients",
      onSuccess
    );
  };

  getAvailableClients = async (props = {}) => {
    function onSuccess(res) {
      store.dispatch(Actions.setAvailableClients(res.body.clients));

      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }

    props.headers = await this.#accessTokenHeaders();

    return ApiManager.execute(
      props,
      API_METHODS.GET,
      "availableclients",
      onSuccess
    );
  };

  mergeClients = async (props = {}) => {
    function onSuccess(res) {
      store.dispatch(Actions.setPendingClients([]));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }

    props.headers = await this.#accessTokenHeaders();

    return ApiManager.execute(
      props,
      API_METHODS.GET,
      "mergeclients",
      onSuccess
    );
  };
}

const Api = new ApiRequests();
Object.freeze(Api);
export default Api;
