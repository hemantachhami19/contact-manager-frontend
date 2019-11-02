const baseUrl = 'http://localhost:8000/api/v1';
const config = {
  baseUrl: baseUrl,
  checkAuthUrl: baseUrl + '/auth/login/success',
  loginUrl:baseUrl+'/auth/facebook',
  logOutUrl:baseUrl+'/auth/logout'
};

export default config;