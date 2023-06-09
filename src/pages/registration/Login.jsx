import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import authApi from '../../api/auth';
import { authSuccess } from '../../redux/actions/auth';

import '../../sass/main.scss';
import logo from '../../assets/img/beedget.svg';
import styles from './Login.module.css';
import Loading from '../../components/Loading';

const Login = () => {
  const dispatch = useDispatch();

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const guestUser = {
    user: {
      email: 'bob@gmail.com',
      password: 'mmmmmm',
    },
  };

  const guestLogin = async () => {
    const response = await authApi.login(guestUser);

    if (response.status === 200) {
      dispatch(authSuccess(response));
      navigate('/user/dashboard');
    } else {
      setError(response.data.errors);
    }
  };

  const onSubmit = async (data) => {
    data.preventDefault();
    setIsLoading(true);

    data = {
      user: {
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value,
      },
    };

    const response = await authApi.login(data);

    if (response.status === 200) {
      dispatch(authSuccess(response));
      navigate('/user/dashboard');
    } else {
      setError(response.data.error);
    }

    setIsLoading(false);
  };

  if (isLoading) return <Loading />;

  return (
    <div className={styles.login}>
      <div className={styles.login__content_box}>
        <div className={styles.login__logo}>
          <img className={styles.logo} src={logo} alt='Beedget logo' />
          <span>beedget</span>
          <span className={styles.error_text}>{error}</span>
        </div>
        <div className={styles.login__box}>
          <div className={styles.login__container} action=''>
            <h1 className={styles.heading__primary}>Welcome back!</h1>
            <h4 className={styles.subheading}>Please enter your details.</h4>
            <form onSubmit={onSubmit}>
              {error && <p className={styles.login__error}>{error}</p>}
              <br />

              <label className={styles.login__label} htmlFor='email'>
                Email
              </label>
              <input
                className={styles.login__input}
                type='email'
                name='email'
                id='email'
                ref={emailInputRef}
                required
              />
              <br />
              <label className={styles.login__label} htmlFor='password'>
                Password
              </label>
              <input
                className={styles.login__input}
                type='password'
                name='password'
                id='password'
                ref={passwordInputRef}
                required
              />
              <br />

              <button type='submit' className={styles.btn} disabled={isLoading}>
                Submit
              </button>

              <button
                type='button'
                className={styles.btn + ' ' + styles.guest}
                disabled={isLoading}
                onClick={guestLogin}
              >
                Guest Check
              </button>
              <br />
              <br />
              <p className={styles.login__text}>
                Don&apos;t have an account?
                <strong>
                  <Link to='/signup'>Sign up</Link>
                </strong>
              </p>
            </form>
          </div>
        </div>
      </div>
      <div className={styles.login__image}>&nbsp;</div>
    </div>
  );
};

export default Login;
