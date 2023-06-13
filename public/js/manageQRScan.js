let video_constraints = {
  audio: false,
  video: {
    width: {
      ideal: 250
    },
    height: {
      ideal: 250
    },
    facingMode: 'environment',
    focusMode: 'continuous',
    aspectRatio: 1
  }
}
var config = {
  fps: 10,
  qrbox: {width: 200, height: 200},
  rememberLastUsedCamera: true,
  supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
  aspectRatio: 1

}

window.html5QrCode = new Html5Qrcode(
  "reader", { formatsToSupport: [ Html5QrcodeSupportedFormats.QR_CODE ] });
window.qrCodeSuccessCallback = async (decodedText, decodedResult) => {
  const decodedObject = JSON.parse(decodedText);
  if (Object.keys(decodedObject).length == 2) {
    window.html5QrCode.stop();
    if (Object.keys(decodedObject)[1] == 'spec_id') {
      window.location.replace(window.baseUrl + `/specs/${decodedObject.spec_id}/items/${decodedObject.id}`);
    } else {
      // Alternate solution, to support legacy implementations of the QR code payload format.
      const pn = decodedObject[Object.keys(decodedObject)[1]];
      const specResponse = await fetch(window.baseUrl + `/api/specs/pn/${pn}`);
      if (specResponse.ok) {
        const specData = await specResponse.json();
        window.location.replace(window.baseUrl + `/specs/${specData.id}/items/${decodedObject.id}`);
      }
    }
  }
};