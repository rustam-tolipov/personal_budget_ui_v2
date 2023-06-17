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
};

export default transactionsApi;
