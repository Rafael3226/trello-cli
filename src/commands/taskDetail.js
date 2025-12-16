import TrelloClient from '../trelloClient.js';

export async function taskDetail(cardId) {
  if (!cardId) {
    console.error('Error: Card ID is required.');
    console.log('Usage: trello task-detail <cardId>');
    process.exit(1);
  }

  try {
    const client = new TrelloClient();
    
    // Get card details first
    const card = await client.getCardDetails(cardId);
    
    // Then get related information
    const [list, board] = await Promise.all([
      client.getList(card.idList).catch(() => null),
      client.getBoard(card.idBoard).catch(() => null),
    ]);

    // Format output
    console.log('\n' + '='.repeat(60));
    console.log('TASK DETAILS');
    console.log('='.repeat(60) + '\n');

    // Basic Information
    console.log('📋 Basic Information:');
    console.log(`   Name: ${card.name}`);
    console.log(`   ID: ${card.id}`);
    console.log(`   Status: ${card.closed ? '❌ Closed' : '✅ Open'}`);
    console.log(`   URL: ${card.url}\n`);

    // Board and List
    console.log('📊 Location:');
    if (board) {
      console.log(`   Board: ${board.name} (${board.id})`);
    } else {
      console.log(`   Board ID: ${card.idBoard}`);
    }
    if (list) {
      console.log(`   List: ${list.name} (${list.id})`);
    } else {
      console.log(`   List ID: ${card.idList}`);
    }
    console.log('');

    // Description
    console.log('📝 Description:');
    if (card.desc && card.desc.trim()) {
      // Split description into lines and indent
      const descLines = card.desc.split('\n');
      descLines.forEach(line => {
        console.log(`   ${line}`);
      });
    } else {
      console.log('   (No description)');
    }
    console.log('');

    // Due Date
    console.log('📅 Due Date:');
    if (card.due) {
      const dueDate = new Date(card.due);
      const now = new Date();
      const isOverdue = dueDate < now && !card.closed;
      const dateStr = dueDate.toLocaleString();
      console.log(`   ${dateStr}${isOverdue ? ' ⚠️  OVERDUE' : ''}`);
    } else {
      console.log('   (No due date)');
    }
    console.log('');

    // Members
    if (card.members && card.members.length > 0) {
      console.log('👥 Members:');
      card.members.forEach(member => {
        const name = member.fullName || member.username || 'Unknown';
        console.log(`   • ${name} (@${member.username || 'N/A'})`);
      });
      console.log('');
    }

    // Labels
    if (card.labels && card.labels.length > 0) {
      console.log('🏷️  Labels:');
      card.labels.forEach(label => {
        const color = label.color || 'none';
        const labelName = label.name || color;
        console.log(`   • ${labelName} (${color})`);
      });
      console.log('');
    }

    // Attachments
    if (card.attachments && card.attachments.length > 0) {
      console.log('📎 Attachments:');
      card.attachments.forEach(attachment => {
        console.log(`   • ${attachment.name} (${attachment.url})`);
      });
      console.log('');
    }

    // Checklists
    if (card.checklists && card.checklists.length > 0) {
      console.log('✅ Checklists:');
      card.checklists.forEach(checklist => {
        console.log(`\n   ${checklist.name}:`);
        if (checklist.checkItems && checklist.checkItems.length > 0) {
          checklist.checkItems.forEach(item => {
            const status = item.state === 'complete' ? '✓' : '☐';
            console.log(`   ${status} ${item.name}`);
          });
        } else {
          console.log('   (No items)');
        }
      });
      console.log('');
    }

    // Last Activity
    if (card.dateLastActivity) {
      const lastActivity = new Date(card.dateLastActivity);
      console.log('🕐 Last Activity:');
      console.log(`   ${lastActivity.toLocaleString()}`);
      console.log('');
    }

    console.log('='.repeat(60) + '\n');
  } catch (error) {
    console.error('Error getting task details:', error.message);
    process.exit(1);
  }
}

