import axios from "axios";
import toast from "react-hot-toast";

export const resetToken = (API_KEY) => {
  axios
    .post(`https://opentdb.com/api_token.php?command=reset&token=${API_KEY}`)
    .then(() => {
      window.localStorage.setItem("api_key", "");
    })
    .catch((err) => {
      toast.error(err);
    });
};
