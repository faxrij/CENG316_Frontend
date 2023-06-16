import jwt_decode from 'jwt-decode';

const decodeJWT = (token) => {
  try {
    return jwt_decode(token);
  } catch (error) {
    console.log('error:', error);
    return null;
  }
};

export default decodeJWT;
