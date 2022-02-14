const https = require('https');

let activitySheetUrl = "https://docs.google.com/spreadsheets/d/1h1hB4qILcTe2szngNc9sYRtRP3RPvAryaR1NABMkWwc/gviz/tq?tqx=out:json";

exports.loadIndexView = function (req, res, next) {
    https.get(activitySheetUrl, (resHttps) => {
        let body = "";

        resHttps.on("data", (chunk) => {
            body += chunk;
        });

        resHttps.on("end", () => {
            try {
                // let json = JSON.parse(body);
                // // do something with JSON
                // console.log(json);
                
                body = body.replace(/.*google.visualization.Query.setResponse\(/, "");
                body = body.substring(7, body.length - 2);
                let json = JSON.parse(body);
                let jsonData = json.table.rows;
                let keyName = jsonData[0].c[0].v;
                let valName = jsonData[0].c[1].v;
                var activityTypesData = [];
                for (var i = 1; i < jsonData.length; i++) {
                    var tempObj = {};
                    tempObj[keyName] = jsonData[i].c[0].v;
                    tempObj[valName] = jsonData[i].c[1].v;
                    activityTypesData.push(tempObj);
                }
                // var activityTypesDataAsString = JSON.stringify(activityTypesData);
                // console.log(activityTypesDataAsString);
                res.render('index', { title: 'Auto Generate Tool', activityTypesMapping: activityTypesData });
            } catch (error) {
                console.error(error.message);
            };
        });

    }).on("error", (error) => {
        console.error(error.message);
    });
    // res.render('index', { title: 'Auto Generate Tool' });
}