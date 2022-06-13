// Copyright 2013 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function appendMessage(text) {
  document.getElementById('response').innerHTML += "<p>" + text + "</p>";
}

function sendNativeMessage() {
  message = {"text": document.getElementById('input-text').value};
  chrome.runtime.sendMessage({ type: "sendMessage", data: message });
}

function connect() {
  chrome.runtime.sendMessage({ type: "connect" });
}

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "appendMessage") appendMessage(msg.data);
});

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('connect-button').addEventListener(
      'click', connect);
  document.getElementById('send-message-button').addEventListener(
      'click', sendNativeMessage);
});
