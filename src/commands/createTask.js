import TrelloClient from '../trelloClient.js';

export async function createTask(listId, name, options = {}) {
  if (!listId) {
    console.error('Error: List ID is required.');
    console.log('Usage: trello create-task <listId> <name>');
    process.exit(1);
  }

  if (!name) {
    console.error('Error: Task name is required.');
    console.log('Usage: trello create-task <listId> <name>');
    process.exit(1);
  }

  try {
    const client = new TrelloClient();
    
    const cardOptions = {};
    if (options.desc) {
      cardOptions.desc = options.desc;
    }
    if (options.due) {
      cardOptions.due = options.due;
    }
    if (options.pos) {
      cardOptions.pos = options.pos;
    }

    const card = await client.createCard(listId, name, cardOptions);

    console.log(`✓ Successfully created task: "${card.name}"`);
    console.log(`  ID: ${card.id}`);
    console.log(`  URL: ${card.url}`);
    
    if (card.desc) {
      console.log(`  Description: ${card.desc}`);
    }
    if (card.due) {
      console.log(`  Due Date: ${new Date(card.due).toLocaleDateString()}`);
    }
  } catch (error) {
    console.error('Error creating task:', error.message);
    process.exit(1);
  }
}

