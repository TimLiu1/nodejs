/**
 * Created by TimLiu 2016-03-25
 * 数据格式化
 * */

function  ProData()
{
    /**
     *  传入文件数据
     */
    var data = globalData

    /**
     * 把不同的公司名称组合成一个数组
     */
    var type = [];
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
    /**
     *   把不同公司的数据归为各自的数组中去，再用一个数组涵盖，所谓三维数组
     */

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

    /**
     *按年份排序
     */
    var result = [];
    var nameAll = [];
    var x = 0;
    var time = [];
    var series = [];
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
                if (e[i][1] > e[j][1]) {
                    var temp = e[i][1];
                    e[i][1] = e[j][1];
                    e[j][1] = temp;
                }
            }
        }

        /**
         * 去除无效数据
         */
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


        /**
         *求出不同公司涨幅及增值
         */

        var percent = (((e_end[e_end.length - 1][3] - e_end[0][3]) / e_end[0][3]) * 100).toFixed(1);
        nameAll.push(name);
        result.push(percent);


})
    var end_data = [];
    end_data.push(result)
    end_data.push(nameAll)
    end_data.push(time)
    end_data.push(series)
    return end_data



}

exports.ProData = ProData;



