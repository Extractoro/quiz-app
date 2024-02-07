import Item from "./Item";

const List = ({ data }) => {
  return (
    <div>
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
              />
            )
          )}
      </ul>
    </div>
  );
};

export default List;
