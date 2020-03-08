// var express = require('express');
// var app = express();

// fs module is file system module used to read data
// var fs = require('fs');

var reportsConfirmed = 

// var confirmed = 
fs.readFile('./csse_covid_19_time_series/time_series_19-covid-Confirmed.csv', 'utf8', function(err, contents){
    confirmed = contents;
    strDelimiter =  ",";

    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        // This is used to do a case insensitive search
        "gi"
        );


    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];

    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;


    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec( confirmed )){

        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[ 1 ];

        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
            strMatchedDelimiter.length &&
            strMatchedDelimiter !== strDelimiter
            ){

            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push( [] );

        }

        var strMatchedValue;

        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[ 2 ]){

            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            strMatchedValue = arrMatches[ 2 ].replace(
                new RegExp( "\"\"", "g" ),
                "\""
                );

        } else {

            // We found a non-quoted value.
            strMatchedValue = arrMatches[ 3 ];

        }

        // Now that we have our value string, let's add
        // it to the data array.
        arrData[ arrData.length - 1 ].push( strMatchedValue );
    }
    console.log(arrData.length)
    console.log("the row size is: ", arrData[1].length);
    var total = 0;
    for(var i = 1; i < arrData.length; i++){
        // console.log(arrData[i])
        // for (var j = 4; j < arrData[i].length; j++){
            // console.log("the length it", arrData[i].length)
            total+=parseInt(arrData[i][49]);
            // console.log(parseInt(arrData[i][j]));
        // }
    }
    var totalConfirmed = document.getElementById('confirmed');
    var totalCount = document.createTextNode(total);
    totalConfirmed.appendChild(totalCount);
    
    console.log("the result is: ", total);
});

const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log(`listening on ${port}`));
