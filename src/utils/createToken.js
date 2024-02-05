import axios from "axios";
import toast from "react-hot-toast";

export const createToken = () => {
  axios
    .post("https://opentdb.com/api_token.php?command=request")
    .then((res) => {
      window.localStorage.setItem("api_key", res.data.token);
    })
    .catch((err) => {
      toast.error(err);
    });
};
