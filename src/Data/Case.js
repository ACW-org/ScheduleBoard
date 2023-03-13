import moment from "moment";



function GetValueFromNetsuite(){


  let request = new Request('https://shiny-poetry-28e5.simonlkch.workers.dev/?https://tstdrv2641016.suitetalk.api.netsuite.com/services/rest/query/v1/suiteql?limit=5', {
    method: 'POST',
    body: JSON.stringify( {'q': 'select * from contact where id=3754'}),
    headers: new Headers({
      'Content-Type': 'application/json',
      'Prefer': 'transient',
      'Authorization': 'Bearer eyJraWQiOiJjLlRTVERSVjI2NDEwMTYuMjAyMy0wMS0zMV8wMC0xMC01OCIsInR5cCI6IkpXVCIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzOzMxMTAiLCJhdWQiOlsiMkE3QTBDQTMtNzkwNi00MzFCLTg3QTctN0Y1MkE1NkNGRjlEO1RTVERSVjI2NDEwMTYiLCJhMDUzODRhNTcxY2EwMjFkNjM2ZWU2YmIzZjZiMWM1OTdmYjRjYjIwZGY4YWQzMWExNmIyNWMxYzI5NmFhNTAyIl0sInNjb3BlIjpbInJlc3Rfd2Vic2VydmljZXMiLCJyZXN0bGV0cyJdLCJpc3MiOiJodHRwczpcL1wvc3lzdGVtLm5ldHN1aXRlLmNvbSIsIm9pdCI6MTY3ODQxODg3OCwiZXhwIjoxNjc4NDIyNDc4LCJpYXQiOjE2Nzg0MTg4NzgsImp0aSI6IlRTVERSVjI2NDEwMTYuYS1jLm51bGwuMTY3ODQxODg3ODQ4NCJ9.Pge0V6ZRKAP9dEPMo45M8OMTbdnh3KvMZrySjexObcw3jq0KWEre-pf40koUZiyYactV7YnJXUf_ZIMD6poIvQoHkyBTR2pvas4Ig0G-CMjYcHTjjg6Zy8oWbVM__FvXehL-M-wlGNyEOCFuft4SUCBVbGmsuliHtnbz-k_86yobaTc1dxj1b-6xLMVBxDbA7ibdFm_9iJ3DVjig8ZHqqJieboZTXmd6SEvBOO1Rdd75RwEdve8MkNyfquP_jslcj_w1ytVMzod6iT-iPHvqZLtWdXEIO5uhBSBZfzVagqiXa4v8yJ75UvJETr8Lx5Gw0nZ0Z7G5X7stBVz1mQnz7Q3jPuGd5qYmOpn08IwEEXSNhEzxzvWp4oQDKoM4aTtnarA-rYurLTzVWiI5DY2yHUBUNwAzm_LZj3HnR5Gx-oaa6aSFPi1SN28eaNUbgq83WiY8t4KU4EqIsAkGhUfr9cM4LIOivRwYFijd6qAQX28ROHxu2aHctnI-p018I9Pmwm-9FaSOJQ24xXVbaSDbvt4vGC7yR9nDEK5Z0eIIqUbdJBHtB9GEuIVTZVXee7bfqWgioxhudxdQEQFocgR70WXSUlQgUQVtZaWrQ2b7QVBSkRSJykckcp8RkQlv4QE-3D021Z25RVm_uwZlCt9o-naLOSHXXZijJB7uRyKGvjA'
    })
  });
  
  fetch(request)
  .then((response) => response.text())
    .then((text) => {     
      return text;
    });
   
      // Handle response you get from the API

  

  // var xhr = new XMLHttpRequest();
  // var x; 
  
  
  // //xhr.open('POST', 'https://tstdrv2641016.suitetalk.api.netsuite.com/services/rest/query/v1/suiteql?limit=5');
  // xhr.open('POST','https://shiny-poetry-28e5.simonlkch.workers.dev/?https://tstdrv2641016.suitetalk.api.netsuite.com/services/rest/query/v1/suiteql?limit=5');
  // xhr.setRequestHeader('Content-Type', 'application/json');
  // xhr.setRequestHeader('Prefer', 'transient');
  // xhr.setRequestHeader('Authorization', 'Bearer eyJraWQiOiJjLlRTVERSVjI2NDEwMTYuMjAyMy0wMS0zMV8wMC0xMC01OCIsInR5cCI6IkpXVCIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzOzMxMTAiLCJhdWQiOlsiMkE3QTBDQTMtNzkwNi00MzFCLTg3QTctN0Y1MkE1NkNGRjlEO1RTVERSVjI2NDEwMTYiLCJhMDUzODRhNTcxY2EwMjFkNjM2ZWU2YmIzZjZiMWM1OTdmYjRjYjIwZGY4YWQzMWExNmIyNWMxYzI5NmFhNTAyIl0sInNjb3BlIjpbInJlc3Rfd2Vic2VydmljZXMiLCJyZXN0bGV0cyJdLCJpc3MiOiJodHRwczpcL1wvc3lzdGVtLm5ldHN1aXRlLmNvbSIsIm9pdCI6MTY3ODQxODg3OCwiZXhwIjoxNjc4NDIyNDc4LCJpYXQiOjE2Nzg0MTg4NzgsImp0aSI6IlRTVERSVjI2NDEwMTYuYS1jLm51bGwuMTY3ODQxODg3ODQ4NCJ9.Pge0V6ZRKAP9dEPMo45M8OMTbdnh3KvMZrySjexObcw3jq0KWEre-pf40koUZiyYactV7YnJXUf_ZIMD6poIvQoHkyBTR2pvas4Ig0G-CMjYcHTjjg6Zy8oWbVM__FvXehL-M-wlGNyEOCFuft4SUCBVbGmsuliHtnbz-k_86yobaTc1dxj1b-6xLMVBxDbA7ibdFm_9iJ3DVjig8ZHqqJieboZTXmd6SEvBOO1Rdd75RwEdve8MkNyfquP_jslcj_w1ytVMzod6iT-iPHvqZLtWdXEIO5uhBSBZfzVagqiXa4v8yJ75UvJETr8Lx5Gw0nZ0Z7G5X7stBVz1mQnz7Q3jPuGd5qYmOpn08IwEEXSNhEzxzvWp4oQDKoM4aTtnarA-rYurLTzVWiI5DY2yHUBUNwAzm_LZj3HnR5Gx-oaa6aSFPi1SN28eaNUbgq83WiY8t4KU4EqIsAkGhUfr9cM4LIOivRwYFijd6qAQX28ROHxu2aHctnI-p018I9Pmwm-9FaSOJQ24xXVbaSDbvt4vGC7yR9nDEK5Z0eIIqUbdJBHtB9GEuIVTZVXee7bfqWgioxhudxdQEQFocgR70WXSUlQgUQVtZaWrQ2b7QVBSkRSJykckcp8RkQlv4QE-3D021Z25RVm_uwZlCt9o-naLOSHXXZijJB7uRyKGvjA');
  // xhr.send(JSON.stringify( {'q': 'select * from contact where id=3754'}));
 
  // xhr.onreadystatechange = function() {   

  //   if (xhr.readyState == XMLHttpRequest.DONE) {    
  //     console.log(xhr.responseText);
  //     return(xhr.responseText);
  //      console.log("readyState");
  //        JSON.parse(xhr.responseText);
  //        const myJSON = xhr.responseText;
  //        const myObj = JSON.parse(myJSON);
  //        x= myObj["items"][0].id;   
  //    // return
        
  //    }            
  //  }

}




