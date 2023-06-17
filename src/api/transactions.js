import axios from '../axios';

const transactionsApi = {
  async getTransactions() {
    try {
      return await axios.get('/transactions');
    } catch (e) {
      return e.response;
    }
  },
  async getCategoryTransactions(member_id, category_id) {
    try {
      return await axios.get(
        `/${member_id}/categories/${category_id}/transactions/`
      );
    } catch (e) {
      return e.response;
    }
  },
  async getRecentTransactions(member_id) {
    try {
      return await axios.get(`/${member_id}/recent_transactions/`);
    } catch (e) {
      return e.response;
    }
  },
  async searchTransactions(member_id, name) {
    try {
      return await axios.get(
        `member/${member_id}/transactions/search?query=${name}`
      );
    } catch (e) {
      return e.response;
    }
  },
  async deleteTransaction(id) {
    try {
      return await axios.delete(`/transactions/${id}`);
    } catch (e) {
      return e.response;
    }
  },
  async updateTransaction(member_id, category_id, id, data) {
    try {
      return await axios.put(
        `/member/${member_id}/categories/${category_id}/transactions/${id}`,
        data
      );
    } catch (e) {
      return e.response;
    }
  },
};

export default transactionsApi;
