import axios from "axios";
import {
  getRequest,
  getSuccess,
  getFailed,
  getError,
} from "./applicationSlice";

const REACT_APP_BASE_URL = "http://localhost:5000";

export const applyForApplication =
  (id, applicationType) => async (dispatch) => {
    dispatch(getRequest());

    try {
      // Fetch list of teachers
      const teachersResult = await axios.get(
        `${REACT_APP_BASE_URL}/GetAllTeachersName`
      );

      if (teachersResult.data.message) {
        dispatch(getFailed(teachersResult.data.message));
        return; // Stop execution if fetching teachers failed
      }

      // Apply for application
      const result = await axios.get(
        `${REACT_APP_BASE_URL}/ApplicationList/${id}`
      );

      if (result.data.message) {
        dispatch(getFailed(result.data.message));
      } else {
        dispatch(getSuccess(result.data));
      }
    } catch (error) {
      dispatch(getError(error));
    }
  };
