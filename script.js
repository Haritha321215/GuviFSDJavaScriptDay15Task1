let current_page = 1;
let records_per_page = 5;

let objJson = [];

const url =
  "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json"; // Replace with your API endpoint
fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    for (let i = 0; i < data.length; i++) {
      //console.log(data[i].name);
      objJson.push(data[i]);
    }
  });

function prevPage() {
  //console.log(current_page);
  if (current_page > 1) {
    current_page--;
    changePage(current_page);
  }
}

function nextPage() {
  // console.log(current_page);
  if (current_page < numPages()) {
    current_page++;
    changePage(current_page);
  }
}

function currPage(p){
  //console.log(p);
  current_page=p;
  changePage(p);
}


function paginationButtons(){
  let paginationdiv=document.getElementById("buttons");
  let buttondiv=document.createElement('div');
  buttondiv.id="buttundiv";

  let pevbutn=document.createElement('a');
  pevbutn.href="javascript:prevPage()";
  pevbutn.id="btn_prev";
  pevbutn.textContent="Previous";
  buttondiv.appendChild(pevbutn);

  let firstbutn=document.createElement('a');
  firstbutn.href=`javascript:changePage(1)`;
  firstbutn.id="btn_first";
  firstbutn.textContent="First";
  buttondiv.appendChild(firstbutn);  

  for(let i=1;i<(numPages()-1);i++){
    let pagebutton=document.createElement('a');
    let p = i+1;
    pagebutton.href=`javascript:currPage(${p})`;
    pagebutton.textContent=i+1;
    buttondiv.appendChild(pagebutton);
  }

  let lastbutn=document.createElement('a');
  lastbutn.href=`javascript:changePage(${numPages()})`;
  lastbutn.id="btn_last";
  lastbutn.textContent="Last";
  buttondiv.appendChild(lastbutn);

  let nextbutn=document.createElement('a');
  nextbutn.href="javascript:nextPage()";
  nextbutn.id="btn_next";
  nextbutn.textContent="Next";
  buttondiv.appendChild(nextbutn);

  paginationdiv.appendChild(buttondiv);  
}
function changePage(page) {
  // let buttondiv=document.getElementById("buttons");
  
  let btn_next = document.getElementById("btn_next");
  let btn_prev = document.getElementById("btn_prev");
  let listing_table = document.getElementById("table");
  table.innerHTML = "";
  let page_span = document.getElementById("page");

  let thead=document.createElement('thead');
  let th=document.createElement('th');
  th.textContent="Details of users";
  thead.append(th);

  let tbody=document.createElement('tbody');
  

  listing_table.append(thead,tbody);

  // Validate page
  if (page < 1) page = 1;
  if (page > numPages())
   page = numPages();

  
 
  for (let i = (page - 1) * records_per_page;i < page * records_per_page;i++) {
    let td=document.createElement('td');  
    td.innerHTML += `Id: ${objJson[i].id}, Name:${objJson[i].name}, Email: ${objJson[i].email}` + "<br>";
    tbody.append(td);
  }
  
  page_span.innerHTML = page;
  current_page=page;
  if (page == 1) {
    btn_prev.style.visibility = "hidden";
  } else {
    btn_prev.style.visibility = "visible";
  }

  if (page == numPages()) {
    btn_next.style.visibility = "hidden";
  } else {
    btn_next.style.visibility = "visible";
  }
  
  
}

function numPages() {
  return Math.ceil(objJson.length / records_per_page);
}

window.onload = function() {
  paginationButtons();
  changePage(current_page);
  
};
