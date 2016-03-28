/**
 * Created by zukuan Liu on 2016-03-25.
 */
var express = require('express');
var csv = require('node-csv');
var csv1 = require('fast-csv');
var router = express.Router();
var moment = require('moment');
var way = require('./way')
var Iconv = require('iconv').Iconv;
var utfToGbk = new Iconv('UTF-8', 'GBK');


/**
 * 访问主页入口
 */
router.get('/', function (req, res, next) {
    //console.log(way.ProData())
    res.render('index', {title: 'Express'});
});
/**
 * 求最大值的方法
 */
router.get('/max',function(req,res){

   var result = way.max();
    var max = result[0];
    var maxCompany = result[1];
    res.render('max', {max: max,maxCompany:maxCompany});
})




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
    res.render('csv', {company: company, max: a+"元" , result: result, nameAll: nameAll});

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
    var model = {series: series, time: time}
   // console.log(series)
    res.send(model);


});


/**
 * 下载CSV
 */
router.get('/download-csv', function (req, res, next) {

    var data_all = way.ProData();
    console.log("are you ok ,are you coming?")
    var data_csv = data_all[4];
    console.log(data_csv);
    var header = ['Name', 'Date', 'notes', 'Values', 'Change'];
    var headerDatas = ['Name', 'Date', 'notes', 'Values', 'Change'];

    var csvStream = csv1.writeToString(data_csv, {
        headers: true,
        quote: '"',
        escape: '"',
        rowDelimiter: '\r\n',
        transform: function(row) {
            var csvHeader = {};
            for (var i = 0; i < headerDatas.length; i++) {
                csvHeader[header[i]] = row[headerDatas[i]];
            }
            return csvHeader;
        }
    }, function(err, data) {
        res.setHeader('Accept-Language', 'zh-cn');
        res.setHeader('Content-Disposition', 'attachment; filename=values.csv');
        res.setHeader('Content-Type', 'application/octet-stream;charset=GBK');
        res.on('end', function() {
            premiumArray = null;
            if (global.env && global.env != 'development') {
                logger.info('force gc');
                gc();
            }
        });
        res.end(utfToGbk.convert(data));
    });
});
module.exports = router;
