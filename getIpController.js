const csv = require("csv-parser");
const fs = require("fs");
const results = [];
//const ip = '167.78.240';

class getIpController {
  async getUser(req, res) {
    try {
      fs.createReadStream("data.csv")
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", () => {});

      let ip_adress =
        (req.headers["x-forwarded-for"] || "").split(",").pop() ||
        req.headers["x-real-ip"] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

      let ip_ = ip_adress.replace(/\./g, "");

      res.status(200).json(ip_);
      let index = results.findIndex(
        (el) => ip_ >= Number(el.from) && ip_ <= Number(el.to)
      );

      //console.log(results[index]);
      res.status(200).json(results);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new getIpController();
