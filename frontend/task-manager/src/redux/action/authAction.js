import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { LOGIN, LOGIN_FAILURE, LOGIN_SUCCESS } from "./type";

// let url = `${process.env.REACT_APP_BASE_URL}api/auth`;
export const loginRequest = (payload) => async (dispatch) => {
  dispatch({
    type: LOGIN,
  });
  try {
    const res = await axios.post(
      `http://localhost:5000/login`,
      payload.formInput
    );
    if (res.status === 200) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.data,
      });
      // payload.navigate("/task");
      Cookies.set("task||userInfo", JSON.stringify(res.data.data), {
        expires: 30,
      });
      toast.success("Logged In!");
      payload.callback();
    }
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
    });
    toast.error("An error occured!");
  }
};
