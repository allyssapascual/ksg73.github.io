'use strict';

const el = {};

async function loadLinks() {
  const response = await fetch('api/links');
  let links;
  if (response.ok) {
    links = await response.json();
    console.log(links)
  } else {
    links = [{ msg: 'failed to load links' }];
  }
}

async function checkInputs() {
  if ((el.inst.value != '') && (el.link.value != '')) {
    sendLink();
  } else {
    if (el.inst.value == '') {
      el.inst.placeholder = 'add institution name!';
    }
    if (el.link.value == '') {
      el.link.placeholder = 'add link!';
    }
  }
}

async function sendLink() {
  const payload = {
    inst: el.inst.value,
    link: el.link.value,
    country: el.country.value,
  };
  console.log('Payload', payload);

  const response = await fetch('api/links', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    el.inst.value = '';
    el.link.value = '';
    // const updatedMessages = await response.json();
    // showMessages(updatedMessages, el.messagelist);
  } else {
    console.log('failed to send message', response);
  }
}

function prepareHandles() {
  el.inst = document.querySelector('#institution');
  el.link = document.querySelector('#link');
  el.country = document.querySelector('#country');
  el.send = document.querySelector('#send');
}

function addEventListeners() {
  el.send.addEventListener('click', checkInputs);
}

function pageLoaded() {
  prepareHandles();
  addEventListeners();
  loadLinks();
}

window.addEventListener('load', pageLoaded);
