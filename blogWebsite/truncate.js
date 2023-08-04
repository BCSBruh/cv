module.exports.truncate = truncate;

function truncate(str) {
    newString = str.slice(0,100);
    return newString + " ...";
}