function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function postJson(url, token, model) {
  return await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + token
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(model)
  });
}

async function sendToProduction(token, templateNameOrSaveToken) {
  const model = {
    "templateName": templateNameOrSaveToken,
    "origin": "YOUR PRODUCTION SYSTEM NAME",
    "outputSettings": {
    "dpi": 300
    }
  };
  const response = await postJson("https://api.printess.com/production/produce", token, model);

  return response;
  }

  async function getStatus(token, jobId) {
  const model = { "jobId": jobId };
  const response = await postJson("https://api.printess.com/production/status/get", token, model);

  if (!response.ok) {
    throw new Error(`Cannot retrieve status: ${response.statusText} (statusCode=${response.status})`);
  }

  const apiStatus = await response.json();

  return apiStatus;
}

export async function producePdf(token, templateNameOrSaveToken) {
  console.log('we arrive');
  console.log(token, templateNameOrSaveToken)
  const produceResponse = await sendToProduction(token, templateNameOrSaveToken);

  if (!produceResponse.ok) {
    const errorMessage = await produceResponse.text();
    throw new Error("Cannot produce pdf error=" + errorMessage + ", statusCode=" + produceResponse.status);
  }

  const produceJson = await produceResponse.json();
  const jobId = produceJson.jobId;
  const statusModel = { "jobId": jobId };

  let isFinished = false;
  let status;

  do {
    status = await getStatus(token, jobId);
    isFinished = status.isFinalStatus;

    if (!isFinished) {
    await sleep(1000);
    }
  } while (!isFinished);

  if (status.isSuccess) {
    const pdfs = Object.keys(status.result.r).map(key => ({ document: key, url: status.result.r[key] }));
    console.log("###", pdfs[0].url)

    return pdfs[0].url;

    // this handles picture output (png, jpg, tif) if you set output type
    if (status.result.p) {
    for (let i = 0; i < status.result.p.length; i++) {
        const distributionFile = status.result.p[i];
        window.open(distributionFile.u, "_blank");
    }
    }

  } else {
      alert("Cannot render pdf: " + status.errorDetails);
  }
}