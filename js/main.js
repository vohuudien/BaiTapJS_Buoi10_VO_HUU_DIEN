var staffs = [];
getStaff();

function getStaff() {
  staffs = JSON.parse(localStorage.getItem("workers")) || [];

  for (var i = 0; i < staffs.length; i++) {
    var staff = staffs[i];
    staffs[i] = new Staff(
      staff.id,
      staff.name,
      staff.email,
      staff.password,
      staff.dateOfWorking,
      staff.basicSalary,
      staff.position,
      staff.hoursOfWorking
    );
  }

  display(staffs);
}

function display(staffs) {
  var tbodyEl = document.getElementById("tableDanhSach");
  var html = "";

  for (var i = 0; i < staffs.length; i++) {
    var staff = staffs[i];
    html += `<tr>
  <td>${staff.id}</td>
  <td>${staff.name}</td>
  <td>${staff.email}</td>
  <td>${staff.dateOfWorking}</td>
  <td>${staff.position}</td>
  <td>${staff.calTotalIncome()}</td>
  <td>${staff.getRank()}</td>
    <td>
    <button class='btn btn-success'onclick='deleteStaff("${staff.id}")'>Delete</button>
    <button class='btn btn-primary'data-toggle="modal" data-target="#myModal" onclick='updateStaff("${staff.id}")'>Update</button>
    
    </td>

  </tr>`;
  }

  tbodyEl.innerHTML = html;
}

function addNewStaff() {
  resetSpan();
  var id = document.getElementById("tknv").value;
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var dateOfWorking = document.getElementById("datepicker").value;
  var basicSalary = +document.getElementById("luongCB").value;
  var position = document.getElementById("chucvu").value;
  var hoursOfWorking = +document.getElementById("gioLam").value;

  var checkEmptyOrNot = checkIDblank();
  var checkDuplicateOne = checkDuplicate();
  if (!checkEmptyOrNot) {
    return;
  }
  if (!checkDuplicateOne) {
    return;
  }
  var staff = new Staff(
    id,
    name,
    email,
    password,
    dateOfWorking,
    basicSalary,
    position,
    hoursOfWorking
  );
  staffs.push(staff);

  localStorage.setItem("workers", JSON.stringify(staffs));
  display(staffs);
  resetForm();
  $("#myModal").modal("hide");
  console.log(staffs);
}

function resetForm() {
  document.getElementById("tknv").disabled =false
  document.getElementById('btnCapNhat').disabled=false


  document.getElementById("tknv").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("datepicker").value = "";
  document.getElementById("luongCB").value = "";
  document.getElementById("chucvu").value = "Chọn chức vụ";
  document.getElementById("gioLam").value = "";
  
}
function resetSpan() {
  document.getElementById("tbTKNV").innerHTML = "";
  document.getElementById("tbTen").innerHTML = "";
  document.getElementById("tbEmail").innerHTML = "";
  document.getElementById("tbMatKhau").innerHTML = "";
  document.getElementById("tbNgay").innerHTML = "";
  document.getElementById("tbLuongCB").innerHTML = "";
  document.getElementById("tbChucVu").innerHTML = "";
  document.getElementById("tbGiolam").innerHTML = "";
}
function blockCapNhat(){
  resetForm()
  resetSpan()
  document.getElementById('btnCapNhat').disabled=true

}
function checkDuplicate() {
  var id = document.getElementById("tknv").value;
  var email = document.getElementById("email").value;
  var isValid = true; 
  if (findIdStaff(id)!==-1){
    isValid =false;
    document.getElementById("tbTKNV").style.display = "block";
    document.getElementById("tbTKNV").innerHTML = "ID đã sử dụng, vui lòng nhập ID khác";
  }
  if (findEmailStaff(email)!==-1){
    isValid =false;
    document.getElementById("tbEmail").style.display = "block";
    document.getElementById("tbEmail").innerHTML = "Email đã sử dụng, vui lòng nhập email khác";
  }
  return isValid;
}
function checkIDblank(){
  var id = document.getElementById("tknv").value;
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var dateOfWorking = document.getElementById("datepicker").value;
  var basicSalary = +document.getElementById("luongCB").value;
  var position = document.getElementById("chucvu").value;
  var hoursOfWorking = +document.getElementById("gioLam").value;

  var isValid = true;
  if (!isRequired(id)) {
    isValid = false;
    document.getElementById("tbTKNV").style.display = "block";
    document.getElementById("tbTKNV").innerHTML = "ID không được để trống";
  }else if(!minMaxLimit(id.length,4,6)){
    document.getElementById("tbTKNV").style.display = "block";
    document.getElementById("tbTKNV").innerHTML = "ID phải từ 4 đến 6 kí tự";
  }
  if (!isRequired(name)) {
    isValid = false;
    document.getElementById("tbTen").style.display = "block";
    document.getElementById("tbTen").innerHTML = "Tên không được để trống";
  }
  if (!isRequired(email)) {
    isValid = false;
    document.getElementById("tbEmail").style.display = "block";
    document.getElementById("tbEmail").innerHTML = "Email không được để trống";
  }
  if (!isRequired(password)) {
    isValid = false;
    document.getElementById("tbMatKhau").style.display = "block";
    document.getElementById("tbMatKhau").innerHTML =
      "Mật Khẩu không được để trống";
  }
  if (!isRequired(dateOfWorking)) {
    isValid = false;
    document.getElementById("tbNgay").style.display = "block";
    document.getElementById("tbNgay").innerHTML =
      "Ngày làm không được để trống";
  }

  if (!isRequired(basicSalary)) {
    isValid = false;
    document.getElementById("tbLuongCB").style.display = "block";
    document.getElementById("tbLuongCB").innerHTML =
      "Lương không được để trống";
  }
  if(!minMaxLimit(basicSalary,1000000,20000000)){
    isValid = false;
    document.getElementById("tbLuongCB").style.display = "block";
    document.getElementById("tbLuongCB").innerHTML =
      "Lương phải từ 1,000,000 đến 20,000,000";
  }
  if (position === "Chọn chức vụ") {
    isValid = false;
    document.getElementById("tbChucVu").style.display = "block";
    document.getElementById("tbChucVu").innerHTML = "Vui Long chon chuc vu";
  }

  if (!isRequired(hoursOfWorking)) {
    isValid = false;
    document.getElementById("tbGiolam").style.display = "block";
    document.getElementById("tbGiolam").innerHTML =
      "Ngày làm không được để trống";
  }
  if(minMaxLimit(h))
return isValid
}
function isRequired(value) {
  if (!value) {
    return;
    false;
  }
  return true;
}

