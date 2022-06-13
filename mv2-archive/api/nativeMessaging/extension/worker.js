var port = null;

// Open the extension page
chrome.tabs.create({ url: chrome.runtime.getURL("main.html") });

// Listen for messages from the extension page
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "connect") {
    var hostName = "com.google.chrome.example.echo";
    appendMessage("Connecting to native messaging host <b>" + hostName + "</b>")
    port = chrome.runtime.connectNative(hostName);
    port.onMessage.addListener(onNativeMessage);
  } else if (msg.type === "sendMessage") {
    port.postMessage(msg.data);
    appendMessage("Sent message: <b>" + JSON.stringify(msg.data) + "</b>");
  }
})

function onNativeMessage(message) {
  appendMessage("Received message: <b>" + JSON.stringify(message) + "</b>");
}

function appendMessage(message) {
  chrome.runtime.sendMessage({ type: "appendMessage", data: message });
}
