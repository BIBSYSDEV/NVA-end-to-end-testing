import Axios from 'axios';
import { StatusCode, API_URL, AuthorityPaths, FEIDE_ID_QUALIFIER } from './constants';
import { Auth } from 'aws-amplify';

Axios.defaults.baseURL = API_URL;
Axios.defaults.headers.common = {
  Accept: 'application/json',
};
Axios.defaults.headers.post['Content-Type'] = 'application/json';
Axios.defaults.headers.put['Content-Type'] = 'application/json';

export const getIdToken = async () => {
  const cognitoUser = await Auth.currentAuthenticatedUser();
  console.log(`cognitoUser = ${cognitoUser}`);
  return cognitoUser?.signInUserSession?.idToken?.jwtToken || null;
};

export const getAuthorities = async (name) => {
  const url = encodeURI(`${AuthorityPaths.PERSON}?name=${name}`);

  try {
    // remove when Authorization headers are set for all requests
    const idToken = await getIdToken();
    const headers = {
      Authorization: `Bearer ${idToken}`,
    };

    const response = await Axios.get(url, { headers });

    if (response.status === StatusCode.OK) {
      return response.data;
    } else {
      return { error };
    }
  } catch (error) {
    if (!Axios.isCancel(error)) {
      return { error };
    }
  }
};

export const createAuthority = async (firstName, lastName, feideId) => {
  const url = AuthorityPaths.PERSON;

  const error = 'Error creating authority';

  try {
    // remove when Authorization headers are set for all requests
    const idToken = await getIdToken();
    console.log(idToken);
    const headers = {
      Authorization: `Bearer ${idToken}`,
    };

    const response = await Axios.post(url, { invertedname: `${lastName}, ${firstName}` }, { headers });
    if (response.status === StatusCode.OK) {
      if (feideId) {
        const systemControlNumber = response.data.systemControlNumber;
        const updatedAuthority = await addQualifierIdForAuthority(systemControlNumber, FEIDE_ID_QUALIFIER, feideId);
        if (updatedAuthority) {
          return updatedAuthority;
        }
      } else {
        return { authority: response.data };
      }
    } else {
      return { error: response.error };
    }
  } catch (e) {
    return { error, e };
  }
};
