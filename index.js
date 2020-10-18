const program = require("commander");
const pkg = require('./package.json');
const actions = require('./actions.js');

program
	.version(pkg.version)
	.description("Creates quizes from the given questions");

program
	.command("quiz <number_of_questions>")
    .description("Creates a list of question ids")
    .action(actions.createQuiz);

program.parse(process.argv);