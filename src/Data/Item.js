import moment from "moment";
const fakeBoardData = [
  {
    id: 1,
    editable: true,
    start: moment().add(2, "hour"),
    end: moment().add(4, "hour"),
    duration: moment().add(4, "hour").diff(moment().add(2, "hour")).toString(),   
    content: "<a href='https://tstdrv2641016.app.netsuite.com/app/crm/support/supportcase.nl?id=1161&whence=' target ='blank' ><b>CAS-230222-01149 - AIRBUS </b></a> </br>"
            +"20230222 清洗變速箱油底殼濾網- EPS-330T  </br>"
            +"<I>#Low</I>",             //case
    group: 1,
    status: "Open",
  },
  {
    id: 2,
    content:  "<a href='https://tstdrv2641016.app.netsuite.com/app/crm/support/supportcase.nl?id=1164' target ='blank' ><b>CAS-230223-01151 - AIRBUS </b> </a></br>"
            +"20230223 季度維修保養檢查 LB2000EXII(M)</br>"
            +"<I>#Low</I>",
    editable: true,
    start: moment().add(7, "hour"),
    end: moment().add(11, "hour"),
    group: 2,
    status: "Open",
  },
  {
    id: 3,
    content: "<b>20230000072 - Central West S11 </b> </br>"
              +"維修保養 MB46VAE</br>"
              +"<I>#Low</I>",
    editable: true,
    start: moment().add(4, "hour"),
    end: moment().add(7, "hour"),
    group: 3,
    status: "Open",
  },

  {
    id: 4,
    content: "<b>20230000073 - Tuen Mun S01 </b> </br>"
              +"維修保養 MB46VAE</br>"
              +"<I>#High</I>",
    editable: true,
    start: moment().add(0, "hour"),
    end: moment().add(8, "hour"),
    group:5,
    status: "In-Progress",
  },

  {
    id: 5,
    content: "<b>20230000074 - Central S21 </b></br>"
              +"20230222 清洗變速箱油底殼濾網 - EPS-330T</br>"
              +"<I>#Medium</I>",
    editable: true,
    start: moment().add(-2, "hour"),
    end: moment().add(1, "hour"),
    group:3,
    status: "Complete",
  },
  {
    id: 6,
    content: "<b>20230000075 - Central S21 </b></br>"
              +"(WMDa04) 更換 HAN-71718670 </br>"
              +"<I>#Medium</I>",
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
              +"<I>#Low</I>",
    editable: true,
    start: moment().add(1, "hour"),
    end: moment().add(4, "hour"),
    group:3,
    status: "Open",
  },
];

export default fakeBoardData;
