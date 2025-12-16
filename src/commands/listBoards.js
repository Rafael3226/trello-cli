import TrelloClient from '../trelloClient.js';

export async function listBoards() {
  try {
    const client = new TrelloClient();
    const boards = await client.getBoards();

    if (boards.length === 0) {
      console.log('No boards found.');
      return;
    }

    // Filter out closed boards for cleaner output
    const openBoards = boards.filter((board) => !board.closed);

    if (openBoards.length === 0) {
      console.log('No open boards found.');
      return;
    }

    // Display boards in a table format
    console.log('\nYour Trello Boards:\n');
    console.table(
      openBoards.map((board) => ({
        ID: board.id,
        Name: board.name,
        URL: board.url,
      }))
    );
  } catch (error) {
    console.error('Error listing boards:', error.message);
    process.exit(1);
  }
}

