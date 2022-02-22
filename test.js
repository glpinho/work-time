const axios = require("axios").default;

axios
    .post(
        "https://api.mockytonk.com/proxy/ab2198a3-cafd-49d5-8ace-baac64e72222",
        {
            includedAt: "2021-03-15 15:10:00",
            employeeId: 123,
            employerId: 999,
        }
    )
    .then((data) => console.log(data.data));
