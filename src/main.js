import QRCode from "qrcode";
import "./style.css";

const contact = {
  firstName: "Karl-John",
  lastName: "Chow",
  fullName: "Karl-John Chow",
  title: "Account Technology Stragegist",
  organization: "Microsoft",
  email: "kj.chow@microsoft.com",
  phone: "+85298654422",
};

const vCard = [
  "BEGIN:VCARD",
  "VERSION:3.0",
  `N:${contact.lastName};${contact.firstName};;;`,
  `FN:${contact.fullName}`,
  `ORG:${contact.organization}`,
  `TITLE:${contact.title}`,
  `EMAIL;TYPE=INTERNET,WORK:${contact.email}`,
  `TEL;TYPE=CELL,VOICE:${contact.phone}`,
  "END:VCARD",
].join("\r\n");

const qrCanvas = document.querySelector("#contact-qr");
const saveContactLink = document.querySelector("#save-contact");

QRCode.toCanvas(qrCanvas, vCard, {
  width: 240,
  margin: 1,
  errorCorrectionLevel: "M",
  color: {
    dark: "#111111",
    light: "#ffffff",
  },
}).catch((error) => {
  console.error("Unable to create contact QR code.", error);
  qrCanvas.replaceWith("QR code unavailable");
});

const vCardFile = new Blob([vCard], { type: "text/vcard;charset=utf-8" });
const vCardUrl = URL.createObjectURL(vCardFile);

saveContactLink.href = vCardUrl;
saveContactLink.download = "Karl-John-Chow.vcf";

window.addEventListener("pagehide", () => URL.revokeObjectURL(vCardUrl));
