let messages = [];
let newUser;

function startChat() {
    loadMessages();
    setInterval(loadMessages,3000);
}

function login() {
    document.querySelector(".homeScreen").classList.add("hidden");
    document.querySelector(".mainScreen").classList.remove("hidden");
    const newUser = document.querySelector(".username").value;
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", {name: newUser});
    promise.then(loadMessages);
    promise.catch(handleErrorLogin);
}

function handleErrorLogin(error) {
    console.log(error.response);
    if (error.response.status === 400) {
        alert("Esse usuario já esta cadastrado.")
    }
}

function loadMessages() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(loadData);
}

function loadData(response) {
    messages = response.data;
    renderMessages();
}

function renderMessages() {
    const ulMessages = document.querySelector(".container");
    ulMessages.innerHTML = "";
    for (let i = 0; i < messages.length; i++) {
        if (messages[i].type === "status") {
            ulMessages.innerHTML += `
                <li class="message status">
                    <div class="hour">(${messages[i].time})</div>
                    <div class="messageContent">${messages[i].from} ${messages[i].text}</div>
                </li>   
                `
        } else if (messages[i].type === "message") {
            ulMessages.innerHTML += `
            <li class="message normal">
                <div class="hour">(${messages[i].time})</div>
                <div class="messageContent">${messages[i].from} para ${messages[i].to}: ${messages[i].text}</div>
            </li>
            `
        } else {
            ulMessages.innerHTML += `
            <li class="message reserved">
                <div class="hour">(${messages[i].time})</div>
                <div class="messageContent">${messages[i].from} reservadamente para ${messages[i].to}: ${messages[i].text}</div>
            </li>
            `
        }
    }
    scrollToTheEnd();
}

function scrollToTheEnd() {
    const lastMessageSent = document.querySelector(".container li:last-child");
    lastMessageSent.scrollIntoView();
}

startChat();