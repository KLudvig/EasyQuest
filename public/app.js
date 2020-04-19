//Shows div for new question and toggles button effects
const addNew = () => {
    document.getElementById("newQuestion").classList.toggle("hide");
    document.getElementById("newQuestion").classList.toggle("show");
    document.getElementById("buttonNew").classList.toggle("xButton");
    if(document.getElementById("buttonNew").classList == "xButton") {
        document.getElementById("buttonNew").innerHTML = 'X'}
    else {
        document.getElementById("buttonNew").innerHTML = 'Add question'}
}


//*** Add new survey ***
//Show text input to create new survey
const newQuizButton = () => {
    document.getElementById("addQuizContainer").classList.toggle("aniAddQuiz");
    document.getElementById("buttonNewQuiz").classList.toggle("hideQuizButton");
}
//Save survey and generate the question creator
const newQuiz = () => {
    const name = document.getElementById("surveyName").value
    fetch(`/home/addSurvey/${name}`)
    .then(() => {
    console.log()
    const emptyQuestion = `<button id="buttonNew" onclick="addNew()">Add question</button>
    <div id="newQuestion" class="hide">
        <input id="qName" type="text" placeholder="Write your question">
        <span style="color: #33bdb0;font-weight: 600;">Add answers</span>
        <ul style="list-style-type:none; padding-bottom: 20px;">
        <li><input class="answer" id="oneValue" type="text" placeholder="Answer 1"></li>
        <li><input class="answer" id="twoValue" type="text" placeholder="Answer 2"></li>
        <li><input class="answer" id="threeValue" type="text" placeholder="Answer 3"></li>
        </ul>
        <button class="buttonAdd" onclick="newQuestion()">Add</button>
    </div>`
    const h1 = document.getElementsByTagName('h1')[0];
    h1.innerHTML = name;
    document.getElementById('emptyQuestion').innerHTML = emptyQuestion;
    document.getElementById('questList').classList.add("hideList");
    document.getElementById("addQuizContainer").classList.add("hide");
    document.getElementById('finishButtonDiv').classList.remove("hide");
    document.getElementById('finishButtonDiv').classList.add("show");
    })
}


//*** Add new question ***
const newQuestion = () => {
    //Get question data and send to server for saving to database
    let survey = document.getElementsByTagName('h1')[0].innerHTML
    let question = document.getElementById("qName").value
    let ans1 = document.getElementById("oneValue").value
    let ans2 = document.getElementById("twoValue").value
    let ans3 = document.getElementById("threeValue").value
    
    const data = {"survey": survey, "question": question, "ans1": ans1,"ans2": ans2, "ans3": ans3}
    const options = {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)};
    fetch('/home/addSurvey/saveQ', options)
    .then((data) => {

    //Create HTML and add question to list
   if(document.querySelector('.questContainer').classList.contains("hide")) {
    document.querySelector('.questContainer').classList.remove("hide")
    document.querySelector('.questContainer').classList.add("show")
   }
    let insideQuest = `<div class="question"><span style="color: #33bdb0;font-weight: 600;">${question}</span><ul style="list-style-type:none; padding-bottom: 20px;text-align:left;">
    <li style="padding: 5%;padding-bottom: 2px;"><span> ${ans1}</span></li>
    <li style="padding: 5%;padding-bottom: 2px;"><span> ${ans2}</span></li>
    <li style="padding: 5%;padding-bottom: 2px;"><span> ${ans3}</span></li>
    </ul></div>`
    let questWrap = `<div class="questWrap">${insideQuest}</div>`
    const addDiv = document.createElement('div');
    addDiv.innerHTML = questWrap;
    document.querySelector('.questContainer').appendChild(addDiv.firstChild);
    
    //Empty new question data
    document.getElementById("qName").value = "";
    document.getElementById("oneValue").value = "";
    document.getElementById("twoValue").value = "";
    document.getElementById("threeValue").value = "";
    
    //Change button for question
    document.getElementById("newQuestion").classList.toggle("hide");
        document.getElementById("buttonNew").classList.toggle("xButton");
        if(document.getElementById("buttonNew").classList == "xButton") {
            document.getElementById("buttonNew").innerHTML = 'X'
        }
        else {
            document.getElementById("buttonNew").innerHTML = 'Add question'
        }
})
}


//*** Delete Survey ***
const deleteSurvey = (clickedId) => {
const data = {"survey": clickedId}
const options = {
    method: 'DELETE', 
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)};
fetch('/home/deleteSurvey', options)
.then(() => {
    document.querySelector(`.a${clickedId}`).classList.add("hide") //"a" is used because css class cant start with number
    })
}


//*** Copy URL for survey ***
    const popupShow = (urlString) => {
        document.querySelector('.popupBackground').style.display = "block";
        let textInput = document.getElementById("urlToCopy");
        textInput.value = urlString
    }
    const closePopup = () => document.querySelector('.popupBackground').style.display = "none";
    const copyUrl = () => {
    let url = document.getElementById("urlToCopy");
    url.select();
    url.setSelectionRange(0, 99999)
    document.execCommand("copy");
    }