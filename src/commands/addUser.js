import TrelloClient from '../trelloClient.js';

export async function addUser(boardId, email, type = 'normal') {
  if (!boardId) {
    console.error('Error: Board ID is required.');
    console.log('Usage: trello add-user <boardId> <email>');
    process.exit(1);
  }

  if (!email) {
    console.error('Error: Email is required.');
    console.log('Usage: trello add-user <boardId> <email>');
    process.exit(1);
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.error('Error: Invalid email format.');
    process.exit(1);
  }

  try {
    const client = new TrelloClient();
    await client.addMemberToBoard(boardId, email, type);

    console.log(`✓ Successfully added ${email} to board ${boardId}`);
  } catch (error) {
    console.error('Error adding user:', error.message);
    process.exit(1);
  }
}

