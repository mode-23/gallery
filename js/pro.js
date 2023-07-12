var boxMode = document.querySelectorAll('.productName');
var filterProduct = document.querySelectorAll('.filterProduct');
var searchProduct = document.querySelector('.searchProduct');
let numberOfAvailableProducts = document.querySelector('.numberOfAvailableProducts');
let sectionName = document.querySelector('.sectionName');
var arrayd = [];
searchProduct.addEventListener('input', searchHandle);

function searchHandle (e){
     const value = e.target.value.toLowerCase();
     boxMode.forEach(box =>{
       if(box.innerHTML.toLowerCase().includes(value)){
         box.parentElement.classList.remove('hide');
       }else{
         box.parentElement.classList.add('hide');
       }
     })
     checkBox.forEach(box =>{
        box.classList.remove('active');
   })
        checkBox[0].classList.add('active');
        sectionName.innerHTML = '(all products)';
   numberOfAvailableProducts.innerHTML = parseInt(filterProduct.length) -  parseInt(document.querySelectorAll('.hide').length);
   checkIfNoResult(value);
   checkproduct();
   checkParity();
   checkInput(value);
}

numberOfAvailableProducts.innerHTML = parseInt(filterProduct.length) -  parseInt(document.querySelectorAll('.hide').length);
function checkIfNoResult(value) {
     if(numberOfAvailableProducts.innerHTML == 0){
          document.querySelector('.result').classList.remove('active');
     }else{
          document.querySelector('.result').classList.add('active');
     }
     document.querySelector('.finalResult').innerHTML = `"${value}"`; 
}
let checkBox = document.querySelectorAll('.checkBox');
checkBox.forEach(box =>{
     box.addEventListener('click', activeBox)
     box.addEventListener('click', filterBrand)
     // box.addEventListener('click', filterCheckBox)
})
function activeBox(){
     checkBox.forEach(box =>{
          box.classList.remove('active');
     })
     this.classList.toggle('active');
}

function filterBrand(e){
if (e.target.classList.contains('active')) {
     filterProduct.forEach(pro =>{
          pro.classList.add('hide');
     })
     document.querySelectorAll(this.dataset.type).forEach(element =>{
          element.classList.remove('hide');
     })
numberOfAvailableProducts.innerHTML = +filterProduct.length - +document.querySelectorAll('.hide').length ;
sectionName.innerHTML = `(${e.target.closest('.checkBoxHolder').querySelector('.checkBoxName').innerHTML})`;
checkproduct();
searchProduct.value = '';
}
}
let filterHeader = document.querySelectorAll('.filterHeader-1');
filterHeader.forEach(filter =>{
     filter.addEventListener('click', openBody)
});
function openBody(e){
 let thisHeader = e.target.closest('.filterBox');
 let icon = thisHeader.querySelector('.icon');
 thisHeader.classList.toggle('active');
 icon.classList.toggle('active')
 //icon
}
let checkBoxCount = document.querySelectorAll('.checkBoxCount');
checkBoxCount.forEach(check =>{
     let checkBoxHolder = check.closest('.checkBoxHolder');
     let checkBoxInner = checkBoxHolder.querySelector('.checkBox').dataset.type;
     let numberPro = document.querySelectorAll(checkBoxInner).length;
     check.innerHTML = `(${numberPro})`;
});
let productOrProducts = document.querySelector('.productOrProducts')
function checkproduct(){
     if(+numberOfAvailableProducts.innerHTML != 1){
          productOrProducts.innerHTML = 'products';
     }else{
          productOrProducts.innerHTML = 'product';
     }
}
checkproduct();
searchProduct.addEventListener('focus', ()=>{
     document.querySelector('.searchHolder-1').classList.add('focused');
})
searchProduct.addEventListener('blur', ()=>{
     document.querySelector('.searchHolder-1').classList.remove('focused');
})
let hideShowFilter = document.querySelector('.hideShowFilter');
let filterMood = 'hidden';
hideShowFilter.addEventListener('click', ()=>{
     document.querySelector('.filterBody').classList.toggle('active');
     if(filterMood == 'hidden'){
          hideShowFilter.innerHTML = 'show filter';
          filterMood = 'shown';
     }else if(filterMood == 'shown'){
          hideShowFilter.innerHTML = 'hide filter';
          filterMood = 'hidden';
     }
})

let select = document.querySelector('.select');
select.addEventListener('input', sortFilter)
function sortFilter(){
if(select.value == 'default'){
     for (let i = 0; i < filterProduct.length; i++) {
          filterProduct[i].style.order = 1;
     }
}else if(select.value == 'low-high'){
     for (let i = 0; i < filterProduct.length; i++) {
          filterProduct[i].style.order = parseFloat(filterProduct[i].querySelector('.productPrice').innerHTML.replace('$', '')).toFixed(0);
     }
}else if(select.value == 'high-low'){
for (let i = 0; i < filterProduct.length; i++) {
     filterProduct[i].style.order = `-${parseInt(filterProduct[i].querySelector('.productPrice').innerHTML.replace('$', ''))}`;
}
}else if(select.value == 'a-z'){
     for (let i = 0; i < filterProduct.length; i++) {
          filterProduct[i].style.order = filterProduct[i].querySelector('.productName').innerHTML.toLowerCase().charCodeAt(0);
     }
}else if(select.value == 'z-a'){
     for (let i = 0; i < filterProduct.length; i++) {
          filterProduct[i].style.order = `-${filterProduct[i].querySelector('.productName').innerHTML.toLowerCase().charCodeAt(0)}`;
     }
}
}
function checkParity(){
     if(+numberOfAvailableProducts.innerHTML % 2 == 0){
          filterProduct[filterProduct.length -1].style.borderBottom = '1px solid transparent';
          filterProduct[filterProduct.length -2].style.borderBottom = '1px solid transparent';
     }else if(+numberOfAvailableProducts.innerHTML % 2 == 1 && +numberOfAvailableProducts.innerHTML != 1 ){
          filterProduct[filterProduct.length -1].style.borderBottom = '1px solid transparent';
          filterProduct[filterProduct.length -2].style.borderBottom = '1px solid var(--dark-color)';
     }
}
filterProduct[filterProduct.length -1].style.borderBottom = '1px solid transparent';
filterProduct[filterProduct.length -2].style.borderBottom = '1px solid transparent';
function checkInput(value){
     if(value != ''){
     document.querySelector('.closeSearch').style.display = 'block';
     }else{
     document.querySelector('.closeSearch').style.display = 'none';
     }
}
document.querySelector('.closeSearch').addEventListener('click', ()=>{
     location.reload();
})