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
    getData();
    convert();
  }, []);

  useEffect(() => {
    console.log(boardItems);
  }, [boardItems]);

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
          // const newList = [...boardItems, value];
          updateBoards(value);
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
    };

    event.dataTransfer.setData("text", JSON.stringify(item));
  }

  function updateBoards(boardObject) {
    const newBoard = [...boardItems]; // spreading operator which doesn't mutate the array and returns new array
    newBoard.push(boardObject);
    console.log("new", newBoard);
    setBoardItems(newBoard);
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
    };
    console.log(3, transform);
    const res = callback(transform);
    setTableItems(tableItems.filter((t) => t.id != selected.id));
    console.log(boardItems);
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

      <table style={{ fontSize: "15px",                     
                      width:"100%",
                      "text-align": "left",
                      "padding-left": "30px",
                       border: "1pt solid #d3d3d3"
                       }}>
        <thead>
        
          <tr style={{"background-color":"#f6f6f6",
                      height:"50px",
                      "border": "10pt solid black"
                      }}>
            <td style={{width:"30%"}}> Name  &nbsp;<i class="fa fa-bars"></i> </td>
            <td style={{width:"20%"}}> Case &nbsp; <i class="fa fa-briefcase" aria-hidden="true"></i></td>
            <td style={{width:"20%"}}>Case Resource &nbsp; <i class="fa fa-gavel" aria-hidden="true"></i> </td>
            <td style={{width:"10%"}}>Status &nbsp; <i class="fa fa-check-square-o" aria-hidden="true"></i> </td>
            <td style={{width:"20%"}}>Created On &nbsp; <i class="fa fa-refresh" aria-hidden="true"></i></td>
          </tr>
      
        </thead>
        <tbody>
          {data &&
            data.map((row) => (
              <tr onDragStart={handleDragStart} key={row.id} style={{"background-color":"#fafafa", color:"#3168d7"}}>
                <td>{row.title}</td>
                <td>{row.caseno}</td>
                <td>{row.caseresource}</td>
                <td>{row.status}</td>
                <td style={{ color:"#000000"}}>{row.start}</td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  };

  return (
 
    <div className="App">
      <div className="timeline">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'></script>
     
          <table style={{ fontSize: "18px",                     
                      width:"100%",
                      "text-align": "left",
                      "padding-left": "30px",
                      "padding-top":"5px",
                      "padding-bottom":"5px",
                       border: "1.25pt solid #dfdfdf",
                       "vertical-align": "middle",         
                                              }}>

            <tr style={{"background-color":"#f6f6f6",
                        height:"15px",
                        "border": "10pt double black"
                        }}>
              <td style={{width:"15%"}}>Inital Public View :</td>
              <td style={{width:"15%" }}><b>AKA Venue 場地</b>:</td>
              <td style={{width:"15%"}}>GA General Affairs </td>       
              <td style={{width:"50%"}}> </td>                   
          </tr>  
          </table>         
          <table style={{ fontSize: "14px",                     
                      width:"100%",
                      "text-align": "left",
                      "padding-left": "30px",                     
                      color:"#0080FF"                    
                                              }}>

            <tr style={{"background-color":"#f6f6f6",
                        height:"20px",
                        "border": "10pt double black"
                        }}>
              <td style={{width:"5%"}}><i class="fa fa-filter"></i> Filters</td>
              <td style={{width:"5%"}}><i class="fa fa-hourglass"></i> Hourly</td>
              <td style={{width:"5%"}}><i class="fa fa-history"></i> Gantt</td>
              <td style={{width:"15%"}}><i class="fa fa-calendar-check-o" aria-hidden="true"></i> 2/10/2023 - 2/16/2023</td>         
              <td style={{width:"50%"}}>   </td>                   
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
