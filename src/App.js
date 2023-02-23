import logo from "./logo.svg";
import Timeline from "react-visjs-timeline";
import "./App.css";
import moment from "moment";
// import { options } from "./Components/Options";
import tlGroups from "./Data/Group";
import fakeBoardData from "./Data/Item";
import { useEffect, useReducer, useRef, useState } from "react";
import CaseItem from "./Data/Case";

function App() {
  const [boardItems, setBoardItems] = useState([]);
  const [boardGroups, setBoardGroups] = useState([]);
  const [dragItem, setDragItem] = useState("");
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);

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
    getData();
    convert();
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
      //elem.setAttribute("src", "http://localhost:3000/" + group.img);
      elem.setAttribute("src", " https://yellow-cliff-03240a500.2.azurestaticapps.net/" + group.img);
     
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
    onRemove: function (item, callback) {
      handleRemove(item, function () {
        callback(item);
      });
    },
    onDropObjectOnItem: function (objectData, item, callback) {
      console.log(1, item);
      if (!item) {
        return;
      }
      alert('dropped object with content: "' + objectData.content + '" to item: "' + item.content + '"');
    },
  };

  // function handleDragStart(event) {
  //   //console.log(event.dataTransfer);
  //   event.dataTransfer.effectAllowed = "move";
  //   const caseObject = CaseItem.filter((c) => c.id.toString() == event.target.id)[0];
  //   console.log(event.target.id);
  //   var item = {
  //     id: caseObject.id,
  //     type: "range",
  //     content: caseObject.title,
  //     target: "item",
  //   };

  //   event.dataTransfer.setData("text", JSON.stringify(item));
  //   // event.originalEvent.dataTransfer.files("text", JSON.stringify(item));
  // }

  function handleRemove(item, callback) {
    console.log("triggered delete", item);
    const idx = tableItems.filter((item) => item.caseno === dragItem)[0];
    const tableDom = document.getElementById(`row-${idx.id}`);
    tableDom.style.display = "";
    callback();
  }

  async function handleDragStart(event) {
    console.log("drag start trigger");
    event.dataTransfer.effectAllowed = "move";
    var caseName = event.target.innerHTML;
    const caseObject = tableItems.filter((obj) => obj.title === caseName)[0];
    var item = {
      id: new Date().toISOString(),
      editable: true,
      type: "range",
      content: `<div class='vis-group vis-range Open'><b><a href="${caseObject.url}" target ="blank">${caseObject.caseno} - AIRBUS </a> </b> </br> 
              ${caseName} </br>
              <I>#Low</I> </br>`,
      status: "Open",
    };
    event.dataTransfer.setData("text", JSON.stringify(item));
    setDragItem(caseObject.caseno);
    event.target.addEventListener("dragend", handleDragEnd.bind(event), false);
  }

  async function handleDragEnd(event) {
    const idx = tableItems.filter((item) => item.caseno === dragItem)[0];
    const tableDom = document.getElementById(`row-${idx.id}`);
    tableDom.style.display = "none";
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
      <table id="case-table" style={{ fontSize: "15px", width: "100%", textAlign: "left", paddingLeft: "30px", border: "1pt solid #d3d3d3" }}>
        <thead>
          <tr style={{ "background-color": "#f6f6f6", height: "50px", border: "10pt solid black" }}>
            <td style={{ width: "30%" }}>
              {" "}
              主旨 &nbsp;<i className="fa fa-bars"></i>{" "}
            </td>
            <td style={{ width: "20%" }}>
              {" "}
              編號 &nbsp; <i className="fa fa-briefcase" aria-hidden="true"></i>
            </td>
            <td style={{ width: "20%" }}>
              編號資源 &nbsp; <i className="fa fa-gavel" aria-hidden="true"></i>{" "}
            </td>
            <td style={{ width: "10%" }}>
              狀態 &nbsp; <i className="fa fa-check-square-o" aria-hidden="true"></i>{" "}
            </td>
            <td style={{ width: "20%" }}>
              創建日期 &nbsp; <i className="fa fa-refresh" aria-hidden="true"></i>
            </td>
          </tr>
        </thead>
        <tbody id="case-table-body">
          {data &&
            data.map((row) => (
              // <Draggable>
              <tr id={`row-${row.id}`} onDragStart={(e) => handleDragStart(e)} key={row.id} style={{ "background-color": "#fafafa", color: "#3168d7" }}>
                <td>{row.title}</td>
                <td>{row.caseno}</td>
                <td>{row.caseresource}</td>
                <td>{row.status}</td>
                <td style={{ color: "#000000" }}>{row.start}</td>
              </tr>
              // {/* </Draggable> */}
            ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="App">
      <div className="timeline">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>

        <table
          style={{
            fontSize: "18px",
            width: "100%",
            "text-align": "left",
            "padding-left": "30px",
            "padding-top": "5px",
            "padding-bottom": "5px",
            border: "1.25pt solid #dfdfdf",
            "vertical-align": "middle",
          }}
        >
          <tr style={{ "background-color": "#f6f6f6", height: "15px", border: "10pt double black" }}>
            <td style={{ width: "15%" }}>Inital Public View :</td>
            <td style={{ width: "15%" }}>
              <b>AKA Venue 場地</b>:
            </td>
            <td style={{ width: "15%" }}>GA General Affairs </td>
            <td style={{ width: "50%" }}> </td>
          </tr>
        </table>
        <table style={{ fontSize: "14px", width: "100%", "text-align": "left", "padding-left": "30px", color: "#0080FF" }}>
          <tr style={{ "background-color": "#f6f6f6", height: "20px", border: "10pt double black" }}>
            <td style={{ width: "5%" }}>
              <i className="fa fa-filter"></i> 篩選
            </td>
            <td style={{ width: "5%" }}>
              <i className="fa fa-hourglass"></i> 按小時檢視
            </td>
            <td style={{ width: "5%" }}>
              <i className="fa fa-history"></i> 縱向顯示
            </td>
            <td style={{ width: "15%" }}>
              <i className="fa fa-calendar-check-o" aria-hidden="true"></i> 3/01/2023 - 3/07/2023
            </td>
            <td style={{ width: "50%" }}> </td>
          </tr>
        </table>

        <Timeline doubleClickHandler={(e) => console.log(e)} selectHandler={selectHandler} options={options} items={boardItems} groups={boardGroups} customTimes={customTimes} />
      </div>
      <br />
      <T data={tableItems} />
    </div>
  );
}

export default App;
