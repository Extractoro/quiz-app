import toast from "react-hot-toast";
import Item from "./Item";

const List = ({ data, setIsActive, isActive }) => {
  const handleSubmit = () => {
    console.log(data);
    const localOptions = JSON.parse(window.localStorage.getItem("userOptions"));

    if (localOptions.length !== data.length) {
      toast.error("Please, answer on all questions!");
      return;
    }

    setIsActive(false);
  };

  return (
    <div>
      <p>{data[0].category}</p>
      <p>{data[0].difficulty}</p>
      <ul>
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
      <button onClick={handleSubmit} type="submit">
        End Test
      </button>
    </div>
  );
};

export default List;
