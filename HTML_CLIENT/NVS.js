const URI = "https://bsite.net/snizhel/EmployService.asmx";
const config = { headers : { 'Content-Type': 'text/xml' } }; 

function page_Load(){
    laydanhsach();
}

function btnSearch_Click(){
    var keyword = document.getElementById("txtKeyword").value.trim();
    if(keyword.length > 0){
        search(keyword);
    }else{
        laydanhsach();
    }
}

function lnkID_Click(Manv){
    getDetails(Manv);
}

function btnAdd_Click(){
    var newnhanvien = {
        ID:0,
        Name: document.getElementById("txtName").value,
        Address: document.getElementById("txtAddress").value,
        Salary: document.getElementById("txtSalary").value,
        Age: document.getElementById("txtAge").value
    };
    addNew(newnhanvien);
}

function btnUpdate_Click(){
    var newnhanvien = {
        ID:document.getElementById("txtID").value,
        Name: document.getElementById("txtName").value,
        Address: document.getElementById("txtAddress").value,
        Salary: document.getElementById("txtSalary").value,
        Age: document.getElementById("txtAge").value
    };
    update(newnhanvien);
}

function btnDelete_Click(){
    if(confirm("ARE YOU SURE?")){
        var manv = document.getElementById("txtID").value;
        deletee(manv);
    }
}

function laydanhsach() { 
    var body = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <GetAll xmlns="http://sniv.org/" />
      </soap:Body>
    </soap:Envelope>`; 
    axios.post(URI + "?op=GetAll", body, config).then((response) => { 
        var xmlData = response.data;
        //alert(xmlData); // for DEBUG
        var jsonData = new X2JS ().xml_str2json(xmlData);
        //alert(JSON.stringify (jsonData)); // for DEBUG 
        var nhanviens = jsonData.Envelope.Body.GetAllResponse.GetAllResult.Employee;
        //alert(JSON.stringify (nhanviens)); // for DEBUG 
        renderNVList (nhanviens); 
     });    
}   

function search(keyword){
    var body = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <Search xmlns="http://sniv.org/">
          <keyword>${keyword}</keyword>
        </Search>
      </soap:Body>
    </soap:Envelope>`;
    axios.post(URI + "?op=Search", body, config).then((response) => { 
        var xmlData = response.data;
        //alert(xmlData);
        var jsonData = new X2JS ().xml_str2json(xmlData);
        //alert(JSON.stringify (jsonData));
        var data = jsonData.Envelope.Body.SearchResponse.SearchResult.Employee;
        //alert(JSON.stringify (nhanviens));
        var nhanviens=[];
        if(Array.isArray(data)) nhanviens = data;
        else if(typeof(data) == "object") nhanviens.push(data);
        renderNVList(nhanviens);
    });  
}

function getDetails(ID){
    var body = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <GetEmployee xmlns="http://sniv.org/">
          <ID>${ID}</ID>
        </GetEmployee>
      </soap:Body>
    </soap:Envelope>`;
    axios.post(URI + "?op=GetEmployee", body, config).then((response) => { 
        var xmlData = response.data;
        //alert(xmlData);
        var jsonData = new X2JS ().xml_str2json(xmlData);
        //alert(JSON.stringify (jsonData));
        var data = jsonData.Envelope.Body.GetEmployeeResponse.GetEmployeeResult;
        var nhanvien = data;
        renderNVDetails(nhanvien);
    });    
}

function addNew(newnhanvien){
    var body = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <Add xmlns="http://sniv.org/">
          <employee>
            <ID>${newnhanvien.ID}</ID>
            <Name>${newnhanvien.Name}</Name>
            <Address>${newnhanvien.Address}</Address>
            <Salary>${newnhanvien.Salary}</Salary>
            <Age>${newnhanvien.Age}</Age>
          </employee>
        </Add>
      </soap:Body>
    </soap:Envelope>`;
    axios.post(URI + "?op=Add", body, config).then((response) => {
        var xmlData = response.data;
        var jsonData = new X2JS ().xml_str2json(xmlData);
        var data = jsonData.Envelope.Body.AddResponse.AddResult;
        var result = JSON.parse(data);
        if (result){
            laydanhsach();
            clearTextboxes();
        }else{
            alert('sorry bae!!');
        }
    });
}

function update(newnhanvien){
    var body = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <Update xmlns="http://sniv.org/">
          <employee>
            <ID>${newnhanvien.ID}</ID>
            <Name>${newnhanvien.Name}</Name>
            <Address>${newnhanvien.Address}</Address>
            <Salary>${newnhanvien.Salary}</Salary>
            <Age>${newnhanvien.Age}</Age>
          </employee>
        </Update>
      </soap:Body>
    </soap:Envelope>`;
    axios.post(URI + "?op=Update", body, config).then((response) => {
        var xmlData = response.data;
        var jsonData = new X2JS ().xml_str2json(xmlData);
        var data = jsonData.Envelope.Body.UpdateResponse.UpdateResult;
        var result = JSON.parse(data);
        if (result){
            laydanhsach();
            clearTextboxes();
        }else{
            alert('sorry bae!!');
        }
    });
}

function deletee(ID){
    var body = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <Delete xmlns="http://sniv.org/">
          <ID>${ID}</ID>
        </Delete>
      </soap:Body>
    </soap:Envelope>`;
    axios.post(URI + "?op=Delete", body, config).then((response) => {
        var xmlData = response.data;
        var jsonData = new X2JS ().xml_str2json(xmlData);
        var data = jsonData.Envelope.Body.DeleteResponse.DeleteResult;
        var result = JSON.parse(data);
        if (result){
            laydanhsach();
            clearTextboxes();
        }else{
            alert('sorry bae!!');
        }
    });
}

function renderNVList(nhanviens){
    var rows = "";
    for(var Employee of nhanviens){
        rows += "<tr onclick='lnkID_Click(" + Employee.ID + ")' style='cursor:pointer'>";
        rows += "<td>" + Employee.ID + "</td>";
        rows += "<td>" + Employee.Name + "</td>";
        rows += "<td>" + Employee.Address + "</td>";
        rows += "<td>" + Employee.Salary + "</td>";
        rows += "<td>" + Employee.Age + "</td>";
        rows += "</td>";
    }
    var header = "<tr><th>ID</th><th>Name</th><th>Address</th><th>Salary</th><th>Age</th></tr>";
    document.getElementById("lstNVS").innerHTML = header + rows;
}

function renderNVDetails(nhanvien){
    document.getElementById("txtID").value = nhanvien.ID;
    document.getElementById("txtName").value = nhanvien.Name ;
    document.getElementById("txtAddress").value = nhanvien.Address;
    document.getElementById("txtSalary").value = nhanvien.Salary;
    document.getElementById("txtAge").value = nhanvien.Age;
}

function clearTextboxes(){
    document.getElementById("txtID").value ='';
    document.getElementById("txtName").value ='';
    document.getElementById("txtAddress").value ='';
    document.getElementById("txtSalary").value ='';
    document.getElementById("txtAge").value ='';
}

