import "../App.css";
import { useState } from "react";
import toast from "react-hot-toast";

const Item = ({
  correct_answer,
  incorrect_answers,
  question,
  type,
  isActive,
}) => {
  const [selected, setSelected] = useState(null);
  const answersMultiple = [...incorrect_answers, correct_answer].sort();
  const answersBoolean = ["false", "true"];

  const onChange = (i) => {
    setSelected((prev) => (i === prev ? null : i));
  };

  const shouldUpdate = (answers) => {
    const filtered = answers.filter((answer) => answer.question !== question);
    window.localStorage.setItem("userOptions", JSON.stringify(filtered));
  };

  const submitAnswer = (question) => {
    if (
      (answersMultiple[selected] || answersBoolean[selected] || "nothing") ===
      "nothing"
    ) {
      toast.error("You must select one answer (your previous answer saved)");
      return;
    }

    let answers = null;
    if (window.localStorage.getItem("userOptions").length !== 0) {
      answers = JSON.parse(window.localStorage.getItem("userOptions"));
    }

    if (answers) {
      shouldUpdate(answers);
    }

    const obj = [
      {
        question,
        answer:
          answersMultiple[selected] || answersBoolean[selected] || "nothing",
      },
    ];

    if (window.localStorage.getItem("userOptions").length === 0) {
      window.localStorage.setItem("userOptions", JSON.stringify(obj));
    } else {
      const opts = JSON.parse(window.localStorage.getItem("userOptions"));
      opts.push(...obj);
      window.localStorage.setItem("userOptions", JSON.stringify(opts));
    }

    toast.success("Your answers saved successfully!");
  };

  return (
    <li className="list-item">
      <h2 className="item-title">{question}</h2>

      <div className="item-answers">
        {type === "multiple"
          ? answersMultiple.map((answer, i) => (
              <label key={answer} className="item-label">
                <input
                  disabled={!isActive}
                  type="checkbox"
                  checked={i === selected}
                  onChange={() => onChange(i)}
                />
                {answer}
              </label>
            ))
          : answersBoolean.map((answer, i) => (
              <label key={answer}>
                <input
                  disabled={!isActive}
                  type="checkbox"
                  checked={i === selected}
                  onChange={() => onChange(i)}
                />
                {answer}
              </label>
            ))}
      </div>
      {!isActive && (
        <p className="item-correct">Correct answer: {correct_answer}</p>
      )}

      {isActive && (
        <button className="item-submit" onClick={() => submitAnswer(question)}>
          Submit
        </button>
      )}
    </li>
  );
};

export default Item;
