import logo from "./logo.svg";
import Timeline from "react-visjs-timeline";
import "./App.css";
import moment from "moment";
// import { options } from "./Components/Options";
//import tlGroups from "./Data/Group";
import fakeBoardData from "./Data/Item";
import { useEffect, useReducer, useRef, useState } from "react";
//import CaseItem from "./Data/Case";
<link rel="stylesheet" href="./App.css"></link>
var AuthToken = 'eyJraWQiOiJjLlRTVERSVjI2NDEwMTYuMjAyMy0wMS0zMV8wMC0xMC01OCIsInR5cCI6IkpXVCIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzOzMxMTAiLCJhdWQiOlsiMkE3QTBDQTMtNzkwNi00MzFCLTg3QTctN0Y1MkE1NkNGRjlEO1RTVERSVjI2NDEwMTYiLCJhMDUzODRhNTcxY2EwMjFkNjM2ZWU2YmIzZjZiMWM1OTdmYjRjYjIwZGY4YWQzMWExNmIyNWMxYzI5NmFhNTAyIl0sInNjb3BlIjpbInJlc3RsZXRzIiwicmVzdF93ZWJzZXJ2aWNlcyJdLCJpc3MiOiJodHRwczpcL1wvc3lzdGVtLm5ldHN1aXRlLmNvbSIsIm9pdCI6MTY3ODY4ODM1OSwiZXhwIjoxNjc4NjkxOTU5LCJpYXQiOjE2Nzg2ODgzNTksImp0aSI6IlRTVERSVjI2NDEwMTYuYS1jLm51bGwuMTY3ODY4ODM1OTQxNSJ9.fZB1uo9upO_b_e8Ih4adEJN2oqzEv-PhprOIKgjd9QzQT4qcQNbn2L3bs61ABBg_hmorePWQzcSUI5xvifDhogV24rrAro5PVaVIahQasAEOFZ-927RWGU0wDmh657HVX2SwPx00KoaJGsgcFiQNWqk21agQt6pRFS_QQfIGnZ2MfWC1qoE4eB7TLvFb_47nbW-VTSAIAI-TaJ5PaBTVEhjxDuN0QsTqE0kAqYJ_6qMuW7P83LKHnQTANxGo_Rn4B0MSNKpEg0FDqZXD1bdRxslgOqVTZho4HPa7SLqQBWgqRwKpOmHPL7FWqjBaJ-X8OvugcaMIhh4RBZokDianaFBpf1Doph8BEEYjRuHj_CYNc7n65EnQvIZEQ0-_kwYGiJPKpSgNfmvkNYWQEkYLIgiqhXOPvOt0SID3v4DXyoJFovwMagJ16My0V5AeYjcL-pA4ddxvkx1R6ODtCCJgmrrpsfPa-S5m_RevBTd0Dw3zLcPpVQowCrmknpxfc4CgbBglSdLAk7dBx4C8zu1RoKPNgqSNdfrLNP1czukuoC1VyLLcQQHQyu9BQlQSE6nNKqjZi7j_Lk6BXi7gE0NQqRH4Ey6TXTQWI2TRNTlwel1XDc5zjFsS4QdUxnonZz5skw-NEbWsqFswiinER78qeQO6kLMvqxRPmXaHzxTJoZQ';
function App() {
  const [boardItems, setBoardItems] = useState([]);
  const [boardGroups, setBoardGroups] = useState([]);
 // const [boardData, setBoardData] = useState([]);
  const [dragItem, setDragItem] = useState("");
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);

  // const [optionSetup, setOptionSetup] = useState(options); 
  const [tableItems, setTableItems] = useState(CaseItem);
  const status = ["Open", "Accept", "In-Progress", "Cancelled", "Complete"];


  const getData = () => {
    ResourcesBooking();
    BookableResources();    
    CaseItem();
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
     // elem.setAttribute("src", "http://localhost:3000/" + group.img);
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

function ResourcesBooking(){
  let request = new Request('https://shiny-poetry-28e5.simonlkch.workers.dev/?https://tstdrv2641016.suitetalk.api.netsuite.com/services/rest/query/v1/suiteql', {
    method: 'POST',
    body: JSON.stringify({ 'q': 'select * from customrecord_acws_resourcesbooking CASR,SupportCase SC where SC.id = CASR.custrecord_acws_resourcesbooking_case' }),
    headers: new Headers({
      'Content-Type': 'application/json',
      'Prefer': 'transient',
      'Authorization': 'Bearer '+AuthToken
    })
  });

  fetch(request)
    .then((response) => response.text())
    .then((responsetext) => {
    
        console.log(JSON.parse(responsetext).items)


      var ResourcesBooking = JSON.parse(responsetext).items.map((item) => {
        return {
   
          id: item.id,
          editable: true,
          start:ConvertDateTime(item.custrecord_acws_resourcesbooking_startdt,item.custrecord_acws_resourcesbooking_startt),// item.custrecord_acws_resourcesbooking_startdt,//item.custrecord_acws_resourcesbooking_startdt,//moment().add(2, "hour"),
          end:ConvertDateTime(item.custrecord_acws_resourcesbooking_startdt,item.custrecord_acws_resourcesbooking_endt),//item.custrecord_acws_resourcesbooking_enddt,//moment().add(4, "hour"),
          duration: item.custrecord_acws_resourcesbooking_dur,  
          content: "<div class='vis-group vis-range prior"+item.custrecord_acws_resourcesbooking_prior+"'><a href='https://tstdrv2641016.app.netsuite.com/app/crm/support/supportcase.nl?id="+item.id+"' target ='blank' ><b>"+item.custrecord_acws_resourcesbooking_casenum+ " - AIRBUS"+"</b></a> </br>"
                  +item.title+"</br>"
                  +"<I>"+ConvertPrior(item.custrecord_acws_resourcesbooking_prior)+"</I></div>",   
          group: item.custrecord_acws_resourcesbooking_reso,
          status: "Open",          //case
        }
      }
      )         
      setBoardItems(ResourcesBooking)      
    })
  
 
}
function ConvertDateTime(StartDate,StartTime)
{

  var converteddt= Date.parse(formatDate(StartDate)+"T"+StartTime+"Z");
  converteddt= converteddt - 28800000;
  return converteddt
}

function formatDate(date) {

  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}



function ConvertPrior(PriorText){
  switch(PriorText){
   case '1':
    return '#低' 
   case '2':
    return '#中' 
   case '3':
    return '#高'   
  }

}


function BookableResources(){


  let request = new Request('https://shiny-poetry-28e5.simonlkch.workers.dev/?https://tstdrv2641016.suitetalk.api.netsuite.com/services/rest/query/v1/suiteql', {
    method: 'POST',
    body: JSON.stringify({ 'q': 'select * from customrecord_acws_bookableresources' }),
    headers: new Headers({
      'Content-Type': 'application/json',
      'Prefer': 'transient',
      'Authorization': 'Bearer '+ AuthToken
    })
  });

  fetch(request)
    .then((response) => response.text())
    .then((responsetext) => {
    
        console.log(JSON.parse(responsetext).items)


      var Group = JSON.parse(responsetext).items.map((item) => {
        return {
          "id": item.id,
          "img" : item.custrecord_acws_bookableresource_image,
          "content": "<a href='https://tstdrv2641016.app.netsuite.com/app/common/custom/custrecordentry.nl?rectype=451&id="+item.id+"' target ='blank' ><B>"+item.name+ "- "+item.custrecord_acws_bookreso_jobtitle+"</B></a>",
          "caseresource" :" ",
          "department": item.custrecord_acws_resourcesbooking_util+"</br>",
          "percent": 60,          
        }
      }
      )         
      setBoardGroups(Group)      
    })
  }


  function CaseItem() {  

    let request = new Request('https://shiny-poetry-28e5.simonlkch.workers.dev/?https://tstdrv2641016.suitetalk.api.netsuite.com/services/rest/query/v1/suiteql', {
      method: 'POST',
      body: JSON.stringify({ 'q': 'select * from SupportCase' }),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Prefer': 'transient',
        'Authorization': 'Bearer '+ AuthToken
      })
    });

    fetch(request)
      .then((response) => response.text())
      .then((responsetext) => {
      
          console.log(JSON.parse(responsetext).items)


        var SupportCase = JSON.parse(responsetext).items.map((item) => {
          return {
            "id": item.id,
            "title" : item.title,
            "caseno": item.casenumber,
            "caseresource" :"Resource - Unnamed Resource",
            "start": moment().add(2, "hour").format("DD/MM/yyyy hh:mm:ss"),
            "duration": 60, 
            "status": "Active", 
            "url": "https://tstdrv2641016.app.netsuite.com/app/crm/support/supportcase.nl?"+item.id 
          }
        }
        )
        // console.log("abcAAA",abcAAA)

        // var test = [
        //   { id: 4, title: abcAAA, caseno: "CAS-230222-01148", caseresource: "Resource - Unnamed Resource", start: moment().add(2, "hour").format("DD/MM/yyyy hh:mm:ss"), duration: 60, status: "Active", url: "https://tstdrv2641016.app.netsuite.com/app/crm/support/supportcase.nl?id=1162" },
        //   { id: 5, title: "20230212 (WMDa04) 更換 HAN-71710670", caseno: "CAS-220805-01088", caseresource: "Resource - Unnamed Resource", start: moment().add(2, "hour").format("DD/MM/yyyy hh:mm:ss"), duration: 60, status: "Active", url: "" },
        //   { id: 6, title: "20230205 更換 HAN-71710670", caseno: "CAS-220805-01090", caseresource: "Resource - Unnamed Resource", start: moment().add(2, "hour").format("DD/MM/yyyy hh:mm:ss"), duration: 60, status: "Active", url: "" },
        //   { id: 7, title: "20230130 (WMDa04) 更換 HAN-71718670", caseno: "CAS-220805-01074", caseresource: "Resource - Unnamed Resource", start: "30/01/2023 10:58:36", duration: 60, status: "Active", url: "" },
        // ];

        setTableItems(SupportCase)      
      })

    }

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
      content: `<div class='vis-group vis-range prior1'><b><a href="${caseObject.url}" target ="blank">${caseObject.caseno} - AIRBUS </a> </b> </br> 
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
              <i className="fa fa-calendar-check-o" aria-hidden="true"></i> 3/13/2023 - 3/19/2023
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
