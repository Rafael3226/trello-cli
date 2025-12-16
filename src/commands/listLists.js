import TrelloClient from '../trelloClient.js';

export async function listLists(boardId) {
  if (!boardId) {
    console.error('Error: Board ID is required.');
    console.log('Usage: trello list-lists <boardId>');
    process.exit(1);
  }

  try {
    const client = new TrelloClient();
    const lists = await client.getBoardLists(boardId);

    if (lists.length === 0) {
      console.log('No lists found on this board.');
      return;
    }

    // Display lists in a table format
    console.log(`\nLists on board ${boardId}:\n`);
    console.table(
      lists.map((list) => ({
        ID: list.id,
        Name: list.name,
      }))
    );
  } catch (error) {
    console.error('Error listing lists:', error.message);
    process.exit(1);
  }
}

