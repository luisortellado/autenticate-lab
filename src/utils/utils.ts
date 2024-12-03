export const validateUsername = (username: string): string | null => {
  if (!username.trim()) {
    return 'Username cannot be empty.';
  }
  if (username.length < 3 || username.length > 20) {
    return 'Username must be between 3 and 20 characters.';
  }
  if (!/^[a-zA-Z0-9_.]+$/.test(username)) {
    return 'Username can only contain letters, numbers, underscores, and periods.';
  }
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password.trim()) {
    return 'Password cannot be empty.';
  }
  if (password.length < 8 || password.length > 50) {
    return 'Password must be between 8 and 50 characters.';
  }
  if (
    !/[A-Z]/.test(password) ||
    !/[0-9]/.test(password) ||
    !/[@$!%*?&]/.test(password)
  ) {
    return 'Password must include at least one uppercase letter, one number, and one special character.';
  }
  return null;
};
