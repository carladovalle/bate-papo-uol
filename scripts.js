let messages = [];

loadMessages();

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
    console.log(messages);
    if (messages[i].type === "status") {
        ulMessages.innerHTML += `
            <div class="message status">
                <div class="hour">(${messages[i].time})</div>
                <div class="messageContent">${messages[i].from} ${messages[i].text}</div>
            </div>   
            `
    } else if (messages[i].type === "message") {
        ulMessages.innerHTML += `
        <div class="message normal">
            <div class="hour">(${messages[i].time})</div>
            <div class="messageContent">${messages[i].from} para ${messages[i].to}: ${messages[i].text}</div>
        </div>
        `
    } else {
        ulMessages.innerHTML += `
        <div class="message reserved">
            <div class="hour">(${messages[i].time})</div>
            <div class="messageContent">${messages[i].from} para ${messages[i].to}: ${messages[i].text}</div>
        </div>
        `
    }
    }
}