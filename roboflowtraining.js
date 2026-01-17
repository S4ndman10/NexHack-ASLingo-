const axios = require("axios");
const fs = require("fs");

const image = fs.readFileSync("YOUR_IMAGE.jpg", {
    encoding: "base64"
});

axios({
    method: "POST",
    url: "https://serverless.roboflow.com/sign-language-igzel-nghdm/1",
    params: {
        api_key: "9l5AMbdUBond5JynG7Uv"
    },
    data: image,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
})
.then(function(response) {
    console.log(response.data);
})
.catch(function(error) {
    console.log(error.message);
});