import moment from "moment";
const fakeBoardData = [
  {
    id: 1,
    editable: true,
    start: moment().add(2, "hour"),
    end: moment().add(4, "hour"),
    duration: moment().add(4, "hour").diff(moment().add(2, "hour")).toString(),   
    content: "<b>CAS-220805-01070 - Central West 1104 </b> </br>"
            +"Fridge Issue </br>"
            +"2Hr",             //case
    group: 1,
    status: "Open",
  },
  {
    id: 2,
    content:  "<b>CAS-220805-01080 - Sheung Wan S12 </b> </br>"
            +"A/C Dripping Issue </br>"
            +"4Hr",
    editable: true,
    start: moment().add(7, "hour"),
    end: moment().add(11, "hour"),
    group: 2,
    status: "Open",
  },
  {
    id: 3,
    content: "<b>CAS-220805-01090 - Central West S11 </b> </br>"
              +"Fridge Issue </br>"
              +"3Hr",
    editable: true,
    start: moment().add(4, "hour"),
    end: moment().add(7, "hour"),
    group: 3,
    status: "Open",
  },

  {
    id: 4,
    content: "<b>CAS-230805-01090 - Tuen Mun S01 </b> </br>"
              +"Cashier Issue </br>"
              +"8Hr",
    editable: true,
    start: moment().add(0, "hour"),
    end: moment().add(8, "hour"),
    group:5,
    status: "In-Progress",
  },

  {
    id: 5,
    content: "<b>CAS-230805-01010 - Central S21 </b></br>"
              +"Cashier Issue </br>"
              +"3Hr",
    editable: true,
    start: moment().add(-2, "hour"),
    end: moment().add(1, "hour"),
    group:3,
    status: "Complete",
  },
  {
    id: 6,
    content: "<b>CAS-230805-01015 - Central S21 </b></br>"
              +"(WMDa04) 更換 HAN-71718670 </br>"
              +"7Hr",
    editable: true,
    start: moment().add(-1, "hour"),
    end: moment().add(6, "hour"),
    group:4,
    status: "Complete",
  },
  {
    id: 7,
    content: "<b>CAS-230805-01018 - North Point S5 </b></br>"
              +"(WMDa04) 更換 HAN-71718670 </br>"
              +"3Hr",
    editable: true,
    start: moment().add(1, "hour"),
    end: moment().add(4, "hour"),
    group:3,
    status: "Open",
  },
];

export default fakeBoardData;
