let messages = [];
let newUser;

function startChat() {
    setInterval(loadMessages,3000);
    setInterval(keepActive,5000);
}

function keepActive() {
    axios.post("https://mock-api.driven.com.br/api/v6/uol/status", {name: newUser});
}

function login() {
    //document.querySelector(".homeScreen").classList.remove("hidden");
    //document.querySelector(".mainScreen").classList.add("hidden");
    //let newUser = document.querySelector(".username").value;
    newUser = prompt("Qual o seu nome?");
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", {name: newUser});
    promise.then(startChat);
    promise.catch(loadMessages);
}

function resetPage() {
    window.location.reload();
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

function sendMessage () {
    let textMessage = document.querySelector(".messageSent").value;
    let newMessage = {
        from: newUser,
        to: "Todos",
        text: textMessage,
        type: "message"
    };
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", newMessage);
    if (textMessage) {
        promise.then(messageSentSuccess);
        promise.catch(resetPage);
    } else {
        alert("Escreva a mensagem")
    }
}

function messageSentSuccess() {
    document.querySelector(".messageSent").value = " ";
    loadMessages();
}

login();