import "./App.css";
import { useState } from "react";

export default function App() {
  const [newItem, setNewItem] = useState("");
  const [lists, setLists] = useState([]);

  const handleCheckbox = (id, completed) => {
    setLists((currentLists) => {
      return currentLists.map((list) => {
        if (list.id === id) {
          return {
            ...list,
            completed: !completed
          };
        }
        return list;
      });
    });
  };

  const handleAddItem = (e) => {
    e.preventDefault();

    if (newItem.trim() === "") return;

    let repeatedItem = false;
    lists.forEach((list) => {
      if (newItem.trim().toLowerCase() === list.item) repeatedItem = true;
    });

    repeatedItem === false &&
      setLists((currentLists) => {
        return [
          ...currentLists,
          {
            id: lists.length === 0 ? 0 : lists[lists.length - 1].id + 1,
            item: newItem.trim().toLowerCase(),
            completed: false
          }
        ];
      });

    setNewItem("");
    e.target.firstChild.value = "";
  };

  const handleDelete = (id) => {
    setLists((currentLists) => {
      return currentLists.filter((list) => list.id !== id);
    });
  };

  return (
    <div className="App">
      <form onSubmit={handleAddItem}>
        <input
          type="text"
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add item"
        />
        <button type="submit">Add</button>
      </form>
      <br />
      {
        <ul className="lists">
          {lists.length === 0 && "No item"}
          {lists.map((list) => {
            return (
              <li key={list.id} className="list">
                <label>
                  <input
                    onChange={() => handleCheckbox(list.id, list.completed)}
                    type="checkbox"
                  />
                  <span>id=({list.id})</span>
                  {list.item + " " + list.completed}
                </label>
                {list.completed && (
                  <button onClick={() => handleDelete(list.id)}>delete</button>
                )}
              </li>
            );
          })}
          <br />
          <br />
          <button onClick={() => setLists([])}>clear list</button>
        </ul>
      }
    </div>
  );
}