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

// Api to download pdf functionalty
export const downloadPdf = async (result) => {
  try {
    const response = await axios.post(
      serverUrl + "/api/pdf/generate-pdf",
      { result },
      {
        responseType: "blob",
        withCredentials: true,
      },
    );
    // blob for pdf type data
    const blob = new Blob([response.data], {
      type: "application/pdf",
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a"); // anchor tag a
    link.href = url;
    link.download = "NotesHub-AI.pdf";
    link.click();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    throw new Error("PDF download failed");
  }
};
