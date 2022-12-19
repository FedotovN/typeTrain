let doc = document,
	restartButton = doc.getElementById('restart'),
	refreshButton = doc.getElementById("refresh"),
	timer = doc.getElementById("timer"),
	input = doc.querySelector("main input"),
	main = doc.getElementsByTagName("main")[0],
	typedCount = doc.getElementById("percentage"),
	mistakesCount = doc.getElementById("mistakes"),
	cpm = doc.getElementById("cpm"),
	textField = doc.querySelector(".text_field p"),
	charIndex = 0,
	characters = [],
	secLeft = 60,
	interId = 0,
	mistakes = 0, wpmCounter = 0,
	currStr = [],
	flag = false
function convert(){
	let characters = []
	let res = '';
	for(let i = 0; i < textField.innerText.length; i++){
		res += `<span>${textField.innerText[i]}</span>`
		characters.push(textField.innerText[i])
	}
	textField.innerHTML = `${res}`
	return characters
}
function loadQuote(){
    const url = "https://api.quotable.io/random"
    fetch(url)
    .then(response=>{
        if(response.ok){
            return response.json()
        }
        else{
            console.log(response.status)
        }
    })
    .then(data=>{
        textField.innerText = data.content
		characters = convert()
		secLeft = Math.floor(characters.length * .6)
		timer.innerText = secLeft
    })
}
function refresh(){
	loadQuote()
	charIndex = 0
	console.log(charIndex)
}
function reset(){
	loadQuote()
	clearInterval(interId)
	charIndex = 0,
	mistakes = 0, cpmCounter = 0, wpmCounter = 0,
	flag = false;
	mistakesCount.innerText = mistakes
	typedCount.innerText = '0'
	cpm.innerText = cpmCounter
}
window.onload = ()=>{
	setInterval(()=>{
		cpm.innerText = currStr.length * 60
		currStr = []
	}, 1000)
	reset()
	doc.addEventListener(("keydown"), () => input.focus())
	textField.addEventListener(("click"), () => input.focus())
	input.addEventListener(("input"), ()=>{
		if(!flag){
			flag = true
			interId = setInterval(()=>{
				secLeft-=1
				timer.innerText = secLeft
				if(secLeft <= 0) reset()
			}, 1000)

		}
		if(secLeft > 0){
			if(input.value === characters[charIndex]){
				if(charIndex === characters.length-1){
					refresh()
					return
				}
				if(charIndex > 0){
					textField.children[charIndex-1].style.border = "none"
					textField.children[charIndex].style.padding = "0"
				}
				textField.children[charIndex].style.color = "rgb(158, 245, 122)"
				textField.children[charIndex].style.backgroundColor = "#413b4b"
				if(charIndex < characters.length - 1){
					textField.children[charIndex+1].style.borderBottom = "1.5px solid #413b4b"
					textField.children[charIndex+1].style.padding = "2px"
				}
				charIndex += 1
				typedCount.innerText = charIndex+1
				currStr.push(input.value)
			}
			else{
				textField.children[charIndex].style.color = "red"
				mistakes += 1
				mistakesCount.innerText = mistakes
			}
			input.value = ''
		}
	})
	refreshButton.addEventListener(('click'), refresh)
	restartButton.addEventListener(('click'), reset)
}