const migrations = {
    1: (state: any) => {
     return {
      ...state,
      common: {
       ...state.common,
       notifFlag: false,
       errorMessage: ''
      },
     };
    },
    
   };
   
   export default migrations;