// Copyright 2018 Google LLC.
// SPDX-License-Identifier: Apache-2.0
let latitude = '40.741';
let longitude = '-74.002';

const step1Button = document.querySelector('#step1-button');
const step2Button = document.querySelector('#step2-button');
step2Button.disabled = true;

step1Button.addEventListener('click', () => {
  step1Button.disabled = true;
  navigator.geolocation.getCurrentPosition(
    (position) => {
      latitude = position.coords.latitude.toFixed(3);
      longitude = position.coords.longitude.toFixed(3);
      step1Result(`You're located near ${latitude}, ${longitude}.`);
    },
    (error) => {
      step1Result(`Unable to locate you, so defaulting to ${latitude}, ${longitude}.`);
    }
  );
});

function step1Result(message) {
  document.querySelector('#step1-result').innerText = message;
  step1Button.disabled = false;
  step2Button.disabled = false;
}

step2Button.addEventListener('click', async () => {
  step2Button.disabled = true;

  try {
    const url = getApiUrl();
    const response = await fetch(url);
    const responseJson = await response.json();
    step2Result(responseJson);
  } catch (error) {
    document.querySelector('#step2-result').innerText = error;
    step2Button.disabled = false;
  }
});

function getApiUrl() {
  const url = new URL('https://en.wikipedia.org/w/api.php');
  url.searchParams.set('action', 'query');
  url.searchParams.set('format', 'json');
  url.searchParams.set('generator', 'geosearch');
  url.searchParams.set('ggscoord', `${latitude}|${longitude}`);
  url.searchParams.set('ggslimit', 5);
  url.searchParams.set('ggsradius', 10000);
  url.searchParams.set('origin', '*');
  url.searchParams.set('pilimit', 50);
  url.searchParams.set('piprop', 'thumbnail');
  url.searchParams.set('pithumbsize', 144);
  url.searchParams.set('prop', 'pageimages|pageterms');
  url.searchParams.set('wbptterms', 'description');
  return url;
}

function clearChildren(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function step2Result(responseJson) {
  const step2Result = document.querySelector('#step2-result');

  clearChildren(step2Result);

  for (const item of Object.values(responseJson.query.pages)) {
    const li = document.createElement('li');

    const img = document.createElement('img');
    img.src = item.thumbnail ?
      item.thumbnail.source :
      'https://en.wikipedia.org/static/images/project-logos/enwiki-1.5x.png';
    img.alt = `A thumbnail image representing ${item.title}`;

    const a = document.createElement('a');
    a.innerText = item.title;
    const wikipediaUrl = new URL('https://en.wikipedia.org');
    wikipediaUrl.searchParams.set('curid', item.pageid);
    a.href = wikipediaUrl.href;
    a.target = '_blank';

    li.appendChild(img);
    li.appendChild(a);
    step2Result.appendChild(li);
  }
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // navigator.serviceWorker.register('sw.js');
  });
}
