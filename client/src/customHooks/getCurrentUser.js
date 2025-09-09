// hooks/useCurrentUser.js
import { useEffect } from "react";
import { serverUrl } from "../App";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const useCurrentUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(serverUrl + "/api/user/getcurrentuser", {
          withCredentials: true,
        });
        dispatch(setUserData(res.data));
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [dispatch]);
};

export default useCurrentUser;
