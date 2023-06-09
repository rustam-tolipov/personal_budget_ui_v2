import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import authApi from '../../api/auth';
import { authSuccess } from '../../redux/actions/auth';

import '../../sass/main.scss';
import logo from '../../assets/img/beedget.svg';
import styles from './Login.module.css';
import Input from './Input';
import Loading from '../../components/Loading';

const Signup = () => {
  const dispatch = useDispatch();

  const usernameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    data.preventDefault();
    setIsLoading(true);

    data = {
      user: {
        username: usernameInputRef.current.value,
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value,
        password_confirmation: confirmPasswordInputRef.current.value,
      },
    };

    const response = await authApi.signup(data);

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
        </div>
        <div className={styles.login__box}>
          <div className={styles.login__container} action=''>
            <h1 className={styles.heading__primary}>Create account!</h1>
            <h4 className={styles.subheading}>Please enter your details.</h4>
            <form onSubmit={onSubmit}>
              {error && <p className={styles.login__error}>{error}</p>}
              <br />

              <label className={styles.login__label} htmlFor='username'>
                Username
              </label>
              <input
                className={styles.login__input}
                type='text'
                name='username'
                id='username'
                ref={usernameInputRef}
                required
              />

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

              <label className={styles.login__label} htmlFor='confirmPassword'>
                Confirm Password
              </label>
              <input
                className={styles.login__input}
                type='password'
                name='confirmPassword'
                id='confirmPassword'
                ref={confirmPasswordInputRef}
                required
              />
              <br />
              {/* <button type='submit' className='btn'> */}
              <button type='submit' className={styles.btn} disabled={isLoading}>
                Submit
              </button>
              <br />
              <br />
              <p className={styles.login__text}>
                Don&apos;t have an account?
                <strong>
                  <Link to='/'>Login</Link>
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

export default Signup;
