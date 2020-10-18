const {getQuestionHash, getStrands, getIds, getStrandsByStandard} = require('./functions.js');

const validateInput = function (number_of_questions) {
    if (number_of_questions <= 0) {
        return 'Please use a valid integer greater than zero';
    }
    if (isNaN(parseInt(number_of_questions))) {
        return 'Please use a valid integer greater than zero';
    }
}

function getStandardsHash(availableQuestions) {
    const standardsByStrand = {};
    for (let strandId in availableQuestions) {
        const questions = availableQuestions[strandId];
        if (!standardsByStrand[strandId]) {
            standardsByStrand[strandId] = {
                pointer: 0,
                ids: []
            };
        }
        for (let standard_id in questions) {
            if (!standardsByStrand[strandId].ids.includes(standard_id)) {
                standardsByStrand[strandId].ids.push(standard_id);
            }
        }
    }
    return standardsByStrand;
}

function getEvenStrands(count) {
    const quesitonHash = getQuestionHash();
    const availableQuestions = getStrands(quesitonHash);
    const strandIds = Object.keys(availableQuestions);
    const quizList = [];
    let i = 0
    while (quizList.length < count) {
        let strandId = strandIds[i % strandIds.length];
        let nextQuestion = availableQuestions[strandId].pop();
        if (!nextQuestion) {
            // TODO: repopulate the list? pull from another strand?
            availableQuestions[strandId] = getStrands(quesitonHash)[strandId];
            continue;
        }
        quizList.push(nextQuestion);
        i++;
    }

    console.log(getIds(quizList).join(","));
}

function getEvenStandards(count) {
    const quesitonHash = getQuestionHash();
    const availableQuestions = getStrandsByStandard(quesitonHash);
    const strandIds = Object.keys(availableQuestions);
    const quizList = [];
    const standardsHash = getStandardsHash(availableQuestions);
    let i = 0


    while (quizList.length < count) {
        let strandId = strandIds[i % strandIds.length];
        let standardId = standardsHash[strandId].ids[standardsHash[strandId].pointer];
        // increase the pointer to the next standard id
        standardsHash[strandId].pointer = (standardsHash[strandId].pointer+1) % standardsHash[strandId].ids.length;
        let nextQuestion = availableQuestions[strandId][standardId].pop();
        if (!nextQuestion) {
            availableQuestions[strandId][standardId] = getStrandsByStandard(quesitonHash)[strandId][standardId];
            continue;
        }
        quizList.push(nextQuestion);
        i++;
    }
    console.log(quizList);
}

const createQuiz = function(number_of_questions, cmd) {
    const msg = validateInput(number_of_questions);
    if (msg) {
        return console.log(msg);
    }

    const count = parseInt(number_of_questions);
    // getEvenStrands(count);
    getEvenStandards(count);
}


module.exports = {
    createQuiz
};