/* eslint-disable */
// import { Logger } from './Logger'
import { common } from "../config";
import axios from "axios";

let timeout = 5000;

class Connector {
  /**
   * Wrapper for Axios GET calls
   *
   * @method get
   * @static
   * @param {string} route, the API route
   * @param {object} params, any parameters passed to the call
   * @param {function} callback, a callback function
   */
  static get(route, params, callback) {
    if (params.timeout) {
      timeout = params.timeout;
    }

    return axios
      .get(route, {
        params,
        timeout
      })
      .then(res => {
        // Logger._log('Connector GET', route, params, res)

        if ("function" === typeof callback) {
          return callback(res);
        }

        return res;
      })
      .catch(e => {
        // Logger._error('Connector GET Error', route, params, e)

        // uBlock doesn't allow us to grab the user's IP
        if (route.includes("ipify")) {
          if ("function" === typeof callback) {
            return callback();
          }
        } else {
          return e;
        }
      });
  }

  /**
   * Wrapper for Axios POST calls
   *
   * @method post
   * @static
   * @param {string} route, the API route
   * @param {object} body, key value pairs passed to the call
   * @param {function} callback, a callback function
   */
  static post(route, body, callback) {
    if (body.timeout) {
      timeout = body.timeout;
    }

    return axios
      .post(route, body, { timeout })
      .then(res => {
        if (res.data.success) {
          // Logger._log('Connector POST', route, body, res)
        } else {
          // Logger._log('Connector POST Error', res)
        }

        if ("function" === typeof callback) {
          return callback(res);
        }

        return res;
      })
      .catch(e => {
        // Logger._log('Connector POST Error', route, body, e)

        if ("function" === typeof callback) {
          return callback(e);
        }

        return e;
      });
  }
}

export default Connector;
