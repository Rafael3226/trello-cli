import TrelloClient from '../trelloClient.js';

export async function updateTask(cardId, options = {}) {
  if (!cardId) {
    console.error('Error: Card ID is required.');
    console.log('Usage: trello update-task <cardId> [options]');
    process.exit(1);
  }

  // Check if at least one update option is provided
  if (!options.name && options.desc === undefined && !options.due && !options.listId && !options.pos && options.closed === undefined) {
    console.error('Error: At least one update option is required.');
    console.log('Options: --name, --desc, --due, --list-id, --pos, --closed');
    process.exit(1);
  }

  try {
    const client = new TrelloClient();
    
    const updateOptions = {};
    if (options.name) {
      updateOptions.name = options.name;
    }
    if (options.desc !== undefined) {
      updateOptions.desc = options.desc;
    }
    if (options.due) {
      updateOptions.due = options.due;
    }
    if (options.listId) {
      updateOptions.idList = options.listId;
    }
    if (options.pos) {
      updateOptions.pos = options.pos;
    }
    if (options.closed !== undefined) {
      updateOptions.closed = options.closed === 'true' || options.closed === true;
    }

    const card = await client.updateCard(cardId, updateOptions);

    console.log(`✓ Successfully updated task: "${card.name}"`);
    console.log(`  ID: ${card.id}`);
    console.log(`  URL: ${card.url}`);
    
    if (card.desc) {
      console.log(`  Description: ${card.desc}`);
    }
    if (card.due) {
      console.log(`  Due Date: ${new Date(card.due).toLocaleDateString()}`);
    }
    if (card.closed !== undefined) {
      console.log(`  Status: ${card.closed ? 'Closed' : 'Open'}`);
    }
  } catch (error) {
    console.error('Error updating task:', error.message);
    process.exit(1);
  }
}

