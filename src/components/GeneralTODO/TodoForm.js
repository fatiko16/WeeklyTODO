import React from "react";

function TodoForm() {
  return (
    <form>
      <div>
        <label htmlFor="description">
          <input id="description" type="text" /> Description
        </label>
      </div>
    </form>
  );
}

export default TodoForm;
