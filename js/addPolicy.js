const   sideBarBtn = document.querySelector('.side-bar__btn'),
        sideBar = document.querySelector('.return__aside'),
        closeSideBar = document.querySelector('.over__box'),
        body = document.querySelector('.return__body'),
        selectBtns = document.querySelectorAll('.select__btn'),
        selectParent = '.select',
        selectItems = document.querySelectorAll('.select__item'),
        renamePolicy = document.querySelector('.policy__edit-icon'),
        namePolicy = document.querySelector('.policy__name'),
        policyItems = document.querySelectorAll('.commonly__item'),
        policyScroll = document.querySelector('.commonly__list'),
        samplesAdd  = document.querySelectorAll('.commonly__item-plus');

 
    
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
let itemCount = 4;
function listHeight() {
    if(policyItems.length > itemCount){
        
        let  marginB = window.getComputedStyle(policyItems[0], null).getPropertyValue("margin-bottom"),
            borderSize = parseInt(window.getComputedStyle(policyItems[0], null).getPropertyValue("border").split(' ')[0]),
            heightSum = 0; 
            for(let i = 0; i < itemCount; i++) { 
                heightSum +=  policyItems[i].clientHeight
            } 
        policyScroll.style.height = `${(heightSum + borderSize * 2 * itemCount) + (parseInt(marginB) * (itemCount - 1)) }px`
    }
} 
listHeight() 
window.addEventListener('resize', () => {
    listHeight();
})
let clicked = true;
renamePolicy.addEventListener('click', () => {
    if(clicked){
        console.log(clicked, "0");
        namePolicy.classList.add('rename')
        clicked = false;
        namePolicy.setAttribute('contenteditable', true);
        namePolicy.addEventListener('keydown', (e) => {
            if(e.keyCode === 13 ){  
                console.log(clicked, "1"); 
                rename ()   
            }
        })
        
    }else {  
        console.log(clicked, "2");
        rename ()
    }
   
   
})

function rename() {
        clicked = true;
        let newName = namePolicy.innerHTML.replace(/\&nbsp;/g,'').trim() 
        if(newName === ""){
            namePolicy.innerHTML = namePolicy.getAttribute('data-default-name')
        }else {
            newName = newName.charAt(0).toUpperCase() + newName.slice(1);
            namePolicy.innerHTML = newName
        }
        namePolicy.removeAttribute('contenteditable'); 
        namePolicy.classList.remove('rename'); 
        console.log(clicked, "3");
        return
}


samplesAdd.forEach(sample => {
    sample.addEventListener('click', () => {
        namePolicy.innerHTML = sample.previousElementSibling.innerHTML
    })
})