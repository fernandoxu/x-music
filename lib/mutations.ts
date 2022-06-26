import fetcher from './fetcher';

const auth = (
  mode: 'signin' | 'signup',
  body: {
    email: string;
    password: string;
  }
) => fetcher(`/${mode}`, body);

export { auth };
