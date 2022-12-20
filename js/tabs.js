let mainTab = doc.getElementById("openMain"),
    settingsTab = doc.getElementById("openSettings"),
    mainContainer = doc.getElementsByClassName('tabs_content_container')[0],
    tabsList = [mainTab, settingsTab]

function setActive(name){
    for(let i = 0; i < mainContainer.children.length; i++){
        let currNode = mainContainer.children[i]
        if(currNode.classList.contains(name)){
            tabsList[i].classList.remove("inactive")
            tabsList[i].classList.add("active")
            currNode.classList.add("active_container")
            currNode.classList.remove("inactive_container")
        }
        else{
            tabsList[i].classList.remove("active")
            tabsList[i].classList.add("inactive")
            currNode.classList.remove("active_container")
            currNode.classList.add("inactive_container")
        }
    }
}
setActive("main_content")

settingsTab.addEventListener(('click'), ()=>{setActive("settings_content")})
mainTab.addEventListener(('click'), ()=>{setActive("main_content")})