function deleteStaff(staffId) {
  var newIndex = findIdStaff(staffId);

  if (newIndex !== -1) {
    staffs.splice(newIndex, 1);
  }
  localStorage.setItem("workers", JSON.stringify(staffs));
  display(staffs);
}

function findIdStaff(staffId) {
  var index = -1;

  for (var i = 0; i < staffs.length; i++) {
    if (staffs[i].id === staffId) {
      index = i;
      break
    }
    
  }
  return index;
}
function minMaxLimit(value,min,max){
var isValid = false
if(min<=value && value <= max ){
  isValid = true
  return isValid
}
return isValid
}
function findEmailStaff(email) {
  var index = -1;

  for (var i = 0; i < staffs.length; i++) {
    if (staffs[i].email === email) {
      index = i;
      break
    }
    
  }
  return index;
}
function updateStaff(staffId) {
  resetForm()
  var index = findIdStaff(staffId);
  console.log(index)
  if (index !== -1) {
    var staff = staffs[index];
    document.getElementById("tknv").value = staff.id;
    document.getElementById("name").value = staff.name;
    document.getElementById("email").value = staff.email;
    document.getElementById("password").value = staff.password;
    document.getElementById("datepicker").value = staff.dateOfWorking;
    document.getElementById("luongCB").value = staff.basicSalary;
    document.getElementById("chucvu").value = staff.position;
    document.getElementById("gioLam").value = staff.hoursOfWorking;

    document.getElementById("btnThemNV").disabled = true;
    document.getElementById("tknv").disabled =true
  }
  resetSpan() 
  return;
}

function reUpdate() {

  var id = document.getElementById("tknv").value;
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var dateOfWorking = document.getElementById("datepicker").value;
  var basicSalary = +document.getElementById("luongCB").value;
  var position = document.getElementById("chucvu").value;
  var hoursOfWorking = +document.getElementById("gioLam").value;

  var isValid = checkIDblank()
  if(!isValid){
    return
  }
  var staff = new Staff(id,
    name,
    email,
    password,
    dateOfWorking,
    basicSalary,
    position,
    hoursOfWorking)

    var index = findIdStaff(staff.id)
    if(index!== -1) {
      staffs[index] = staff
    }
    localStorage.setItem('workers',JSON.stringify(staffs))
    
    $("#myModal").modal("hide");
    display(staffs)
}



