module.exports = function(app){
    const search = require("./searchController");

    /*
    //통합검색 api
    app.get('/allSearch', search.getAll);
     */

    //게시판 검색 API
    app.get('/app/search/debateSearch', search.getDebate);
};