function CaseItem(){

   //  myJSON =(GetValueFromNetsuite());
//     console.log(myJSON);
// }  while (myJSON != undefined) 
   // const myObj = JSON.parse(myJSON);
  //  x= myObj["items"][0].id;  
  //  console.log(x);

  var x = GetValueFromNetsuite();
  console.log("CaseItem " + x );
 

  return  [
    { id: 4, title:x , caseno: "CAS-230222-01148", caseresource: "Resource - Unnamed Resource", start: moment().add(2, "hour").format("DD/MM/yyyy hh:mm:ss"), duration: 60, status: "Active",url:"https://tstdrv2641016.app.netsuite.com/app/crm/support/supportcase.nl?id=1162" },
    { id: 5, title: "20230212 (WMDa04) 更換 HAN-71710670", caseno: "CAS-220805-01088", caseresource: "Resource - Unnamed Resource", start: moment().add(2, "hour").format("DD/MM/yyyy hh:mm:ss"), duration: 60, status: "Active",url:"" },
    { id: 6, title: "20230205 更換 HAN-71710670", caseno: "CAS-220805-01090", caseresource: "Resource - Unnamed Resource", start: moment().add(2, "hour").format("DD/MM/yyyy hh:mm:ss"), duration: 60, status: "Active",url:""},
    { id: 7, title: "20230130 (WMDa04) 更換 HAN-71718670", caseno: "CAS-220805-01074", caseresource: "Resource - Unnamed Resource", start: "30/01/2023 10:58:36", duration: 60, status: "Active",url:"" },
      
  ];
}







export default CaseItem();
