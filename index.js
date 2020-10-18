const program = require("commander");
const pkg = require('./package.json');
const {getQuestionHash} = require('./functions.js')

program
	.version(pkg.version)
	.description("Creates quizes from the given questions");

program
	.command("quiz <number_of_questions>")
    .description("Creates a list of question ids")
    .action((number_of_questions)=>{
        console.log(getQuestionHash())
    });

program.parse(process.argv);