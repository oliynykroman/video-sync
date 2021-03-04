$(document).ready(function () {
  let videoBck = document.getElementById("main-video");
  let videoBlur = document.getElementById("synced-video");
  let to = new TIMINGSRC.TimingObject();
  let vector = to.query();
  to.update({ position: 0.0, velocity: 1.0 });
  //   // set up video sync
  let sync1 = MCorp.mediaSync(videoBck, to, {
    loop:true
  });
  let sync2 = MCorp.mediaSync(videoBlur, to, {
    loop:true
  });


  // videoBck.on("timeupdate",
  //       function (e) {
  //         sync1.stop();
  //         sync2.stop();
  //       },
  //       false
  //     );

  $(".cases-item").hover(
    function () {
      let video = $(this).find(".video")[0];
      video.play();
    },
    function () {
      let video = $(this).find(".video")[0];
      video.pause();
      video.currentTime = 0;
    }
  );

  $(".cases-item").click(function () {
    sync1.stop();
    sync2.stop();
    sync1 = null;
    sync2 = null;
    videoBck.pause();
    videoBlur.pause();
    let videoPath = $(this).find(".video source").attr("src");
    setupVideo(videoPath);
    to.update({ position: 0.0 });
    sync1 = MCorp.mediaSync(videoBck, to, {loop:true});
    sync2 = MCorp.mediaSync(videoBlur, to, {loop:true});
    console.log(sync1);
  });

  function setupVideo(videoName) {
    // You will probably get your video name differently
    // Get all of the uri's we support
    let indexOfExtension = videoName.lastIndexOf(".");
    //window.alert("found index of extension " + indexOfExtension);
    let extension = videoName.substr(
      indexOfExtension,
      videoName.length - indexOfExtension
    );
    //window.alert("extension is " + extension);
    let ogguri = encodeURI(videoName.replace(extension, ".ogv"));
    let webmuri = encodeURI(videoName.replace(extension, ".webm"));
    let mp4uri = encodeURI(videoName.replace(extension, ".mp4"));

    // Test for support
    if (videoBck.canPlayType("video/ogg")) {
      $(videoBck).attr("src", ogguri);
      $(videoBlur).attr("src", ogguri);
      // videoBlur.setAttribute("src", ogguri);
      //window.alert("can play ogg");
    } else if (videoBck.canPlayType("video/webm")) {
      // v.setAttribute("src", webmuri);
      $(videoBck).attr("src", webmuri);
      $(videoBlur).attr("src", webmuri);
      // videoBlur.setAttribute("src", webmuri);
      //window.alert("can play webm");
    } else if (videoBck.canPlayType("video/mp4")) {
      // v.setAttribute("src", mp4uri);
      $(videoBck).attr("src", mp4uri);
      $(videoBlur).attr("src", mp4uri);
      // videoBlur.setAttribute("src", mp4uri);
      //window.alert("can play mp4");
    } else {
      console.log("Can't play anything");
    }
  }

  // temorary clicks
  $(".show-title").click(function () {
    $(".video-container--content").addClass("show");
    $(".video-container--content .title").addClass("show");
  });
  $(".show-cases").click(function () {
    $(".video-container--content").addClass("show");
    $(".video-container--content .cases").addClass("show");
  });

  $(window).bind("wheel mousewheel touchmove", function (e) {
    console.log(e.deltaY);
    $(".scroll-btn").hide(500, function () {
      $(".video-container--content .cases").slideDown(500);
    });
    if (e.deltaY < 0) {
      // scroll down
      $(".scroll-btn").hide(500, function () {
        $(".video-container--content .cases").slideDown(500);
      });
    } else {
      // scroll up
      // $(".video-container--content .title").slideUp(500, function () {
      //   $(".scroll-btn").hide(500);
      // });
    }
    console.log(e);
  });
  $(window).bind("keyup", function (event) {
    console.log(event);
  });
});


//  videoBck.addEventListener(
//     "timeupdate",
//     function (e) {
//       sync1.stop();
//       sync2.stop();
//     },
//     false
//   );
