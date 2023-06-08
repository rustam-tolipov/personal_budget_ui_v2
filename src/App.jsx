import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { checkAuthState } from './redux/actions/auth';
import PrivateRoute from './components/PrivateRoute';
import Main from './pages/dashboard/Main';
import Category from './pages/category/Category';
import Incomes from './pages/incomes/Incomes';
import Expenses from './pages/expenses/Expenses';
import UnderConsturction from './components/UnderConstuction';
import Settings from './pages/profile/Settings';
import Loading from './components/Loading';

const Login = React.lazy(() => import('./pages/registration/Login'));
const Signup = React.lazy(() => import('./pages/registration/Signup'));
const Dashboard = React.lazy(() => import('./pages/dashboard/Dashboard'));

function App() {
  const isLoading = useSelector((state) => state.auth.isLoading);
  const currentUser = useSelector((state) => state.auth.currentUser);

  const main_member_id = currentUser && String(currentUser.member_id);
  const dispatch = useDispatch();
  dispatch(checkAuthState());

  return (
    <BrowserRouter>
      {isLoading ? (
        <Loading />
      ) : (
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route
                path='/'
                element={
                  <Dashboard
                    current='user'
                    component={
                      <Main
                        current='user'
                        type='user/categories'
                        main_member_id={main_member_id}
                      />
                    }
                  />
                }
              />

              <Route
                path='user/calendar'
                element={
                  <Dashboard current='user' component={<UnderConsturction />} />
                }
              />

              <Route
                path='user/bills'
                element={
                  <Dashboard current='user' component={<UnderConsturction />} />
                }
              />

              <Route
                path='user/settings'
                element={<Dashboard current='user' component={<Settings />} />}
              />

              <Route
                path='member/:id/calendar'
                element={
                  <Dashboard current='user' component={<UnderConsturction />} />
                }
              />

              <Route
                path='member/:id/bills'
                element={
                  <Dashboard current='user' component={<UnderConsturction />} />
                }
              />

              <Route
                path='user/dashboard'
                element={
                  <Dashboard
                    current='user'
                    component={
                      <Main
                        current='user'
                        type='user/categories'
                        main_member_id={main_member_id}
                      />
                    }
                  />
                }
              />

              <Route
                path='user/incomes'
                element={
                  <Dashboard
                    current='user'
                    component={
                      <Incomes
                        type='user/incomes'
                        main_member_id={main_member_id}
                      />
                    }
                  />
                }
              />

              <Route
                path='user/expenses'
                element={
                  <Dashboard
                    current='user'
                    component={
                      <Expenses
                        type='user/expenses'
                        main_member_id={main_member_id}
                      />
                    }
                  />
                }
              />

              <Route
                path='user/incomes/:category_id'
                element={
                  <Dashboard
                    current='user'
                    component={
                      <Category
                        current='user'
                        main_member_id={main_member_id}
                      />
                    }
                  />
                }
              />

              <Route
                path='user/expenses/:category_id'
                element={
                  <Dashboard
                    current='user'
                    component={
                      <Category
                        current='user'
                        main_member_id={main_member_id}
                      />
                    }
                  />
                }
              />

              <Route
                path='user/categories/:category_id'
                element={
                  <Dashboard
                    current='user'
                    component={
                      <Category
                        current='user'
                        main_member_id={main_member_id}
                      />
                    }
                  />
                }
              />

              <Route
                path='member/:member_id/dashboard'
                element={
                  <Dashboard
                    current='member'
                    component={<Main current='member' type='categories' />}
                  />
                }
              />

              <Route
                path='member/:member_id/incomes'
                element={
                  <Dashboard
                    current='member'
                    component={<Incomes type='incomes' />}
                  />
                }
              />

              <Route
                path='member/:member_id/expenses'
                element={
                  <Dashboard
                    current='member'
                    component={<Expenses type='expenses' />}
                  />
                }
              />

              <Route
                path='/member/:member_id/incomes/:category_id'
                element={
                  <Dashboard
                    current='member'
                    component={<Category current='member' />}
                  />
                }
              />

              <Route
                path='/member/:member_id/expenses/:category_id'
                element={
                  <Dashboard
                    current='member'
                    component={<Category current='member' />}
                  />
                }
              />

              <Route
                path='/member/:member_id/categories/:category_id'
                element={
                  <Dashboard
                    current='member'
                    component={<Category current='member' />}
                  />
                }
              />
            </Route>

            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />

            <Route
              path='*'
              element={
                <h1
                  style={{
                    height: '100vh',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#dcdc16',
                    backgroundColor: '#333',
                    fontSize: '3rem',
                  }}
                >
                  404 Not Found
                </h1>
              }
            />
          </Routes>
        </Suspense>
      )}
    </BrowserRouter>
  );
}

export default App;
