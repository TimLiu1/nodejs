/**
 * Created by TimLiu 2016-03-25
 * ���ݸ�ʽ��
 * */


function ProData() {
    /**
     *  �����ļ�����
     */


    var data = globalData

    /**
     * �Ѳ�ͬ�Ĺ�˾������ϳ�һ������
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
     *   �Ѳ�ͬ��˾�����ݹ�Ϊ���Ե�������ȥ������һ�����麭�ǣ���ν��ά����
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

    /**
     *���������
     */
    var result = [];
    var nameAll = [];
    var x = 0;
    var time = [];
    var series = [];
    var data_csv = [];
    var values = []
    typesone.forEach(function (e) {

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
         * ȥ����Ч����
         */
        var e_end = [];
        var name = e[0][0];
        var data = [];
        e.forEach(function (e2) {
            if (!isNaN(e2[3])) {
                var detail = {};
                e_end.push(e2);
                detail.Name = e2[0]
                detail.Date = e2[1]
                detail.notes = e2[2]
                detail.Values = e2[3]
                detail.Change = e2[4]
                data_csv.push(detail);
                data.push(parseFloat(e2[3]))
                if (x == 0) {
                    time.push(e2[1]);
                    //console.log(e2[1])
                }
            }

        })

        x = 1;
        var details = {};
        details.name = name;
        details.data = data;
        series.push(details)

        /**
         *�����ͬ��˾�Ƿ�����ֵ
         */
        var value = 0;
        for (var i = 0; i < e_end.length; i++) {
            if (e_end[i][4] == "INCREASED") {
                value = value + parseFloat(e_end[i][3])
            }
            if (e_end[i][4] == "DECREASED") {
                value = value - parseFloat(e_end[i][3])
            }

        }

        value = value.toFixed(1)
        //console.log(value);
        var percent = (((e_end[e_end.length - 1][3] - e_end[0][3]) / e_end[0][3]) * 100).toFixed(1);
        nameAll.push(name);
        result.push(value);
    })

    var end_data = [];
    end_data.push(result)
    end_data.push(nameAll)
    end_data.push(time)
    end_data.push(series)
    end_data.push(data_csv)
    return end_data

}

/**
 * 求最大值的方法
 */
function max() {
    var data = globalData
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
    var maxCompany = "";
    var max = 0;
    type.forEach(function (e) {
        var value = 0;
        data.forEach(function (e1) {

            if (e1[4] == "INCREASED" && e == e1[0]) {
                value = value + parseFloat(e1[3])
            }
            if (e1[4] == "DECREASED" && e == e1[0]) {
                value = value - parseFloat(e1[3])
            }
        })
        value = value.toFixed(1);
        if (value > parseFloat(max)) {
            max = value;
            maxCompany = e;
        }
    })
    console.log("最大值是" + max + "公司名是" + maxCompany);
    var result = [];
    result.push(max);
    result.push(maxCompany)
    return result;
}


function max() {
    var data = globalData
    var type = [];
    var money = 0;
    var year = 0;
    var value = 0;
    var temp = [];
    var j = 0;
    data.forEach(function (e) {

        var i = 0;
        var tempValue = 0;
        type.forEach(function (e1) {
            if (e1 == e[0]) {
                i = 1
                if (e[1] > year) {
                    if (j == 0) {
                        temp = e;
                        value = parseFloat(e[3]);
                    } else {
                        tempValue = parseFloat(e[3]) - parseFloat(temp[3])
                        value = value + tempValue;
                    }
                }
            }
        })
        temp = e;
        j++;
        if (i == 0 && e[0] != "Name") {
            type.push(e[0])
        }
    })
    var maxCompany = "";
    var max = 0;
    type.forEach(function (e) {
        var value = 0;
        data.forEach(function (e1) {

            if (e1[4] == "INCREASED" && e == e1[0]) {
                value = value + parseFloat(e1[3])
            }
            if (e1[4] == "DECREASED" && e == e1[0]) {
                value = value - parseFloat(e1[3])
            }
        })
        value = value.toFixed(1);
        if (value > parseFloat(max)) {
            max = value;
            maxCompany = e;
        }
    })
    console.log("最大值是" + max + "公司名是" + maxCompany);
    var result = [];
    result.push(max);
    result.push(maxCompany)
    return result;
}


/**
 *求最大值的最优方法
 * @returns {Array}
 */

function max1() {

    var data = globalData
    var details = {};
    var result = {};
    var maxCom = "";
    var maxNum = 0;
    var k = 0
    data.forEach(function (e) {
        var e1= e;
        if (k > 0) {
            var tempE = e1[0];
            var tempEe = "e"+e1[0];

            var tempY = "tempy" + e1[0];
            var tempYm = "tempym" + e1[0];
            var tempm = "tempm" + e1[0];
            if (!isNaN(e1[3])) {
                e1[3] = parseFloat(e1[3])
                if (!details[tempE]) {
                    details[tempY] = e1[3];
                    details[tempYm] = e1[3];
                    details[tempE] = e1
                    details[tempEe] = e1
                    //details[e[0]] = e[3];
                } else {

                    //var time = details[tempE].substr(5,2)+details[tempE].substr(8,2)
                    //var time1 = e1[1].substr(5,2)+e1[1].substr(8,2)

                    if (e1[1]>details[tempE][1]) {
                        details[tempE] =e1;
                        details[tempYm] = parseFloat(e1[3]);
                        //tempValue = e[3] - parseFloat( details[tempE][3])
                        //details[e[0]] = details[e[0]] + tempValue;
                    }


                    if (details[tempEe][1] >e1[1] ) {
                        details[tempEe] = e1
                        details[tempY] = parseFloat(e1[3]);
                        //tempValue = parseFloat(details[tempE][3]) - parseFloat(e[3])
                        //details[e[0]] = details[e[0]] + tempValue;
                    }


                }
            }

            result[tempm] = (((details[tempYm] - details[tempY]) / details[tempY])*100).toFixed(1)

        }
        k++;
    })
    //console.log(details);


    for (var key in result) {
        if (parseFloat(result[key]) > parseFloat(maxNum)) {
            maxNum = result[key]
            maxCom = key;
        }
    }

    var results = [];
    results.push(maxCom);
    results.push(maxNum);
    //console.log(result);
    console.log("涨幅最大的公司是: " + maxCom.substr(5) + "   涨幅为: " + maxNum+"%");
    return results;


}


exports.ProData = ProData;
exports.max = max;
exports.max1 = max1;



