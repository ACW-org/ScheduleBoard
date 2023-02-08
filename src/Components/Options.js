import fakeBoardData from "../Data/Item";
import tlGroups from "../Data/Group";
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
export const options = {
  width: "100%",
  stack: true,
  orientation: "top",
  type: "range",
  showTooltips: true,
  start: getStartDate(),
  end: getEndDate(),
  zoomKey: "ctrlKey",
  editable: true,
  groupEditable: false,
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
  onDropObjectOnItem: function (objectData, item, callback) {
    if (item.content) {
      callback(item); // send back adjusted item
    } else {
      return null; // cancel updating the item
    }
  },
};
