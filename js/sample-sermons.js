// Add Event Listeners to Listen Buttons
$("#sermon-1").on("click", () => loadSampleModal("1", "14272"));
$("#sermon-2").on("click", () => loadSampleModal("2", "17437"));


function loadSampleModal(modalIdNum, sermonId) {
  // Get sermon data from Church Social API
  let sermonUrl = 'https://app.churchsocial.com/api/sermons/' + sermonId;
  $.ajax({
    url: sermonUrl,
    headers: {
      authorization: '0e3caa43db49cc8729a8bfa91f177bf6'
    }
  }).done(data => displaySampleSermon(data, modalIdNum));
}

function displaySampleSermon(sermonObj, modalIdNum) {
  // Update Modal with sermon data

  let audioId = "#audio-container-" + modalIdNum;
  let videoId = "#video-container-" + modalIdNum;

  // Audio & Video
  $(audioId).hide();
  $(videoId).hide();
  for (let i = 0; i < sermonObj.formats.length; i++) {
    if (sermonObj.formats[i].type == "Audio") {
      $(audioId).show();
      $(audioId + " audio").attr("src", sermonObj.formats[i].audio_url);
    } else if (sermonObj.formats[i].type == "Video") {
      $(videoId).show();
      $(videoId + " p").html(sermonObj.formats[i].video_code);
    }
  }

  // Open Modal
  $("#sermon-modal-" + modalIdNum).modal("show");
}