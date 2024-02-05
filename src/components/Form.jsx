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
    <div>
      <form action="submit" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="question">
          Number of Questions:
          <input
            type="number"
            name="question"
            value={numberOfQuestions}
            onChange={(e) => changeNumber(e)}
            min={1}
            max={50}
            placeholder="Write a number"
          />
        </label>
        <label htmlFor="category">
          Select Category:
          <select
            name="category"
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e)}
            id="category"
          >
            {categories &&
              categories.map(({ id, name }) => (
                <option key={id} data-key={id}>
                  {name}
                </option>
              ))}
          </select>
        </label>
        <label htmlFor="difficulty">
          Select Difficulty:
          <select
            name="difficulty"
            placeholder="Choose difficulty"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            id="category"
          >
            <option>easy</option>
            <option>medium</option>
            <option>hard</option>
          </select>
        </label>

        <button type="submit">Create quiz</button>
      </form>
    </div>
  );
};

export default Form;
