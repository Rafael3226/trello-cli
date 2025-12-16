# Trello CLI

A command-line interface tool for interacting with the Trello API. This tool allows you to list boards, list users from boards, and add users to boards.

## Prerequisites

- Node.js (v14 or higher)
- Trello API credentials:
  - API Key: Get from [Trello Developer API Keys](https://trello.com/app-key)
  - Token: Generate from [Trello Token Generator](https://trello.com/1/authorize?expiration=never&scope=read,write&response_type=token&name=Trello%20CLI&key=YOUR_API_KEY)

## Installation

### Local Installation (Development)

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
# Windows PowerShell
$env:TRELLO_API_KEY="your_api_key_here"
$env:TRELLO_TOKEN="your_token_here"

# Or create a .env file in the project root:
TRELLO_API_KEY=your_api_key_here
TRELLO_TOKEN=your_token_here
```

3. Run commands locally:
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

## Usage

After global installation, use the `trello` command. For local installation, use `node index.js` instead.

### List Boards

List all boards accessible to the authenticated user:

```bash
trello list-boards
# or
trello boards
```

### List Users

List all members/users of a specific board:

```bash
trello list-users <boardId>
# or
trello users <boardId>
```

Example:
```bash
trello list-users 5f8a1b2c3d4e5f6a7b8c9d0e
```

### List Lists

List all lists (columns) in a board to get list IDs:

```bash
trello list-lists <boardId>
# or
trello lists <boardId>
```

### List Tasks

List all tasks (cards) in a board:

```bash
trello list-tasks <boardId>
# or
trello tasks <boardId>
```

### Create Task

Create a new task (card) in a list:

```bash
trello create-task <listId> <name>
# or
trello create <listId> <name>
```

Options:
- `-d, --desc <description>`: Task description
- `--due <date>`: Due date (ISO format: YYYY-MM-DD)
- `-p, --pos <position>`: Position in list (top, bottom, or number)

Examples:
```bash
trello create-task <listId> "New Task" --desc "Task description"
trello create-task <listId> "Task with due date" --due "2024-12-31"
```

### Update Task

Update an existing task:

```bash
trello update-task <cardId> [options]
# or
trello update <cardId> [options]
```

Options:
- `-n, --name <name>`: New task name
- `-d, --desc <description>`: Task description
- `--due <date>`: Due date (use empty string to remove)
- `-l, --list-id <listId>`: Move task to different list
- `-p, --pos <position>`: Position in list
- `-c, --closed <true|false>`: Close or open task

Examples:
```bash
trello update-task <cardId> --name "Updated Name"
trello update-task <cardId> --due "2024-12-31"
trello update-task <cardId> --list-id <newListId>
```

### Add User

Add a user to a board by email:

```bash
trello add-user <boardId> <email>
# or
trello add <boardId> <email>
```

Options:
- `-t, --type <type>`: Member type (normal or admin). Default: normal

Examples:
```bash
trello add-user 5f8a1b2c3d4e5f6a7b8c9d0e user@example.com
trello add-user 5f8a1b2c3d4e5f6a7b8c9d0e admin@example.com --type admin
```

## Commands Summary

| Command | Alias | Description |
|---------|-------|-------------|
| `list-boards` | `boards` | List all accessible boards |
| `list-users <boardId>` | `users` | List members of a board |
| `list-lists <boardId>` | `lists` | List all lists (columns) in a board |
| `list-tasks <boardId>` | `tasks` | List all tasks (cards) in a board |
| `create-task <listId> <name>` | `create` | Create a new task in a list |
| `update-task <cardId>` | `update` | Update an existing task |
| `add-user <boardId> <email>` | `add` | Add a user to a board |

## Error Handling

The CLI provides clear error messages for:
- Missing environment variables
- Invalid board IDs
- Invalid email formats
- API authentication errors
- Network errors

## Notes

- The tool filters out closed boards when listing
- Email validation is performed before making API calls
- All API calls require valid `TRELLO_API_KEY` and `TRELLO_TOKEN` environment variables

