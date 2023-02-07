import logo from "./logo.svg";
import "./App.css";
import Timeline from "react-visjs-timeline";
import moment from "moment";
import tlGroups from "./Data/Group";
import fakeBoardData from "./Data/Item";
import { options } from "./Components/Options";
import { useState } from "react";
function App() {
  const [boardItems, setBoardItems] = useState(fakeBoardData);
  const [boardGroups, setBoardGroups] = useState(tlGroups);
  function handleDragStart(event) {
    var dragSrcEl = event.target;

    event.dataTransfer.effectAllowed = "move";
    var itemType = event.target.innerHTML.split("-")[1].trim();
    var item = {
      id: new Date(),
      type: itemType,
      content: event.target.innerHTML.split("-")[0].trim(),
    };

    var isFixedTimes =
      event.target.innerHTML.split("-")[2] &&
      event.target.innerHTML.split("-")[2].trim() == "fixed times";
    if (isFixedTimes) {
      item.start = new Date();
      item.end = new Date(1000 * 60 * 10 + new Date().valueOf());
    }
    event.dataTransfer.setData("text", JSON.stringify(item));
  }

  function handleObjectItemDragStart(event) {
    var dragSrcEl = event.target;

    event.dataTransfer.effectAllowed = "move";
    var objectItem = {
      content: "objectItemData",
      target: "item",
    };
    event.dataTransfer.setData("text", JSON.stringify(objectItem));
  }

  const customTimes = {
    marker: moment(),
  };
  function selectHandler(props) {
    console.log("selected");
    console.log(props);
  }

  return (
    <div className="App">
      <Timeline
        selectHandler={selectHandler}
        options={options}
        items={boardItems}
        groups={boardGroups}
        customTimes={customTimes}
      />
    </div>
  );
}

export default App;
