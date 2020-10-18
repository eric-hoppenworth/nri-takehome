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


// sorting as suggested puts duplicate questions next to one another
function getSortedQuiz(quizList) {
    return quizList.map(item => item).sort((questionA, questionB) => {
        if (questionA.standard_id === questionB.standard_id) {
            if (questionA.difficulty < questionB.difficulty) {
                return -1; // A comes first
            } else if (questionA.difficulty > questionB.difficulty){
                return 1; // A comes second
            }
            return 0;
        } else {
            return questionA.standard_id < questionB.standard_id ? -1 : 1;
        }
    });
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
        // TODO: check if this question is in the "usage" list.  if it is, omit it once (and remove from usage list?)
        if (!nextQuestion) {
            availableQuestions[strandId] = getStrands(quesitonHash)[strandId];
            continue;
        }
        quizList.push(nextQuestion);
        i++;
    }

    console.log(getIds(getSortedQuiz(quizList)).join(","));
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

        standardsHash[strandId].pointer = (standardsHash[strandId].pointer+1) % standardsHash[strandId].ids.length;
        let nextQuestion = availableQuestions[strandId][standardId].pop();
        // TODO: check if this question is in the "usage" list.  if it is, omit it once (and remove from usage list?)
        if (!nextQuestion) {
            availableQuestions[strandId][standardId] = getStrandsByStandard(quesitonHash)[strandId][standardId];
            standardsHash[strandId].pointer = 0;
            continue;
        }
        quizList.push(nextQuestion);
        i++;
    }
    console.log(getIds(getSortedQuiz(quizList)).join(","));
}

const createQuiz = function(number_of_questions, cmd) {
    const msg = validateInput(number_of_questions);
    if (msg) {
        return console.log(msg);
    }
    const count = parseInt(number_of_questions);
    if (cmd.ignoreStandards) {
        getEvenStrands(count);
    } else {
        getEvenStandards(count);
    }
}


module.exports = {
    createQuiz
};