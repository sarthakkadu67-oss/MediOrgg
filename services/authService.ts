
export interface User {
  email: string;
  name: string;
}

const USER_KEY = 'mediorg_user';

export const login = async (email: string, password: string): Promise<User> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (email && password) {
    const user = { email, name: email.split('@')[0] };
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    return user;
  }
  throw new Error('Invalid credentials');
};

export const signup = async (email: string, password: string, name: string): Promise<User> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  if (email && password && name) {
    const user = { email, name };
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    return user;
  }
  throw new Error('Please fill in all fields');
};

export const logout = (): void => {
  localStorage.removeItem(USER_KEY);
};

export const getCurrentUser = (): User | null => {
  const data = localStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
};
