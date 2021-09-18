require("dotenv").config();
const fs = require("fs");

if (process.env.NODE_ENV === "production") {
  console.log("Writting Google Cloud Platform key file");
  fs.writeFileSync(
    process.env.GOOGLE_APPLICATION_CREDENTIALS,
    process.env.GCP_KEY
  );
}
