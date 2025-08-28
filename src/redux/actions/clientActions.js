export const setUser = (user) => ({ type: SET_USER, payload: user });
export const setRoles = (roles) => ({ type: SET_ROLES, payload: roles });
export const setTheme = (theme) => ({ type: SET_THEME, payload: theme });
export const setLanguage = (language) => ({ type: SET_LANGUAGE, payload: language });
export const clearUser = () => ({ type: CLEAR_USER });

export const setAddresses = (addresses) => ({ type: SET_ADDRESSES, payload: addresses });
export const addAddress = (address) => ({ type: ADD_ADDRESS, payload: address });
export const updateAddressAction = (address) => ({ type: UPDATE_ADDRESS, payload: address });
export const deleteAddressAction = (addressId) => ({ type: DELETE_ADDRESS, payload: addressId });
export const setLoading = (loading) => ({ type: SET_LOADING, payload: loading });