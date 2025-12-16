import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables from .env file if it exists
dotenv.config();

const TRELLO_API_BASE = 'https://api.trello.com/1';

class TrelloClient {
    constructor() {
        this.apiKey = process.env.TRELLO_API_KEY;
        this.token = process.env.TRELLO_TOKEN;

        if (!this.apiKey || !this.token) {
            throw new Error(
                'Missing Trello credentials. Please set TRELLO_API_KEY and TRELLO_TOKEN environment variables.'
            );
        }
    }

    /**
     * Build query string with authentication parameters
     */
    buildQueryString(params = {}) {
        const queryParams = new URLSearchParams({
            key: this.apiKey,
            token: this.token,
            ...params,
        });
        return queryParams.toString();
    }

    /**
     * Make a GET request to Trello API
     */
    async get(endpoint, params = {}) {
        try {
            const queryString = this.buildQueryString(params);
            const url = `${TRELLO_API_BASE}${endpoint}?${queryString}`;
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            if (error.response) {
                throw new Error(
                    `Trello API Error: ${error.response.status} - ${error.response.data?.message || error.message}`
                );
            }
            throw new Error(`Network Error: ${error.message}`);
        }
    }

    /**
     * Make a PUT request to Trello API
     */
    async put(endpoint, params = {}) {
        try {
            const queryString = this.buildQueryString(params);
            const url = `${TRELLO_API_BASE}${endpoint}?${queryString}`;
            const response = await axios.put(url);
            return response.data;
        } catch (error) {
            if (error.response) {
                throw new Error(
                    `Trello API Error: ${error.response.status} - ${error.response.data?.message || error.message}`
                );
            }
            throw new Error(`Network Error: ${error.message}`);
        }
    }

    /**
     * Make a POST request to Trello API
     */
    async post(endpoint, params = {}) {
        try {
            const queryString = this.buildQueryString(params);
            const url = `${TRELLO_API_BASE}${endpoint}?${queryString}`;
            const response = await axios.post(url);
            return response.data;
        } catch (error) {
            if (error.response) {
                throw new Error(
                    `Trello API Error: ${error.response.status} - ${error.response.data?.message || error.message}`
                );
            }
            throw new Error(`Network Error: ${error.message}`);
        }
    }

    /**
     * Get all boards for the authenticated user
     */
    async getBoards() {
        return this.get('/members/me/boards', {
            fields: 'id,name,url,closed',
        });
    }

    /**
     * Get all members of a board
     */
    async getBoardMembers(boardId) {
        return this.get(`/boards/${boardId}/members`, {
            fields: 'id,username,fullName,email',
        });
    }

    /**
     * Add a member to a board by email
     */
    async addMemberToBoard(boardId, email, type = 'normal') {
        return this.put(`/boards/${boardId}/members`, {
            email: email,
            type: type, // 'normal' or 'admin'
        });
    }

    /**
     * Get all cards (tasks) from a board
     */
    async getBoardCards(boardId) {
        return this.get(`/boards/${boardId}/cards`, {
            fields: 'id,name,desc,due,idList,url,closed',
        });
    }

    /**
     * Get all lists from a board (to map list IDs to names)
     */
    async getBoardLists(boardId) {
        return this.get(`/boards/${boardId}/lists`, {
            fields: 'id,name',
        });
    }

    /**
     * Get detailed information about a specific card
     */
    async getCardDetails(cardId) {
        return this.get(`/cards/${cardId}`, {
            fields: 'id,name,desc,due,idList,idBoard,url,closed,dateLastActivity',
            members: 'true',
            member_fields: 'id,username,fullName',
            labels: 'true',
            attachments: 'true',
            checklists: 'all',
        });
    }

    /**
     * Get board information by ID
     */
    async getBoard(boardId) {
        return this.get(`/boards/${boardId}`, {
            fields: 'id,name,url',
        });
    }

    /**
     * Get list information by ID
     */
    async getList(listId) {
        return this.get(`/lists/${listId}`, {
            fields: 'id,name,idBoard',
        });
    }

    /**
     * Create a new card (task) in a list
     */
    async createCard(listId, name, options = {}) {
        const params = {
            idList: listId,
            name: name,
        };

        if (options.desc) {
            params.desc = options.desc;
        }
        if (options.due) {
            params.due = options.due;
        }
        if (options.pos) {
            params.pos = options.pos;
        }

        return this.post('/cards', params);
    }

    /**
     * Update an existing card (task)
     */
    async updateCard(cardId, options = {}) {
        const params = {};

        if (options.name) {
            params.name = options.name;
        }
        if (options.desc !== undefined) {
            params.desc = options.desc;
        }
        if (options.due !== undefined) {
            params.due = options.due;
        }
        if (options.idList) {
            params.idList = options.idList;
        }
        if (options.pos) {
            params.pos = options.pos;
        }
        if (options.closed !== undefined) {
            params.closed = options.closed;
        }

        return this.put(`/cards/${cardId}`, params);
    }
}

export default TrelloClient;

