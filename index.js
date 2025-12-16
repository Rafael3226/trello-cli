#!/usr/bin/env node

import { Command } from 'commander';
import { listBoards } from './src/commands/listBoards.js';
import { listUsers } from './src/commands/listUsers.js';
import { addUser } from './src/commands/addUser.js';
import { listTasks } from './src/commands/listTasks.js';
import { createTask } from './src/commands/createTask.js';
import { listLists } from './src/commands/listLists.js';
import { updateTask } from './src/commands/updateTask.js';

const program = new Command();

program
  .name('trello')
  .description('CLI tool for interacting with Trello API')
  .version('1.0.0');

program
  .command('list-boards')
  .alias('boards')
  .description('List all boards accessible to the authenticated user')
  .action(listBoards);

program
  .command('list-users')
  .alias('users')
  .description('List all members/users of a specific board')
  .argument('<boardId>', 'The ID of the board')
  .action(listUsers);

program
  .command('add-user')
  .alias('add')
  .description('Add a user to a board by email')
  .argument('<boardId>', 'The ID of the board')
  .argument('<email>', 'The email address of the user to add')
  .option('-t, --type <type>', 'Member type: normal or admin', 'normal')
  .action((boardId, email, options) => {
    addUser(boardId, email, options.type);
  });

program
  .command('list-tasks')
  .alias('tasks')
  .description('List all tasks (cards) in a specific board')
  .argument('<boardId>', 'The ID of the board')
  .action(listTasks);

program
  .command('list-lists')
  .alias('lists')
  .description('List all lists (columns) in a specific board')
  .argument('<boardId>', 'The ID of the board')
  .action(listLists);

program
  .command('create-task')
  .alias('create')
  .description('Create a new task (card) in a list')
  .argument('<listId>', 'The ID of the list to create the task in')
  .argument('<name>', 'The name of the task')
  .option('-d, --desc <description>', 'Task description')
  .option('--due <date>', 'Due date (ISO format: YYYY-MM-DD or YYYY-MM-DDTHH:mm:ss)')
  .option('-p, --pos <position>', 'Position in list (top, bottom, or number)', 'bottom')
  .action((listId, name, options) => {
    createTask(listId, name, options);
  });

program
  .command('update-task')
  .alias('update')
  .description('Update an existing task (card)')
  .argument('<cardId>', 'The ID of the card to update')
  .option('-n, --name <name>', 'New task name')
  .option('-d, --desc <description>', 'Task description (use empty string to clear)')
  .option('--due <date>', 'Due date (ISO format: YYYY-MM-DD or YYYY-MM-DDTHH:mm:ss, use empty string to remove)')
  .option('-l, --list-id <listId>', 'Move task to a different list')
  .option('-p, --pos <position>', 'Position in list (top, bottom, or number)')
  .option('-c, --closed <true|false>', 'Close or open the task')
  .action((cardId, options) => {
    updateTask(cardId, options);
  });

program.parse();

