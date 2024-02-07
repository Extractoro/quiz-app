import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";
import Form from "./components/Form";
import { createToken } from "./utils/createToken";
import { resetToken } from "./utils/resetToken";
import { dateDifferenceInHours } from "./utils/dateDifferenceInHours";
import Container from "./components/Container";
import List from "./components/List";

function App() {
  const [API_KEY] = useState(window.localStorage.getItem("api_key"));
  const [isActive, setIsActive] = useState(false);
  const [apiKeySession, setApiKeySession] = useState(
    window.localStorage.getItem("session_api_key")
  );
  const [categories, setCategories] = useState();

  if (!apiKeySession) {
    window.localStorage.setItem("session_api_key", new Date());
  }

  if (
    dateDifferenceInHours(
      new Date(window.localStorage.getItem("session_api_key"))
    ) >= 6
  ) {
    resetToken();
    window.localStorage.setItem("session_api_key", new Date());
  }

  useEffect(() => {
    window.localStorage.setItem("userOptions", []);
    axios
      .get("https://opentdb.com/api_category.php")
      .then((res) => {
        console.log(res);
        setCategories(res.data.trivia_categories);
        setSelectedCategory(res.data.trivia_categories[0].name);
        setSelectedCategoryId(res.data.trivia_categories[0].id);
        setApiKeySession(new Date());
      })
      .catch((err) => {
        toast.error(err);
      });
  }, []);

  const [numberOfQuestions, setNumberOfQuestions] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState();
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");

  const [data, setData] = useState(null);

  if (!API_KEY) {
    createToken();
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .get(
        `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${selectedCategoryId}&difficulty=${selectedDifficulty}&token=${API_KEY}`
      )
      .then((res) => {
        setData(res.data.results);
        console.log(res.data.results);
      })
      .catch((err) => {
        toast.error(err);
      });

    setIsActive(true);
  };

  return (
    <>
      <div className="app">
        <Container>
          {!isActive && (
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
          )}

          {isActive && data && <List data={data} />}
        </Container>
      </div>
      <Toaster />
    </>
  );
}

export default App;
