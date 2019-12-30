// Display Initial Sermons from Church Social (All Ministers, Last 20 Sermons)
$.ajax({
  url: 'https://app.churchsocial.com/api/sermons',
  headers: {
    authorization: '0e3caa43db49cc8729a8bfa91f177bf6'
  }
}).done(data => displaySermons(data));

function displaySermons(sermonData) {
  // Get sermons and ministers in arrays
  let sermons = sermonData.data;
  let ministers = sermonData.meta.authors;

  // Add ministers to select menu
  let $ministerSelectEl = $("#minister-select");
  for (let i = 0; i < ministers.length; i++) {
    let optionEl = document.createElement("option");
    optionEl.value = ministers[i];
    optionEl.innerHTML = ministers[i];
    $ministerSelectEl.append(optionEl);
  }

  // Display all sermons
  let $sermonsCol = $("#sermons-column");
  $sermonsCol.empty();
  for (let i = 0; i < sermons.length; i++) {
    $sermonsCol.append(createSermonCard(sermons[i]));
  }

}

function createSermonCard(sermonObj) {
  // Create Elements
  let cardEl = document.createElement("div");
  cardEl.classList.add("card", "mb-2");

  let cardBodyEl = document.createElement("div");
  cardBodyEl.classList.add("card-body", "py-1", "d-flex");

  let flexDiv1El = document.createElement("div");
  flexDiv1El.classList.add("align-self-center");

  let buttonEl = document.createElement("button");
  buttonEl.classList.add("btn", "btn-outline-dark");
  buttonEl.dataset.id = sermonObj.id;
  buttonEl.innerHTML = `<i class='fas fa-play' data-id='${sermonObj.id}'></i>`;
  buttonEl.addEventListener("click", loadSermonModal);

  let flexDiv2El = document.createElement("div");
  flexDiv2El.classList.add("ml-3", "border-left", "pl-1");
  let timeStr;
  if (sermonObj.preached_time == "Morning") {
    timeStr = "AM";
  } else {
    timeStr = "PM";
  }
  flexDiv2El.innerHTML =
    `<p class="mb-1">${sermonObj.preached_date} (${timeStr}) | <em>"${sermonObj.title}"</em> | ${sermonObj.passage}</p><p class="text-muted mb-1">${sermonObj.author}</p>`;

  // Put elements together
  flexDiv1El.append(buttonEl); // Button into first flex div
  cardBodyEl.append(flexDiv1El); // First flex div into card body
  cardBodyEl.append(flexDiv2El); // Second flex div into card body
  cardEl.append(cardBodyEl); // Card body into card

  return cardEl;
}

function loadSermonModal(e) {
  // Get sermon data from Church Social API
  let sermonUrl = 'https://app.churchsocial.com/api/sermons/' + e.target.dataset.id;
  $.ajax({
    url: sermonUrl,
    headers: {
      authorization: '0e3caa43db49cc8729a8bfa91f177bf6'
    }
  }).done(data => displaySermonModal(data));
}

function displaySermonModal(sermonObj) {
  // Update Modal with sermon data

  // Date Title
  let timeStr;
  if (sermonObj.preached_time == "Morning") {
    timeStr = "AM";
  } else {
    timeStr = "PM";
  }
  document.getElementById("date").innerHTML = sermonObj.preached_date + " (" + timeStr + ")";

  // Author
  document.getElementById("author").innerHTML = sermonObj.author;

  // Texts
  let passagesListEl = document.getElementById("passages");
  passagesListEl.innerHTML = "";
  for (let i = 0; i < sermonObj.texts.length; i++) {
    let liEl = document.createElement("li");
    liEl.innerHTML = sermonObj.texts[i];
    passagesListEl.append(liEl);
  }

  // Sermon Title
  document.getElementById("title").innerHTML = sermonObj.title;

  // Audio & Video
  for (let i = 0; i < sermonObj.formats.length; i++) {
    if (sermonObj.formats[i].type == "Audio") {
      document.getElementById("audio").src = sermonObj.formats[i].audio_url;
    } else if (sermonObj.formats[i].type == "Video") {
      document.getElementById("video").innerHTML = sermonObj.formats[i].video_code;
    }
  }

  // Open Modal
  $("#sermon-modal").modal("show");
}

// Search Button
$("#search-btn").on("click", searchEventHandler);

function searchEventHandler() {
  // Display Initial Sermons from Church Social (All Ministers, Last 20 Sermons)
  $.ajax({
    url: 'https://app.churchsocial.com/api/sermons',
    headers: {
      authorization: '0e3caa43db49cc8729a8bfa91f177bf6'
    }
  }).done(data => filterSermons(data));
}

function filterSermons(sermonData) {
  let sermons = sermonData.data;

  // Get Form Input Value
  let minister = $("#minister-select").val();

  // Display sermons based on search values
  let $sermonsCol = $("#sermons-column");
  $sermonsCol.empty();
  for (let i = 0; i < sermons.length; i++) {
    if (sermons[i].author == minister || minister == "all-ministers") {
      $sermonsCol.append(createSermonCard(sermons[i]));
    }
  }
}