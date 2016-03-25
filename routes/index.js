/**
 * Created by zukuan Liu on 2016-03-25.
 */
var express = require('express');
var csv = require('node-csv');
var router = express.Router();
var moment = require('moment');
var way = require('./way')


  /**
    * 访问主页入口
    */
 router.get('/', function (req, res, next) {
    console.log(way.ProData())
    res.render('index', {title: 'Express'});
 });

 router.get('/csv', function (req, res) {
     var data_all = way.ProData()
     var result = data_all[0];
     var nameAll = data_all[1];

      /**
       * 找到最大值以及对应公司
       */
        var a = Math.max.apply(null, result)
        console.log("最大值是 " + a)
        var b = 0;
        for (var i = 0; i < result.length; i++) {
            if (result[i] == a) {
                b = i;
            }
        }
        var company = nameAll[b];
        console.log("所处最大值的公司是" + nameAll[b]);
        res.render('csv', {company: company, max: a + "%", result: result, nameAll: nameAll});

})


 /**
  * 发送图形数据到前台，相应Ajax请求
  */
router.get('/report', function (req, res, next) {
    var data_all = way.ProData()
    var result = data_all[0];
    var nameAll = data_all[1];
        var series = []
        var details = {};
        for (var i = 0; i < result.length; i++) {
            result[i] = parseFloat(result[i]);
        }
        details.name = "数据处理";
        details.data = result;
        series.push(details);
        var model = {
            nameAll: nameAll,
            results: result,
            series: series
        }
        res.send(model);

});
router.get('/chart', function (req, res, next) {
    res.render('chart', {title: 'Express'});
});

/**
 * 公司股价走势处理路由
 */
router.get('/chart_show', function (req, res, next) {

    var data_all = way.ProData()
    var time = data_all[2];
    var series = data_all[3];
    var model ={series: series, time:time}
    console.log(series)
    res.send(model );




});
module.exports = router;
