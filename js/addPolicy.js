const   sideBarBtn = document.querySelector('.side-bar__btn'),
        sideBar = document.querySelector('.side-bar'), 
        pageContent =document.querySelector('.global__content'), 
        visitedPage = document.querySelectorAll('.global-item'),
        userDropdown = document.querySelector('.global__auth'),
        userBtn = document.querySelector('.user__dropdown-btn'),
        dropdownList = document.querySelector('.side-bar__settings'),
        dropdownBtn = document.querySelector('.side-bar__dropdown-btn'), 
        selectBtns = document.querySelectorAll('.select__btn'),
        sideBarSet = '.side-bar__settings',
        selectParent = '.select',
        selectItems = document.querySelectorAll('.select__item'),
        addPolicyContent = document.querySelector('.add-policy');
        renamePolicy = document.querySelector('.policy__edit-icon'),
        namePolicy = document.querySelector('.policy__name'),
        policyItems = document.querySelectorAll('.commonly__item'),
        policyScroll = document.querySelector('.commonly__list'),
        samplesAdd  = document.querySelectorAll('.commonly__item-plus'),
        globalSearch = document.querySelector('.global__search-input'),
        globalSearchDropdown = document.querySelector('.global__search-dropdown');
        
globalSearch.addEventListener('input', () => { 
    if(globalSearch.value.length > 0){
        globalSearchDropdown.classList.add('active');
        setTimeout(()=> {
            globalSearchDropdown.classList.add('show');
        }, 100)
    }else {
        globalSearchDropdown.classList.remove('show');
        setTimeout(()=> {
            globalSearchDropdown.classList.remove('active');
        }, 100)
    }
}) 


sideBarBtn.addEventListener('click', () => {
    sideBar.classList.toggle('active'); 
        if(sideBar.classList.contains('active')){  
            pageContent.style.marginLeft = "275px"; 
            addPolicyContent.classList.add('change')
    }else {  
        dropdownList.classList.remove('active')
        pageContent.style.marginLeft = "65px";  
        addPolicyContent.classList.remove('change')
    }
}); 
dropdownBtn.addEventListener('click', () => {
    dropdownList.classList.toggle('active'); 
    if(dropdownList.classList.contains('active')){
        sideBar.classList.add('change-height')
    }else sideBar.classList.remove('change-height')
})

userBtn.addEventListener('click', () => {
    userDropdown.classList.toggle('open')
});

visitedPage.forEach(item => {
    item.addEventListener('click', ()=> {
        visitedPage.forEach(elem => {
            elem.classList.remove('visited')
            if(elem.closest(sideBarSet)){
                elem.closest(sideBarSet).classList.remove('visited')
            }
        })
        if(item.closest(sideBarSet)){ 
            item.closest(sideBarSet).classList.add('visited')
        }
        item.classList.add('visited')
    })
})

const policies = {
    sale: {
        name: "Sale",
        select1: "Do not accept",
        select2: "Only Return",
        select3: "Only Exchange"
    },
    value: {
        name: "Value",
        select1: "Only Return",
        select2: "Do not accept",
        select3: "Only Return"
    },
    country: {
        name: "Country",
        select1: "Only Exchange",
        select2: "Do not accept",
        select3: "Only Return"
    },
    time: {
        name: "Time",
        select1: "Do not accept",
        select2: "Only Exchange",
        select3: "Do not accept"
    },
} 
    
  
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
        let example = sample.closest('.commonly__item').getAttribute('data-policy'),
            selects = document.querySelectorAll(selectParent); 
        namePolicy.innerHTML = policies[example].name; 
        for(let i = 0; i < selects.length; i++){
            selects[i].querySelector('.select__btn').textContent = policies[example]["select"+ [i+1]]
        } 
    })
})