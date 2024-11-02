const migrations = {
 2: (state: any) => {
  return {
   ...state,
   common: {
    ...state.common,
    cookieAgree: '',
   },
  };
 },
};

export default migrations;
