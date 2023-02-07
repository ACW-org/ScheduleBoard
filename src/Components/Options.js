import fakeBoardData from "../Data/Item";

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
      <label>{group.content}</label>
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
  //   groupTemplate: function (group, element) {
  //     if (!group || !group.content) {
  //       return;
  //     }
  //     return <GroupTemplate group={group} />;
  //   },
  onAdd: function (item, callback) {
    console.log(
      "Add item",
      "Enter text content for new item:",
      item.content,
      function (value) {
        if (value) {
          item.content = value;
          callback(item); // send back adjusted new item
        } else {
          callback(null); // cancel item creation
        }
      }
    );
  },
};
