const fs = require('fs');

const getQuestionHash = function () {
    const questionList = fs.readFileSync('./questions.csv','utf-8')
        .split(require('os').EOL)
        .filter(row => !!row) // removes any empty lines at the end
        .map(row => row.split(','));
    const keys = questionList.shift();
    const questionHash = {};
    questionList.forEach((row)=>{
        const questionObject = {};
        row.forEach((value, colIndex) => {
            questionObject[keys[colIndex]] = value;
        });
        questionHash[questionObject.question_id] = questionObject;
    })
    return questionHash;
}


const getStrands = function (hash) {
    const strands = {};
    for (let key in hash) {
        const question = hash[key];
        if (!strands[question.strand_id]) {
            strands[question.strand_id] = [];
        }
        strands[question.strand_id].push(question);
    }
    return strands;
}

const getIds = function (questionList) {
    return questionList.map(question => question.question_id)
}
module.exports = {
    getQuestionHash,
    getStrands,
    getIds
};