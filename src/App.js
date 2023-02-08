import logo from "./logo.svg";
import Timeline from "react-visjs-timeline";
import "./App.css";
import moment from "moment";
import { options } from "./Components/Options";
import tlGroups from "./Data/Group";
import fakeBoardData from "./Data/Item";
import { useEffect, useState } from "react";
import CaseItem from "./Data/Case";

function App() {
  const [boardItems, setBoardItems] = useState();
  const [boardGroups, setBoardGroups] = useState([]);
  const [optionSetup, setOptionSetup] = useState(options);
  const [tableItems, setTableItems] = useState(CaseItem);
  const getData = () => {
    setBoardGroups(tlGroups);
    // setBoardItems(fakeBoardData);
  };
  const convert = () => {
    const status = ["Open", "Accept", "In-Progress", "Cancelled", "Complete"];
    const items = [];
    fakeBoardData.forEach((d) => {
      const s = status.filter((s) => s == d.status)[0];
      items.push({
        id: d.id,
        editable: true,
        start: d.start,
        end: d.end,
        duration: d.duration,
        content: d.content,
        className: s,
        group: d.group,
        status: d.status,
      });
    });
    setBoardItems(items);
  };
  useEffect(() => {
    convert();
    getData();
  }, []);

  function handleDragStart(event) {
    var dragSrcEl = event.target;
    event.dataTransfer.effectAllowed = "move";
    const caseObject = CaseItem.filter((c) => c.id.toString() == event.target.innerHTML)[0];
    var item = {
      id: caseObject.id,
      type: "range",
      content: caseObject.title,
      start: "",
      end: "",
    };
    event.dataTransfer.setData("text", JSON.stringify(item));
    // setBoardItems([...boardItems, item]);
  }

  const customTimes = {
    marker: moment(),
  };

  function selectHandler(props) {
    console.log("selected");
    console.log(props);
  }

  const T = ({ data }) => {
    return (
      <table style={{ fontSize: "20px" }}>
        <thead>
          <tr>
            <td>Id</td>
            <td>Case Title</td>
            <td>Case No</td>
            <td>Created On</td>
            <td>Duration</td>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((row) => (
              <tr onDragStart={handleDragStart} key={row.id}>
                <td>{row.id}</td>
                <td>{row.title}</td>
                <td>{row.caseno}</td>
                <td>{row.start}</td>
                <td>{row.duration}</td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="App">
      <div className="timeline">
        <Timeline doubleClickHandler={(e) => console.log(e)} selectHandler={selectHandler} options={options} items={boardItems} groups={boardGroups} customTimes={customTimes} />
      </div>
      <br />
      <T data={tableItems} />
    </div>
  );
}

export default App;
