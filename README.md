# Trello CLI

A powerful command-line interface tool for interacting with the Trello API. Manage your Trello boards, tasks, and users directly from your terminal.

[![GitHub](https://img.shields.io/badge/GitHub-Rafael3226%2Ftrello--cli-blue)](https://github.com/Rafael3226/trello-cli)
[![License](https://img.shields.io/badge/License-ISC-green.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-v14%2B-green.svg)](https://nodejs.org/)

## Features

- 📋 **List Boards** - View all your Trello boards
- 👥 **Manage Users** - List board members and add users to boards
- 📝 **Task Management** - Create, update, and list tasks (cards)
- 📊 **List Management** - View all lists (columns) in a board
- 🎯 **Easy to Use** - Simple, intuitive command-line interface
- ⚡ **Fast** - Direct API integration with Trello
- 🔒 **Secure** - Environment variable-based authentication

## Prerequisites

- **Node.js** v14 or higher
- **Trello API Credentials**:
  - **API Key**: Get from [Trello Developer API Keys](https://trello.com/app-key)
  - **Token**: Generate from [Trello Token Generator](https://trello.com/1/authorize?expiration=never&scope=read,write&response_type=token&name=Trello%20CLI&key=YOUR_API_KEY)

## Installation

### Local Installation (Development)

1. **Clone the repository:**
```bash
git clone https://github.com/Rafael3226/trello-cli.git
cd trello-cli
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
# Windows PowerShell
$env:TRELLO_API_KEY="your_api_key_here"
$env:TRELLO_TOKEN="your_token_here"

# Linux/Mac
export TRELLO_API_KEY="your_api_key_here"
export TRELLO_TOKEN="your_token_here"

# Or create a .env file in the project root:
TRELLO_API_KEY=your_api_key_here
TRELLO_TOKEN=your_token_here
```

4. **Run commands locally:**
```bash
node index.js list-boards
```

### Global Installation

Install the CLI tool globally to use it from any directory:

**Option 1: Using npm link (for development)**
```bash
# From the project directory
npm link
```

This creates a symlink, allowing you to use `trello` command from anywhere. To unlink:
```bash
npm unlink -g trello-cli
```

**Option 2: Using npm install -g (for production)**
```bash
# From the project directory
npm install -g .
```

Or if published to npm:
```bash
npm install -g trello-cli
```

After global installation, you can use the `trello` command from any directory:
```bash
trello list-boards
```

**Note:** After global installation, make sure to set the environment variables in your system or user environment variables (not just in the project directory).

## Configuration

### Environment Variables

The CLI requires two environment variables:

- `TRELLO_API_KEY` - Your Trello API key
- `TRELLO_TOKEN` - Your Trello API token

**Windows PowerShell (User-level):**
```powershell
[System.Environment]::SetEnvironmentVariable('TRELLO_API_KEY', 'your_api_key', 'User')
[System.Environment]::SetEnvironmentVariable('TRELLO_TOKEN', 'your_token', 'User')
```

**Windows PowerShell (Session-level):**
```powershell
$env:TRELLO_API_KEY="your_api_key_here"
$env:TRELLO_TOKEN="your_token_here"
```

**Linux/Mac:**
```bash
export TRELLO_API_KEY="your_api_key_here"
export TRELLO_TOKEN="your_token_here"
```

**Using .env file:**
Create a `.env` file in your home directory or project root:
```
TRELLO_API_KEY=your_api_key_here
TRELLO_TOKEN=your_token_here
```

## Usage

After global installation, use the `trello` command. For local installation, use `node index.js` instead.

### List Boards

List all boards accessible to the authenticated user:

```bash
trello list-boards
# or
trello boards
```

**Output:**
- Board ID
- Board Name
- Board URL

### List Users

List all members/users of a specific board:

```bash
trello list-users <boardId>
# or
trello users <boardId>
```

**Example:**
```bash
trello list-users 5f8a1b2c3d4e5f6a7b8c9d0e
```

**Output:**
- User ID
- Username
- Full Name
- Email (if available)

### List Lists

List all lists (columns) in a board to get list IDs:

```bash
trello list-lists <boardId>
# or
trello lists <boardId>
```

**Example:**
```bash
trello list-lists 5f8a1b2c3d4e5f6a7b8c9d0e
```

**Output:**
- List ID
- List Name

### List Tasks

List all tasks (cards) in a board:

```bash
trello list-tasks <boardId>
# or
trello tasks <boardId>
```

**Example:**
```bash
trello list-tasks 5f8a1b2c3d4e5f6a7b8c9d0e
```

**Output:**
- Task ID
- Task Name
- List (column) name
- Due Date
- Description (truncated)
- URL

### Create Task

Create a new task (card) in a list:

```bash
trello create-task <listId> <name>
# or
trello create <listId> <name>
```

**Options:**
- `-d, --desc <description>`: Task description
- `--due <date>`: Due date (ISO format: YYYY-MM-DD or YYYY-MM-DDTHH:mm:ss)
- `-p, --pos <position>`: Position in list (top, bottom, or number). Default: bottom

**Examples:**
```bash
# Simple task
trello create-task <listId> "New Task"

# Task with description
trello create-task <listId> "New Task" --desc "Task description"

# Task with due date
trello create-task <listId> "Task with due date" --due "2024-12-31"

# Task at top of list
trello create-task <listId> "Important Task" --pos top

# Task with all options
trello create-task <listId> "Complete Task" --desc "Full description" --due "2024-12-31" --pos top
```

### Update Task

Update an existing task:

```bash
trello update-task <cardId> [options]
# or
trello update <cardId> [options]
```

**Options:**
- `-n, --name <name>`: New task name
- `-d, --desc <description>`: Task description (use empty string to clear)
- `--due <date>`: Due date (ISO format: YYYY-MM-DD or YYYY-MM-DDTHH:mm:ss, use empty string to remove)
- `-l, --list-id <listId>`: Move task to a different list
- `-p, --pos <position>`: Position in list (top, bottom, or number)
- `-c, --closed <true|false>`: Close or open the task

**Examples:**
```bash
# Update task name
trello update-task <cardId> --name "Updated Task Name"

# Update description
trello update-task <cardId> --desc "New description"

# Add/update due date
trello update-task <cardId> --due "2024-12-31"

# Remove due date
trello update-task <cardId> --due ""

# Move task to different list
trello update-task <cardId> --list-id <newListId>

# Close a task
trello update-task <cardId> --closed true

# Open a closed task
trello update-task <cardId> --closed false

# Multiple updates
trello update-task <cardId> --name "New Name" --desc "New Desc" --due "2024-12-31"
```

### Task Detail

Show detailed information about a specific task (card):

```bash
trello task-detail <cardId>
# or
trello detail <cardId>
```

**Example:**
```bash
trello task-detail 5f8a1b2c3d4e5f6a7b8c9d0e
```

**Output:**
- Basic Information (name, ID, status, URL)
- Location (board and list names)
- Full Description
- Due Date (with overdue warning if applicable)
- Assigned Members
- Labels
- Attachments
- Checklists (with completion status)
- Last Activity Date

**Example Output:**
```
============================================================
TASK DETAILS
============================================================

📋 Basic Information:
   Name: Updated Test Task from CLI
   ID: 69419b3d72c13061acf49f35
   Status: ✅ Open
   URL: https://trello.com/c/mrsYSuQB/71-updated-test-task-from-cli

📊 Location:
   Board: Lusso (66f715ac2c46ab510c0a76b3)
   List: Prioritization (670d53cd2c6f73529b868f3a)

📝 Description:
   This task has been updated via the CLI

📅 Due Date:
   12/30/2024, 7:00:00 PM ⚠️  OVERDUE

👥 Members:
   • John Doe (@johndoe)

🏷️  Labels:
   • High Priority (red)

✅ Checklists:
   Checklist 1:
   ✓ Item 1
   ☐ Item 2

🕐 Last Activity:
   12/16/2025, 1:50:48 PM

============================================================
```

### Add User

Add a user to a board by email:

```bash
trello add-user <boardId> <email>
# or
trello add <boardId> <email>
```

**Options:**
- `-t, --type <type>`: Member type (normal or admin). Default: normal

**Examples:**
```bash
# Add normal member
trello add-user 5f8a1b2c3d4e5f6a7b8c9d0e user@example.com

# Add admin member
trello add-user 5f8a1b2c3d4e5f6a7b8c9d0e admin@example.com --type admin
```

## Commands Summary

| Command | Alias | Description | Arguments |
|---------|-------|-------------|-----------|
| `list-boards` | `boards` | List all accessible boards | - |
| `list-users <boardId>` | `users` | List members of a board | `<boardId>` |
| `list-lists <boardId>` | `lists` | List all lists (columns) in a board | `<boardId>` |
| `list-tasks <boardId>` | `tasks` | List all tasks (cards) in a board | `<boardId>` |
| `create-task <listId> <name>` | `create` | Create a new task in a list | `<listId> <name>` |
| `update-task <cardId>` | `update` | Update an existing task | `<cardId>` |
| `task-detail <cardId>` | `detail` | Show detailed information about a task | `<cardId>` |
| `add-user <boardId> <email>` | `add` | Add a user to a board | `<boardId> <email>` |

## Project Structure

```
trello-cli/
├── index.js                 # CLI entry point
├── package.json             # Project configuration
├── README.md                # This file
├── .gitignore               # Git ignore rules
└── src/
    ├── trelloClient.js      # Trello API client wrapper
    └── commands/
        ├── listBoards.js    # List boards command
        ├── listUsers.js     # List users command
        ├── listLists.js     # List lists command
        ├── listTasks.js     # List tasks command
        ├── createTask.js    # Create task command
        ├── updateTask.js    # Update task command
        ├── taskDetail.js    # Task detail command
        └── addUser.js       # Add user command
```

## Dependencies

- **commander** (^11.1.0) - CLI framework for command parsing
- **axios** (^1.6.2) - HTTP client for API requests
- **dotenv** (^16.3.1) - Environment variable management

## Error Handling

The CLI provides clear error messages for:
- Missing environment variables
- Invalid board IDs
- Invalid list IDs
- Invalid card IDs
- Invalid email formats
- API authentication errors
- Network errors
- Missing required arguments

## Examples

### Complete Workflow Example

```bash
# 1. List all boards
trello list-boards

# 2. Get board ID from output, then list lists
trello list-lists <boardId>

# 3. Get list ID, then create a task
trello create-task <listId> "New Feature" --desc "Implement new feature" --due "2024-12-31"

# 4. List tasks to see the new task
trello list-tasks <boardId>

# 5. Get card ID, then view task details
trello task-detail <cardId>

# 6. Update the task
trello update-task <cardId> --name "Updated Feature Name"

# 7. Move task to different list
trello update-task <cardId> --list-id <newListId>

# 8. View updated task details
trello task-detail <cardId>

# 9. Add a user to the board
trello add-user <boardId> user@example.com
```

## Troubleshooting

### Command not found
If you get "command not found" after global installation:
- Make sure npm global bin directory is in your PATH
- Restart your terminal
- Try using `npm link` instead of `npm install -g`

### Authentication errors
- Verify your `TRELLO_API_KEY` and `TRELLO_TOKEN` are set correctly
- Check that the token has the required permissions (read, write)
- Ensure environment variables are set in the correct scope (user vs session)

### API errors
- Check your internet connection
- Verify the board/list/card IDs are correct
- Ensure you have permission to access the resource

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Repository

**GitHub:** https://github.com/Rafael3226/trello-cli

## Notes

- The tool filters out closed boards when listing
- Email validation is performed before making API calls
- All API calls require valid `TRELLO_API_KEY` and `TRELLO_TOKEN` environment variables
- Task descriptions are truncated to 50 characters in list view
- Due dates are displayed in local date format

## Support

For issues, questions, or contributions, please open an issue on the [GitHub repository](https://github.com/Rafael3226/trello-cli/issues).

---

Made with ❤️ for the Trello community
