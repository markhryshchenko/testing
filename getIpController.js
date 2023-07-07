const csv = require("csv-parser");
const fs = require("fs");
const results = [];
//const ip = '189.31.200';

fs.createReadStream("data.csv")
  .pipe(csv())
  .on("data", (data) => results.push(data))
  .on("end", () => {});

class getIpController {
  async getUser(req, res) {
    try {
      let ip_adress =
        (req.headers["x-forwarded-for"] || "").split(",").pop() ||
        req.headers["x-real-ip"] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
     //console.log()
      //let ip_ = ip_adress.replaceAll(".", "");
      /* let index = results.findIndex(
        (el) => ip_ >= Number(el.from) && ip_ <= Number(el.to)
      ); */
     
      //res.status(200).json(results[index]);
      res.status(200).json(`your IP: ${ip_adress}`);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new getIpController();
