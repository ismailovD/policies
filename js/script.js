const   sideBarBtn = document.querySelector('.side-bar__btn'),
        sideBar = document.querySelector('.return__aside'),
        closeSideBar = document.querySelector('.over__box'),
        body = document.querySelector('.return__body'),
        selectBtns = document.querySelectorAll('.select__btn'),
        selectParent = '.select',
        selectItems = document.querySelectorAll('.select__item'),
        allChecked = document.querySelector('#all-check'),
        allCheckbox =document.querySelectorAll('.table__check-input'),
        deletePolicy = document.querySelector('.policies__delete'),
        tableRow = '.table__row',
        renamePolicy = document.querySelector('.policy__edit'),
        namePolicy = document.querySelector('.policy__name');
 
    
sideBarBtn.addEventListener('click', () => {
    sideBar.classList.toggle('active'); 
    body.style.overflow ="hidden"
});
closeSideBar.addEventListener('click', (e) => {
     if(e.target == closeSideBar){
        sideBar.classList.remove('active'); 
        body.style.overflow ="visible"
     }
 })

selectBtns.forEach(btn => { 
    btn.addEventListener('click', () => {  
        document.querySelectorAll(selectParent).forEach(parent => {
            if(btn.closest(selectParent) != parent){
                parent.classList.remove('show-select')
            }
        })
        btn.closest(selectParent).classList.toggle('show-select') 
    });
})
 
 

selectItems.forEach(item => {
     item.addEventListener('click', () => {
        selectItems.forEach(el => {
            el.classList.remove('item-selected')
        })
        item.classList.add('item-selected'); 
        item.closest(selectParent).children[0].textContent = item.getAttribute('data-value');
        item.closest(selectParent).classList.remove('show-select')
     })
})
allChecked.addEventListener('click',() => {
     if(allChecked.checked){
        allCheckbox.forEach(check => {
            check.checked = true
        })
     }else {
        allCheckbox.forEach(check => {
            check.checked = false
        })
     } 
 })

 deletePolicy.addEventListener('click', () => {
    allCheckbox.forEach(inp => {
        if(inp.checked){
            inp.closest(tableRow).remove();
        }
    })
 })

 