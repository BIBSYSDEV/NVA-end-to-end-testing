import Axios from 'axios';
import { StatusCode, API_URL, AuthorityPaths, FEIDE_ID_QUALIFIER } from './constants';
import { invertName } from './users';

const setAxiosDefaults = () => {
  Axios.defaults.baseURL = API_URL;
  Axios.defaults.headers.common = {
    Accept: 'application/json',
  };
  Axios.defaults.headers.post['Content-Type'] = 'application/json';
  Axios.defaults.headers.put['Content-Type'] = 'application/json';
};

export const getAuthorities = async (name, feideId, idToken) => {
  setAxiosDefaults();
  const query = name ? `name=${name}` : `feideid=${feideId}`;
  const url = encodeURI(`${AuthorityPaths.PERSON}?${query}`);
  try {
    // remove when Authorization headers are set for all requests
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

export const createAuthority = async (newAuthority, idToken) => {
  setAxiosDefaults();
  const url = AuthorityPaths.PERSON;

  const error = 'Error creating authority';

  try {
    // remove when Authorization headers are set for all requests
    const headers = {
      Authorization: `Bearer ${idToken}`,
    };

    const response = await Axios.post(
      url,
      { invertedname: invertName(newAuthority.firstName, newAuthority.lastName) },
      { headers }
    );
    if (response.status === StatusCode.OK) {
      return { authority: response.data };
    } else {
      return { error: response.error };
    }
  } catch (e) {
    return { error, e };
  }
};

export const addQualifierIdForAuthority = async (systemControlNumber, qualifier, identifier, idToken) => {
  setAxiosDefaults();

  const url = `${AuthorityPaths.PERSON}/${systemControlNumber}/identifiers/${qualifier}/add`;

  const error = 'Error adding qaualifier to authority.';

  try {
    const headers = {
      Authorization: `Bearer ${idToken}`,
    };
    const response = await Axios.post(url, { identifier }, { headers });
    if (response.status === StatusCode.OK) {
      return { data: response.data };
    } else {
      return { error: response.error };
    }
  } catch {
    return { error };
  }
};

export const removeQualifierIdFromAuthority = async (systemControlNumber, qualifier, identifier, idToken) => {
  const url = `${AuthorityPaths.PERSON}/${systemControlNumber}/identifiers/${qualifier}/delete`;

  const error = 'Error removing qualifier from authority.';

  try {
    const headers = {
      Authorization: `Bearer ${idToken}`,
    };

    const response = await Axios.delete(url, { data: { identifier }, headers });

    if (response.status === StatusCode.OK) {
      return { data: response.data };
    } else {
      return { error: response.error };
    }
  } catch {
    return { error };
  }
};
