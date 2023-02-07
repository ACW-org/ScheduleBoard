import moment from "moment";
const fakeBoardData = [
  {
    id: 1,
    content: "Task 1",
    editable: true,
    start: moment().add(2, "hour"),
    end: moment().add(4, "hour"),
    group: 1,
    status: "Open",
  },
  {
    id: 2,
    content: "Task 2",
    editable: true,
    start: moment().add(7, "hour"),
    end: moment().add(10, "hour"),
    group: 2,
    status: "Accept",
  },
  {
    id: 3,
    content: "Task 3",
    editable: true,
    start: moment().add(4, "hour"),
    end: moment().add(7, "hour"),
    group: 3,
    status: "Complete",
  },
];

export default fakeBoardData;
