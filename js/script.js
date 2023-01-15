let doc = document,
	restartButton = doc.getElementById('restart'),
	refreshButton = doc.getElementById("refresh"),
	timer = doc.getElementById("timer"),
	input = doc.querySelector(".main_content input"),
	main = doc.getElementsByTagName("main")[0],
	typedCount = doc.getElementById("percentage"),
	mistakesCount = doc.getElementById("mistakes"),
	cpm = doc.getElementById("cpm"),
	wpm = doc.getElementById("wpm"),
	textField = doc.querySelector(".text_field p"),
	charIndex = 0,
	characters = [],
	mistakesInd = [],
	secLeft = 60,
	interId = 0,
	mistakes = 0, wpmCounter = 0
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
		started = false
        textField.innerText = data.content
		characters = convert()
		input.value = ''
		charIndex = 0
		typedCount.innerText = charIndex
		cpm.innerText = 0
		secLeft = 60
		timer.innerText = secLeft
    })
}
function refresh(){
	loadQuote()
	charIndex = 0
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
function stylizeLetter(s, flag, right = true){
	if(flag){
		if(right){
			s.backgroundColor = "#413b4b"
			s.color = "green"
		}
		else{
			s.backgroundColor = "red"
			s.color = 'black'
		}
	}
	else{
		s.backgroundColor = "transparent"
		s.color = "black"
	}
}
window.onload = ()=>{
	reset()
	doc.addEventListener(("keydown"), () => input.focus())
	textField.addEventListener(("click"), () => input.focus())
	setInterval(()=>{
		if(started){
			secLeft--
			timer.innerText = secLeft
		}
	}, 1000)
	input.addEventListener(("input"), ()=>{
			if(input.value[charIndex]){
				if(secLeft > 0){
					if(!started) started = true
					if(charIndex !== characters.length-1){
						if(characters[charIndex] === input.value[charIndex]){
							stylizeLetter(textField.children[charIndex].style, true, true)
						}
						else{
							stylizeLetter(textField.children[charIndex].style, true, false)
							mistakes++
							mistakesInd.push(charIndex)
							mistakesCount.innerText = mistakes
						}
					}
					else{
						input.value = input.value.slice(0, charIndex+1)
						if(mistakes === 0) reset()
						return
					} 
				}
				else reset()
				charIndex++
				typedCount.innerText = charIndex
				cpm.innerText = charIndex - mistakes
				let wpmVal = Math.round((((charIndex - mistakes) / 5) / (60 - secLeft)) * 60)
				wpmVal = !wpmVal || wpmVal === Infinity ? 0 : wpmVal
				wpm.innerText = wpmVal
			}
			else{
				charIndex === 0 ? charIndex : charIndex--
				if(mistakesInd.includes(charIndex)){
					mistakesInd = mistakesInd.filter(el => el != charIndex)
					mistakes--
					mistakesCount.innerText = mistakes
				}
				stylizeLetter(textField.children[charIndex].style, false)
			}
	})
	refreshButton.addEventListener(('click'), refresh)
	restartButton.addEventListener(('click'), reset)
}
