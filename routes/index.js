/**
 * Created by Liuzukuan on 2016-03-25.
 */

var express = require('express');
var csv = require('node-csv');
var router = express.Router();
var moment = require('moment');

router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});
router.get('/csv', function (req, res) {
    //读取csv文件
    csv.createParser().parseFile('./values.csv', function (err, data) {
        if (err) throw err;
        var type = [];
        //把不同的公司名称组合成一个数组
        data.forEach(function (e) {
            var i = 0;
            type.forEach(function (e1) {
                if (e1 == e[0]) {
                    i = 1
                }
            })
            if (i == 0 && e[0] != "Name") {
                type.push(e[0])
            }

        })
        //console.log(type);
        //把不同公司的数据归为各自的数组中去，再用一个数组涵盖，所谓三维数组
        var typesone = [];
        type.forEach(function (t) {
            var types = [];
            data.forEach(function (d) {
                if (t == d[0]) {
                    types.push(d)
                }
            })
            typesone.push(types);

        })
        //console.log(typesone)

    //按年份排序
        var result = [];
        var nameAll = [];
        typesone.forEach(function (e) {
            for (var i = 0; i < e.length; i++) {
                for (var j = i; j < e.length; j++) {
                    var arr = e[i][1].split("-");
                    if (arr[1] < 10 && arr[2] < 10) {
                        arr[1] = "0" + arr[1];
                        arr[2] = "0" + arr[2];
                        e[i][1] = arr[0] + "-" + arr[1] + "-" + arr[2]
                    }
                    if (arr[1] < 10 && arr[2] > 10) {
                        arr[1] = "0" + arr[1];
                        e[i][1] = arr[0] + "-" + arr[1] + "-" + arr[2]
                    }
                    if (arr[1] > 10 && arr[2] < 10) {

                        arr[2] = "0" + arr[2];
                        e[i][1] = arr[0] + "-" + arr[1] + "-" + arr[2]
                    }

                    var arry = e[i][1].split("-");
                    if (arry[1] < 10 && arry[2] < 10) {
                        arry[1] = "0" + arry[1];
                        arry[2] = "0" + arry[2];
                        e[j][1] = arry[0] + "-" + arry[1] + "-" + arry[2]
                    }
                    if (arry[1] < 10 && arry[2] > 10) {
                        arry[1] = "0" + arry[1];
                        e[j][1] = arry[0] + "-" + arry[1] + "-" + arry[2]
                    }
                    if (arry[1] > 10 && arry[2] < 10) {

                        arry[2] = "0" + arry[2];
                        e[j][1] = arry[0] + "-" + arry[1] + "-" + arry[2]
                    }


                    //e[i][1] =  moment(e[i][1],"YYYY-MM-DD").format("YYYY-MM-DD");
                    //e[j][1] =  moment(e[j][1],"YYYY-MM-DD").format("YYYY-MM-DD");
                    if (e[i][1] > e[j][1]) {
                        var temp = e[i][1];
                        e[i][1] = e[j][1];
                        e[j][1] = temp;
                    }
                }
            }
       //去除无效数据
            var e_end = [];
            var name = e[0][0];
            e.forEach(function (e2) {
                if (!isNaN(e2[3])) {
                    e_end.push(e2);
                }

            })
            //console.log(e_end);
            var percent = (((e_end[e_end.length - 1][3] - e_end[0][3]) / e_end[0][3]) * 100).toFixed(1);
            nameAll.push(name);
            result.push(percent);


        })
        //console.log(nameAll);
        //console.log(result);
        //找到最大值以及对应公司
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
    });
})
//发送图形数据到前台，相应Ajax请求
router.get('/report', function (req, res, next) {
    csv.createParser().parseFile('./values.csv', function (err, data) {
        if (err) throw err;
        var type = [];
        //把不同的公司名称组合成一个数组
        data.forEach(function (e) {
            var i = 0;
            type.forEach(function (e1) {
                if (e1 == e[0]) {
                    i = 1
                }
            })
            if (i == 0 && e[0] != "Name") {
                type.push(e[0])
            }

        })
        //console.log(type);
        var typesone = [];

        type.forEach(function (t) {
            var types = [];
            data.forEach(function (d) {
                if (t == d[0]) {
                    types.push(d)
                }
            })
            typesone.push(types);

        })
        //console.log(typesone)


        var result = [];
        var nameAll = [];
        typesone.forEach(function (e) {

            for (var i = 0; i < e.length; i++) {
                for (var j = i; j < e.length; j++) {
                    var arr = e[i][1].split("-");
                    if (arr[1] < 10 && arr[2] < 10) {
                        arr[1] = "0" + arr[1];
                        arr[2] = "0" + arr[2];
                        e[i][1] = arr[0] + "-" + arr[1] + "-" + arr[2]
                    }
                    if (arr[1] < 10 && arr[2] > 10) {
                        arr[1] = "0" + arr[1];
                        e[i][1] = arr[0] + "-" + arr[1] + "-" + arr[2]
                    }
                    if (arr[1] > 10 && arr[2] < 10) {

                        arr[2] = "0" + arr[2];
                        e[i][1] = arr[0] + "-" + arr[1] + "-" + arr[2]
                    }

                    var arry = e[i][1].split("-");
                    if (arry[1] < 10 && arry[2] < 10) {
                        arry[1] = "0" + arry[1];
                        arry[2] = "0" + arry[2];
                        e[j][1] = arry[0] + "-" + arry[1] + "-" + arry[2]
                    }
                    if (arry[1] < 10 && arry[2] > 10) {
                        arry[1] = "0" + arry[1];
                        e[j][1] = arry[0] + "-" + arry[1] + "-" + arry[2]
                    }
                    if (arry[1] > 10 && arry[2] < 10) {

                        arry[2] = "0" + arry[2];
                        e[j][1] = arry[0] + "-" + arry[1] + "-" + arry[2]
                    }

                    //e[i][1] =  moment(e[i][1],"YYYY-MM-DD").format("YYYY-MM-DD");
                    //e[j][1] =  moment(e[j][1],"YYYY-MM-DD").format("YYYY-MM-DD");
                    if (e[i][1] > e[j][1]) {
                        var temp = e[i][1];
                        e[i][1] = e[j][1];
                        e[j][1] = temp;
                    }
                }
            }

            var e_end = [];
            var name = e[0][0];

            e.forEach(function (e2) {
                if (!isNaN(e2[3])) {
                    e_end.push(e2);
                }

            })
            //console.log(e_end);
            var percent = (((e_end[e_end.length - 1][3] - e_end[0][3]) / e_end[0][3]) * 100).toFixed(1);
            nameAll.push(name);
            result.push(percent);

        })
        console.log(nameAll);
        console.log(result);
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
});
router.get('/chart', function (req, res, next) {
    res.render('chart', {title: 'Express'});
});
router.get('/chart_show', function (req, res, next) {
    console.log("are you ok")
    csv.createParser().parseFile('./values.csv', function (err, data) {
        if (err) throw err;
        var type = [];
        //把不同的公司名称组合成一个数组
        data.forEach(function (e) {
            var i = 0;
            type.forEach(function (e1) {
                if (e1 == e[0]) {
                    i = 1
                }
            })
            if (i == 0 && e[0] != "Name") {
                type.push(e[0])
            }

        })
        //console.log(type);
        //把不同公司的数据归为各自的数组中去，再用一个数组涵盖，所谓三维数组
        var typesone = [];
        type.forEach(function (t) {
            var types = [];
            data.forEach(function (d) {
                if (t == d[0]) {
                    types.push(d)
                }
            })
            typesone.push(types);

        })
        //console.log(typesone)

        //按年份排序
        var result = [];
        var nameAll = [];
        var series = [];
        var time = [];
        var x = 0;
        typesone.forEach(function (e) {
            for(var i=0;i< e.length;i++) {
                var arr = e[i][1].split("-");
                if (arr[1] < 10 && arr[2] < 10) {
                    arr[1] = "0" + arr[1];
                    arr[2] = "0" + arr[2];
                    e[i][1] = arr[0] + "-" + arr[1] + "-" + arr[2]
                }
                if (arr[1] < 10 && (arr[2] > 10 ||arr[2]==10)) {
                    arr[1] = "0" + arr[1];
                    e[i][1] = arr[0] + "-" + arr[1] + "-" + arr[2]
                }
                if ((arr[1] > 10 ||arr[1] == 10) && arr[2] < 10) {

                    arr[2] = "0" + arr[2];
                    e[i][1] = arr[0] + "-" + arr[1] + "-" + arr[2]
                }

            }
             for (var i = 0; i < e.length; i++) {
                for (var j = i; j < e.length; j++) {



                    //e[i][1] =  moment(e[i][1],"YYYY-MM-DD").format("YYYY-MM-DD");
                    //e[j][1] =  moment(e[j][1],"YYYY-MM-DD").format("YYYY-MM-DD");
                    if (e[i][1] > e[j][1]) {
                        var temp = e[i][1];
                        e[i][1] = e[j][1];
                        e[j][1] = temp;
                    }
                }
            }
            //去除无效数据
            var e_end = [];
            var name = e[0][0];
           var data = [];
console.log(e)
            e.forEach(function (e2) {
                if (!isNaN(e2[3])) {
                    e_end.push(e2);
                    data.push(parseFloat(e2[3]))
                    if(x == 0) {
                        time.push(e2[1]);
                        //console.log(e2[1])
                    }
                }

            })
            x=1;
            var details = {};
            details.name = name;
            details.data = data;
            series.push(details)


        })
        var model ={series: series, time:time}


        console.log(series)
        res.send(model );
    });



});
module.exports = router;
