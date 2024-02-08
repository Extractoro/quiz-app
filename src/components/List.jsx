import "../App.css";
import toast from "react-hot-toast";
import Item from "./Item";
import { useState } from "react";

const List = ({ data, setIsActive, isActive }) => {
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const handleSubmit = () => {
    const localOptions = JSON.parse(window.localStorage.getItem("userOptions"));

    if (localOptions.length !== data.length) {
      toast.error("Please, answer on all questions!");
      return;
    }

    for (const dataItem of data) {
      for (const userOption of localOptions) {
        if (
          dataItem.question === userOption.question &&
          dataItem.correct_answer === userOption.answer
        ) {
          setCorrectAnswers((prev) => prev + 1);
        }
      }
    }

    setIsActive(false);
  };

  return (
    <div className="list">
      {!isActive && (
        <>
          <p className="list-paragraph">
            Correct answers:{" "}
            <b>
              {correctAnswers}/{data.length}
            </b>
          </p>
          <p className="list-paragraph">
            Percentage of correct answers:{" "}
            <b>{((correctAnswers / data.length) * 100).toFixed(2)}%</b>
          </p>
        </>
      )}

      <p className="list-paragraph">
        Category: <b>{data && data[0].category}</b>
      </p>
      <p className="list-paragraph">
        Level: <b>{data && data[0].difficulty}</b>
      </p>
      <ul className="list">
        {data &&
          data.map(
            ({
              category,
              correct_answer,
              difficulty,
              incorrect_answers,
              question,
              type,
            }) => (
              <Item
                key={question}
                category={category}
                correct_answer={correct_answer}
                difficulty={difficulty}
                incorrect_answers={incorrect_answers}
                question={question}
                type={type}
                isActive={isActive}
              />
            )
          )}
      </ul>
      {isActive && (
        <button className="button-end" onClick={handleSubmit} type="submit">
          End Test
        </button>
      )}
    </div>
  );
};

export default List;
