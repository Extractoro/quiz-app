import { useState } from "react";
import toast from "react-hot-toast";

const Item = ({
  category,
  correct_answer,
  difficulty,
  incorrect_answers,
  question,
  type,
}) => {
  const [selected, setSelected] = useState(null);
  // const [userOptions, setUserOptions] = useState([]);
  const answersMultiple = [...incorrect_answers, correct_answer].sort();
  const answersBoolean = ["false", "true"];

  const onChange = (i) => {
    setSelected((prev) => (i === prev ? null : i));
  };

  const shouldUpdate = (answers) => {
    for (const answer of answers) {
      if (answer.question === question) {
        const filtered = answers.filter(
          (answer) => answer.question !== question
        );

        console.log(filtered);

        window.localStorage.setItem("userOptions", JSON.stringify(filtered));
      } else {
        return;
      }
    }
  };

  const submitAnswer = (question) => {
    if (
      (answersMultiple[selected] || answersBoolean[selected] || "nothing") ===
      "nothing"
    ) {
      toast.error();
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
  };

  return (
    <li>
      <p>{category}</p>
      <p>{difficulty}</p>
      <h2>{question}</h2>

      <div className="">
        {type === "multiple"
          ? answersMultiple.map((answer, i) => (
              <label key={answer}>
                <input
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
                  type="checkbox"
                  checked={i === selected}
                  onChange={() => onChange(i)}
                />
                {answer}
              </label>
            ))}
      </div>

      <button onClick={() => submitAnswer(question)}>Submit</button>
    </li>
  );
};

export default Item;
