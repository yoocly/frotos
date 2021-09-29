import axios from 'axios';
import React, { useState } from 'react';
import PasswordStrengthBar from 'react-password-strength-bar';
import Button from '../../components/Button/Button';
import Headline from '../../components/Headline/Headline';
import Input from '../../components/Input/Input';
import useCurrentUser from '../../hooks/useCurrentUser';
import useUserExists from '../../hooks/useUserExists';
import styles from './Profile.module.css';
import cookies from 'js-cookie';
import { useQueryClient } from 'react-query';

export type ProfileProps = {
  className?: string;
};

export default function Profile({ className = '' }: ProfileProps): JSX.Element {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [usernameToCheck, setUsernameToCheck] = useState<string>('');
  const [formError, setFormError] = useState<string | null>(null);

  const currentUser = useCurrentUser();

  const queryClient = useQueryClient();
  const userExists = useUserExists(usernameToCheck);
  const loginMode = userExists === true;
  const registerMode = userExists === false;

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const registerResult =
      registerMode &&
      (await axios.post('/api/user', {
        user: {
          username,
          password,
        },
      }));

    if (loginMode || (registerResult && registerResult.status === 201)) {
      try {
        await axios.post('/api/user/login', {
          user: {
            username,
            password,
          },
        });
        setUsername('');
      } catch (error) {
        setFormError('Wrong password');
      }
    }
  }

  function logout() {
    cookies.remove('auth');

    queryClient.setQueryData(['checkUser', currentUser], true);
    setUsernameToCheck(currentUser || '');
    setUsername(currentUser || '');
    setPassword('');
    setFormError(null);
  }

  return currentUser ? (
    <div className={`${styles.profile} ${className}`}>
      <Headline level={1} className={styles.title}>
        <span>{currentUser}</span>
        <div className={styles.button}>
          <Button icon="logout" small text="Sign out" onClick={logout} />
        </div>
      </Headline>

      <section className={styles.content}>
        <div>You are signed in.</div>
      </section>
    </div>
  ) : (
    <div className={`${styles.signInRegister} ${className}`}>
      <Headline level={1} styling="large">
        {!registerMode && <>Sign in</>}
        {!registerMode && !loginMode && <span className={styles.or}> or </span>}
        {!loginMode && <>Register</>}
      </Headline>

      <form className={styles.formLoginRegister} onSubmit={handleSubmit}>
        <Input
          placeholder="Username"
          icon="user"
          value={username}
          onChange={(value) => {
            setUsername(value);
            setFormError(null);
          }}
          onBlur={() => setUsernameToCheck(username)}
        />

        <div>
          <Input
            placeholder="Password"
            icon="password"
            password
            value={password}
            onChange={(value) => {
              setPassword(value);
              setFormError(null);
            }}
          />
          {registerMode && (
            <PasswordStrengthBar password={password} className={styles.passwordStrength} />
          )}
          {formError && <div className={styles.formError}>{formError}</div>}
        </div>

        <div className={styles.button}>
          {loginMode && <Button icon="login" text="Sign in" />}
          {registerMode && <Button icon="login" text="Register" />}
        </div>
      </form>
    </div>
  );
}
