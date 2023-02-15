import logo from "./logo.svg";
import Timeline from "react-visjs-timeline";
import "./App.css";
import moment from "moment";
// import { options } from "./Components/Options";
import tlGroups from "./Data/Group";
import fakeBoardData from "./Data/Item";
import { useEffect, useState } from "react";
import CaseItem from "./Data/Case";

function App() {
  const [boardItems, setBoardItems] = useState();
  const [boardGroups, setBoardGroups] = useState([]);
  const [dragItem, setDragItem] = useState({});
  // const [optionSetup, setOptionSetup] = useState(options);
  const [tableItems, setTableItems] = useState(CaseItem);
  const status = ["Open", "Accept", "In-Progress", "Cancelled", "Complete"];
  const getData = () => {
    setBoardGroups(tlGroups);
    // setBoardItems(fakeBoardData);
  };
  const convert = () => {
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
  }, []);
  useEffect(() => {
    getData();
  }, []);

  const getStartDate = () => {
    let startArr = [];
    fakeBoardData.forEach((item) => {
      startArr.push(item.start);
    });
    return Math.min(...startArr);
  };

  const getEndDate = () => {
    let startArr = [];
    fakeBoardData.forEach((item) => {
      startArr.push(item.end);
    });
    return Math.max(...startArr);
  };
  const GroupTemplate = (group) => {
    return (
      <div>
        <span>{group.content}</span>
        <span>{group.department}</span>
      </div>
    );
  };
  const options = {
    width: "100%",
    stack: true,
    orientation: "top",
    type: "range",
    showTooltips: true,
    showCurrentTime: true,
    start: getStartDate(),
    end: getEndDate(),
    zoomKey: "ctrlKey",
    editable: true,
    groupEditable: false,
    // tooltip: {followMouse: true},
    groupOrder: function (a, b) {
      return a.id - b.id;
    },
    groupOrderSwap: function (a, b, groups) {
      var v = a.id;
      a.id = b.id;
      b.id = v;
    },
    groupTemplate: function (group) {
      var container = document.createElement("div");

      var elem = document.createElement("img");
      elem.setAttribute("src", "http://localhost:3000/" + group.img);
      elem.setAttribute("height", "30");
      elem.setAttribute("width", "30");
      elem.setAttribute("style", "border-radius:50%");
      container.insertAdjacentElement("afterBegin", elem);

      var department = document.createElement("span");
      department.innerHTML = group.department + " ";
      container.insertAdjacentElement("afterBegin", department);

      var br = document.createElement("br");
      container.insertAdjacentElement("afterBegin", br);

      var content = document.createElement("span");
      content.innerHTML = group.content + " ";
      container.insertAdjacentElement("afterBegin", content);

      return container;
    },
    onDropObjectOnItem: function (item, callback) {
      console.log(1, item);
      updateBoardItems(item, function (value) {
        if (value) {
          //tableItems.filter((t) => t.id === value.id)[0]
          // console.log(1.5, tableItems.filter((t) => t.id == value.id)[0]);
          return value;
          //callback();
        }
      });
    },
  };

  function handleDragStart(event) {
    event.dataTransfer.effectAllowed = "move";
    const caseObject = CaseItem.filter((c) => c.id.toString() == event.target.innerHTML)[0];
    var item = {
      id: caseObject.id,
      type: "range",
      content: caseObject.title,
      target: "item",
      // start: "",
      // end: "",
    };

    event.dataTransfer.setData("text", JSON.stringify(item));

    console.log(event.dataTransfer);
  }

  function updateBoardItems(data, callback) {
    const selected = tableItems.filter((t) => t.id == data.id)[0];
    console.log(2, selected);
    const s = status.filter((s) => s == selected.status)[0];

    const transform = {
      id: selected.id,
      content: selected.title,
      duration: selected.duration.toString(),
      editable: true,
      start: moment(selected.start, "DD/MM/YYYY HH:mm:ss"),
      end: moment(selected.start, "DD/MM/YYYY HH:mm:ss").add(selected.duration, "minute"),
      status: selected.status,
      className: s,
      type: "range",
    };
    console.log(3, transform);
    const res = callback(transform);
    setDragItem(res);
    let newBoard = boardItems.concat(res);
    console.log(newBoard);
    setBoardItems(newBoard);
    setTableItems(tableItems.filter((t) => t.id != selected.id));
    // const newl = [...boardItems, bi];
    // setBoardItems(newl);
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
      <table style={{ fontSize: "18px" }}>
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
