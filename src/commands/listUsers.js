import TrelloClient from '../trelloClient.js';

export async function listUsers(boardId) {
  if (!boardId) {
    console.error('Error: Board ID is required.');
    console.log('Usage: trello list-users <boardId>');
    process.exit(1);
  }

  try {
    const client = new TrelloClient();
    const members = await client.getBoardMembers(boardId);

    if (members.length === 0) {
      console.log('No members found on this board.');
      return;
    }

    // Display members in a table format
    console.log(`\nMembers of board ${boardId}:\n`);
    console.table(
      members.map((member) => ({
        ID: member.id,
        Username: member.username || 'N/A',
        'Full Name': member.fullName || 'N/A',
        Email: member.email || 'N/A',
      }))
    );
  } catch (error) {
    console.error('Error listing users:', error.message);
    process.exit(1);
  }
}

