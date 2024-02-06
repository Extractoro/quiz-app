import "../App.css";
import toast from "react-hot-toast";

const Form = ({
  categories,
  numberOfQuestions,
  setNumberOfQuestions,
  selectedCategory,
  setSelectedCategory,
  setSelectedCategoryId,
  selectedDifficulty,
  setSelectedDifficulty,
  handleSubmit,
}) => {
  const changeNumber = (e) => {
    if (e.target.value < 50) {
      setNumberOfQuestions(e.target.value);
    } else {
      toast.error("The number you wrote must not exceed 50");
    }
  };

  const handleCategoryChange = (e) => {
    const id =
      e.target.options[e.target.selectedIndex].getAttribute("data-key");
    setSelectedCategoryId(id);
    setSelectedCategory(e.target.value);
  };
  return (
    <>
      <div>
        <form
          className="form"
          action="submit"
          onSubmit={(e) => handleSubmit(e)}
        >
          <label className="form__label" htmlFor="question">
            Number of Questions:
            <input
              className="form__label-input"
              type="number"
              name="question"
              value={numberOfQuestions}
              onChange={(e) => changeNumber(e)}
              min={1}
              max={50}
              placeholder="Write a number"
            />
          </label>
          <label className="form__label" htmlFor="category">
            Select Category:
            <select
              className="form__label-select category"
              name="category"
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e)}
              id="category"
              size={5}
            >
              {categories &&
                categories.map(({ id, name }) => (
                  <option className="form__label-option" key={id} data-key={id}>
                    {name}
                  </option>
                ))}
            </select>
          </label>
          <label className="form__label" htmlFor="difficulty">
            Select Difficulty:
            <select
              className="form__label-select difficulty"
              name="difficulty"
              placeholder="Choose difficulty"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              id="category"
              size={3}
            >
              <option className="form__label-option">easy</option>
              <option className="form__label-option">medium</option>
              <option className="form__label-option">hard</option>
            </select>
          </label>

          <button className="form-button" type="submit">
            Create quiz
          </button>
        </form>
      </div>
    </>
  );
};

export default Form;
