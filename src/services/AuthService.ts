const fakeJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // Mock JWT string
const expirationTime = Date.now() + 60 * 60 * 1000; // Token expires in 1 hour

const newFakeJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // New token after refresh
const newExpirationTime = Date.now() + 60 * 60 * 1000; // Token expires in 1 hour

export const login = async (username: string, password: string) => {
  if (username === 'user' && password === 'password') {
    return {token: fakeJWT, expiresAt: expirationTime};
  } else {
    throw new Error('Invalid credentials');
  }
};

export const refreshToken = async () => {
  return {token: newFakeJWT, expiresAt: newExpirationTime};
};
