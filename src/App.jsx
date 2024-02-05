import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";
import Form from "./components/Form";
import { createToken } from "./utils/createToken";
import { resetToken } from "./utils/resetToken";

function App() {
  const [API_KEY] = useState(window.localStorage.getItem("api_key"));
  const [categories, setCategories] = useState();

  useEffect(() => {
    axios
      .get("https://opentdb.com/api_category.php")
      .then((res) => {
        console.log(res);
        setCategories(res.data.trivia_categories);
        setSelectedCategory(res.data.trivia_categories[0].name);
        setSelectedCategoryId(res.data.trivia_categories[0].id);
      })
      .catch((err) => {
        toast.error(err);
      });
  }, []);

  const [numberOfQuestions, setNumberOfQuestions] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState();
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");

  if (!API_KEY) {
    createToken();
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(
      `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${selectedCategoryId}&difficulty=${selectedDifficulty}&token=${API_KEY}`
    );

    axios
      .get(
        `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${selectedCategoryId}&difficulty=${selectedDifficulty}&token=${API_KEY}`
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <>
      <div>
        <Form
          categories={categories}
          numberOfQuestions={numberOfQuestions}
          setNumberOfQuestions={setNumberOfQuestions}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedDifficulty={selectedDifficulty}
          setSelectedDifficulty={setSelectedDifficulty}
          handleSubmit={handleSubmit}
          setSelectedCategoryId={setSelectedCategoryId}
        />
      </div>
      <Toaster />
    </>
  );
}

export default App;
