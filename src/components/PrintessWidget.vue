<script setup>

import axios from 'axios';
import Widget from './Widget.vue';

const BACKEND_URL = 'http://localhost:3000/api'

const print = (printessToken) => {
  axios({
    method: 'get',
    url: `${BACKEND_URL}/print`,
    params: {
      token: printessToken
    }
  })
  .then(res => {
    window.open(res.data, "_blank");
  });
}


function loadPrintess() {
  const iframe = document.getElementById("printess");

  /* **************************** */
  /* listen to printess callbacks */
  /* **************************** */
  window.addEventListener("message", () => {
    switch (event.data.cmd) {
      case "back":
        // alert("Back to catalog. save-token:" + event.data.token);
        break;
      case "basket":
        print(event.data.token);
        // prompt("Proceed to checkout.\n\nsave-token:\n" + event.data.token +  "\n\nThumbnailUrl:",event.data.thumbnailUrl );
        break;
    }
  });

  /* *************************** */
  /*    load Printess editor     */
  /* *************************** */
  iframe.contentWindow.postMessage({
    cmd: "attach", properties: {
      "templateName": "DnD_Character",
      "templateVersion": "published",
      "token": "eyJhbGciOiJSUzI1NiIsImtpZCI6InByaW50ZXNzLXNhYXMtYWxwaGEiLCJ0eXAiOiJKV1QifQ.eyJzdWIiOiIwNDU5Yjc5NjA2ODI0ZmIyOWJhNDY0MmY1YzBiMDg0MSIsImp0aSI6Ind3ZDlBVTRoZVJTbE5pNGFyV0Mwd3Z1U0FLYlJCNVFSIiwicm9sZSI6InNob3AiLCJuYmYiOjE3NDIzNzg3NTksImV4cCI6MjA1NzczODc1OSwiaWF0IjoxNzQyMzc4NzU5LCJpc3MiOiJQcmludGVzcyBHbWJIICYgQ28uS0ciLCJhdWQiOiJwcmludGVzcy1zYWFzIn0.q_qUfxDbdGayQITJZLv-tOjxzHROpZEWHtVwkbWljabSmHmQdxwr6fKsXHCBtQGj2tqk0LIYXx4s-SGPufucfS250H_DJkJrrp48bPaNojcgUoJtAq1N7pdt5zprdAgUeq6t8z3dblQfMKIOjH8FqHdm-zg-eArNTLLl4pbjr32CNNahGNFoqLYMuxyeaqeasf6tLudBV4j-KcDjAa4C2TGitViAr9SCb2I7-qY062hYbXUHLIFqAqGc2PDM2VgcD9b4ieMIHRJ0QHfU_CSqKp-Ys4Pjotci2CMMd2yYejoVbpPqpkCVCw8LgT4wY6JQh5K8RByN7pIerhWjc7hPFNAaqqYuoLaO8m1hIO94cAxRy1p9u4UqBdFsbk38DqQMkBNXALyR20cCqgq7oDgOd5y-VuSn9kMaDL4LnFhLabjK4_lXDfkZdiF8XDJa3D4X2rGFCOIRuy6-gldjr9Bbcvhzd0i11WWkrxGAeDGsN-lWMVXqd910fpzg1YivP8DKCeYCO6RLWR9JspI56kOswY4q5_PpfBCDXPVKG_r_GoWUuG2KQsW79_ZCm17R1ELin-IcPyCoIszrjuscLxZlTuX5QE7-NJ9AzlAvUla8zOM8twmcu1QEuxp3fIlMrrQLSWrgjMwacgmBs9GzS2u1HzX6NkPmr_CiVzmbXTOtAsc",
      formFields: [
        {
          name: "Name",
          value: "Maxim Alerschaden"
        },
        {
          name: "Title",
          value: "Human Fighter"
        },
        {
          name: "group",
          value: '{ _1: "Level 3" }'
        }
      ]
    }
  }, "*");

}

  /* *************************** */
  /*   Forward Visual Viewport   */
  /* *************************** */
  if (window.visualViewport) {
    window.visualViewport.addEventListener("scroll", () => {
      // unfortunately an iframe on iOS is not able to receive the correct visual-viewport, so we forward it.
      iframe.contentWindow.postMessage({ cmd: "viewportScroll", height: window.visualViewport.height, offsetTop: window.visualViewport.offsetTop },"*");
    })
  }


</script>

<template>
  <Widget class="printessWidget">
    <template #header>
      <h2>Design Something</h2>
    </template>

    <template #body>
      <div>
        <iframe  id="printess" src="//editor.printess.com/printess-editor/embed.html" @load="loadPrintess()"></iframe>
      </div>
    </template>
  </Widget>
</template>

<style scoped>
.printessWidget {
  grid-column: span 4;
  min-height: 500px;
}

html {
  height: -webkit-fill-available; /* Counter act the Safari viewport-height bug */
}

body {
  margin: 0;
  padding: 0;
  height: 100%;
  /* height: 100vh;
  height: -webkit-fill-available; */
}

iframe {
  width: 100%;
  /* width: 80vw; */
  height: 500px;
  border: none;
  display: block;
  /* position: fixed; */
  /* left: 20%; */
  /* top: 0; */
}

#printess-desktop-grid {
  height: 100%;
}
</style>
