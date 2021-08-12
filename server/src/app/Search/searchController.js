const searchProvider = require("./searchProvider");
const searchService = require("./searchService");

/*
//통합검색 api
exports.getAll = async function(req, res) {
    const token = req.query.token;
    const result = await searchProvider.getAllList(token);
}
*/

exports.getDebate = async function(req, res) {
    const search = req.query.search;
    const filter = req.query.filter;

    const getDebateResult = await searchProvider.getDebateList(search, filter);
    return res.send(getDebateResult);
}
