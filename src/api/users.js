import axios from '../axios';

const usersApi = {
  async getUser(id) {
    try {
      return await axios.get(`/users/${id}`);
    } catch (e) {
      return e.response;
    }
  },
  async getUserPosts(id) {
    try {
      return await axios.get(`/users/${id}/posts`);
    } catch (e) {
      return e.response;
    }
  },
  async addMember(data) {
    try {
      return await axios.post('/members', data);
    } catch (e) {
      return e.response;
    }
  },
  async getMembers() {
    try {
      return await axios.get('/members');
    } catch (e) {
      return e.response;
    }
  },

  async getMostResentMembers() {
    try {
      return await axios.get(`/most_resent_members/`);
    } catch (e) {
      return e.response;
    }
  },

  async getSettingsMembers() {
    try {
      return await axios.get(`/settings_members/`);
    } catch (e) {
      return e.response;
    }
  },

  async getMember(id) {
    try {
      return await axios.get(`/members/${id}`);
    } catch (e) {
      return e.response;
    }
  },

  async deleteMember(id) {
    try {
      return await axios.delete(`/members/${id}`);
    } catch (e) {
      return e.response;
    }
  },

  async updateMember(id, data, headers) {
    try {
      return await axios.put(`/members/${id}`, data, headers);
    } catch (e) {
      return e.response;
    }
  },

  async updateUser(id, data) {
    try {
      return await axios.put(`/auth/users/${id}`, data);
    } catch (e) {
      return e.response;
    }
  },
  async findByUsername(username) {
    try {
      return await axios.get(`/users/show/${username}`);
    } catch (e) {
      return e.response;
    }
  },
  async suggestedUsers() {
    try {
      return await axios.get('/suggestions');
    } catch (e) {
      return e.response;
    }
  },
};

export default usersApi;
