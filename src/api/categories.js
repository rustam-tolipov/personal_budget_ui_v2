import axios from '../axios';

const categoriesApi = {
  async getCategories() {
    try {
      return await axios.get('/categories');
    } catch (e) {
      return e.response;
    }
  },
  async getCategory(id) {
    try {
      return await axios.get(`/categories/${id}`);
    } catch (e) {
      return e.response;
    }
  },
  async getMemberCategories(id) {
    try {
      return await axios.get(`/members/${id}/categories/`);
    } catch (e) {
      return e.response;
    }
  },
  async getIncomesCategories(id) {
    try {
      return await axios.get(`/incomes/${id}/categories`);
    } catch (e) {
      return e.response;
    }
  },
  async getExpensesCategories(id) {
    try {
      return await axios.get(`/expenses/${id}/categories`);
    } catch (e) {
      return e.response;
    }
  },
  async addCategory(data) {
    try {
      return await axios.post('/categories', data);
    } catch (e) {
      return e.response;
    }
  },
  async updateCategory(member_id, category_id, data) {
    try {
      return await axios.put(
        `/members/${member_id}/categories/${category_id}`,
        data
      );
    } catch (e) {
      return e.response;
    }
  },
  async deleteCategory(id) {
    try {
      return await axios.delete(`/categories/${id}`);
    } catch (e) {
      return e.response;
    }
  },
  async deleteMemberCategory(member_id, category_id) {
    try {
      return await axios.post(
        `/member/${member_id}/category/${category_id}/remove`
      );
    } catch (e) {
      return e.response;
    }
  },
};

export default categoriesApi;
