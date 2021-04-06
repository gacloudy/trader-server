const express = require("express");
const cors = require('cors')
const sharesMst = require('./dao/shares-mst.js');
const dbaccess = require('./util/dbaccess.js');
const yaml = require('./util/yaml.js');
const dateUtil = require('./util/dateUtil.js');
const Joi = require('joi');
const util = require('util');

const app = express();

app.use(express.json());
app.use(cors());
// var router = app.Router()

const backendInfo = yaml.getBackendInfo();

app.listen(backendInfo.port, () => {
    console.log("Listening on port " + backendInfo.port);
});

let shares = [];
let connection = null;
try {

  connection = dbaccess.getConnection();
  connection.connect((err) => {
      if (err) {
        res.send([]);
      }
    });

    connection.query(yaml.getSqlInfo().shares_mst.all, (error, results, fields) => {
      for (const result of results) {
       shares.push({code: result.code, name: result.shares_name_en});
      }
    });
} catch (error) {
  console.log(error);
} finally {
  if(connection !== null) {
    try {
      connection.end();
    } catch (error) {
    }
  }
}


app.get('/shares', (req, res, next) => {
  res.send(shares);
});

app.get('/tradePattern', (req, res, next) => {

  try {
    res.send(yaml.getTradePattern());
  } catch (error) {
    console.log(error);
    res.send([]);
  } finally {
  }
});


app.get('/bunrui', (req, res, next) => {

  try {
    res.send(yaml.getBunrui());
  } catch (error) {
    console.log(error);
    res.send([]);
  } finally {
  }
});

app.get('/way', (req, res, next) => {

  try {
    res.send(yaml.getWay());
  } catch (error) {
    console.log(error);
    res.send([]);
  } finally {
  }
});



app.get('/ymArry', (req, res, next) => {
  res.send(dateUtil.ymArry());
});


app.get('/daily', (req, res, next) => {

  let connection = null;
  try {

    connection = dbaccess.getConnection();
    connection.connect((err) => {
        if (err) {
          res.send([]);
        }
      });

      connection.query(yaml.getSqlInfo().share_date_history.codeTerm, [req.query.code, req.query.dateFrom.split('/').join(''), req.query.dateTo.split('/').join('')], (error, results, fields) => {
        let shares = [];
        for (const result of results) {
         shares.push({code: result.code, date: (result.price_date.substring(0, 4) + '/' + result.price_date.substring(4, 6) + '/' + result.price_date.substring(6, 8))});
        }
        res.send(shares);
      });
  } catch (error) {
    console.log(error);
    res.send([]);
  } finally {
    if(connection !== null) {
      try {
        connection.end();
      } catch (error) {
      }
    }
  }
});

let tradeResult = [];
app.get('/result', (req, res, next) => {

  let connection = null;
  try {

    connection = dbaccess.getConnection();
    connection.connect((err) => {
        if (err) {
          res.send([]);
        }
      });


      connection.query(
        yaml.getSqlInfo().analyze_result_monthly.monthlyAggregation, [
          req.query.tradePattern,
          req.query.bunrui,
          req.query.code,
          req.query.ymFrom,
          req.query.ymTo,
          req.query.count * dateUtil.diffOfMonth(req.query.ymFrom, req.query.ymTo)], (error, results, fields) => {
        
        tradeResult = [];    
        for (const result of results) {
          tradeResult.push({analyze_key_code: result.analyzeKeyCode, sum_bnft: (result.sumBnft * 100).toFixed(2) + "%", avg_bnft: (result.avgBnft * 100).toFixed(2) + "% / Count", count: result.count});
        }
        res.send(tradeResult);
      });
  } catch (error) {
    console.log(error);
    res.send([]);
  } finally {
    if(connection !== null) {
      try {
        connection.end();
      } catch (error) {
      }
    }
  }
});




app.get('/aggregate', (req, res, next) => {

  let connection = null;

  const ymAry = dateUtil.betweenMonth(req.query.ymFrom, req.query.ymTo);
  console.log(ymAry);

  try {
    connection = dbaccess.getConnection();
    connection.connect((err) => {
      if (err) {
        res.send([]);
      }
    });

    if(req.query.way === "key") {
      const schema = Joi.object({
        analyzeKeyCode: Joi.number().min(1).max(80400).required()
      });
      const r = schema.validate({analyzeKeyCode: req.query.analyzeKeyCode});
      if(r.error) {
        res.send({
          error: true,
          message: r.error.details[0].message
        });
        return;
      }

      const aggregate=[];
      let bnftSum = 0;
      let countSum = 0;


      ymAry.forEach(function( ym ) {
        var bnft = 0;
        var count = 0;

        connection.query(
          yaml.getSqlInfo().analyze_result_monthly.pk, [
            req.query.code,
            req.query.analyzeKeyCode,
            ym], (error, results, fields) => {
          
          for (const result of results) {
            console.log(result);
            aggregate.push({
              ymName: ym,
              bnft: result.bnft,
              count: result.trader_count,
              avg: (result.trader_count === 0) ? 0 : (result.bnft / result.trader_count)
            });
          }
        });
      });


      console.log(aggregate);

      res.send([]);


    } else {
      res.send({});

    }


//https://qiita.com/reon777/items/d3781e40ba518a6544f8


  } catch (error) {
    console.log(error);
    res.send({
      error: true,
      message: "Server Error happened!!"
    });
  } finally {
    if(connection !== null) {
      try {
        connection.end();
      } catch (error) {
      }
    }
  }
});


app.get('/test', (req, res, next) => {

  new Promise(function(callback) {
    const test = require('./test.js');
    var result = test.testDB();

    callback(result);
  }).then(function(data) {
    res.send(data);
  });

});
