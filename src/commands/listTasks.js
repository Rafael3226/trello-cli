import TrelloClient from '../trelloClient.js';

export async function listTasks(boardId) {
  if (!boardId) {
    console.error('Error: Board ID is required.');
    console.log('Usage: trello list-tasks <boardId>');
    process.exit(1);
  }

  try {
    const client = new TrelloClient();
    
    // Get cards and lists in parallel
    const [cards, lists] = await Promise.all([
      client.getBoardCards(boardId),
      client.getBoardLists(boardId),
    ]);

    // Create a map of list ID to list name
    const listMap = {};
    lists.forEach((list) => {
      listMap[list.id] = list.name;
    });

    if (cards.length === 0) {
      console.log('No tasks found on this board.');
      return;
    }

    // Filter out closed cards for cleaner output
    const openCards = cards.filter((card) => !card.closed);

    if (openCards.length === 0) {
      console.log('No open tasks found on this board.');
      return;
    }

    // Format due date
    const formatDate = (dateString) => {
      if (!dateString) return 'N/A';
      const date = new Date(dateString);
      return date.toLocaleDateString();
    };

    // Display tasks in a table format
    console.log(`\nTasks on board ${boardId}:\n`);
    console.table(
      openCards.map((card) => ({
        ID: card.id,
        Name: card.name,
        List: listMap[card.idList] || 'Unknown',
        'Due Date': formatDate(card.due),
        Description: card.desc ? (card.desc.length > 50 ? card.desc.substring(0, 50) + '...' : card.desc) : 'N/A',
        URL: card.url,
      }))
    );
  } catch (error) {
    console.error('Error listing tasks:', error.message);
    process.exit(1);
  }
}

