function buildQuery(){
    yearArrayBuilder();
    console.log(yearArray[0]);
    if(yearArray[0] !== undefined){
        var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="
        +searchItem
        +"&api-key=H9pVolkjnKjCvBtBoiYRdG4vzft2VX1e&fq=pub_year:("
        +yearArray
        +")";
        console.log(queryURL);
        return queryURL;
    }else{
        var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="
        +searchItem
        +"&api-key=H9pVolkjnKjCvBtBoiYRdG4vzft2VX1e";
        console.log(queryURL);
        return queryURL;
    }
    
}

function startSearch(){
    buildQuery();
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
    });
}