import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";

// Api to get current user
export const getCurrentUser = async (dispatch) => {
  try {
    const result = await axios.get(serverUrl + "/api/user/currentuser", {
      withCredentials: true,
    });
    // console.log(result.data);
    dispatch(setUserData(result.data)); // set data
  } catch (err) {
    console.log(err);
  }
};

// api to generate notes
export const generateNotes = async (payload) => {
  try {
    const result = await axios.post(
      serverUrl + "/api/notes/generate-notes",
      payload,
      { withCredentials: true },
    );
    console.log(result.data);
    return result.data;
  } catch (err) {
    console.log(err);
  }
};
