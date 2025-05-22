

  export function validateEmail (value: string){
    let error;
    if (!value){
        error= "***Required***";
    } else if (!/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/i.test(value)){
        error= "***Invalid email address***";
    }
    return error;
  }

    export function validatePassword (value: string){
    let error;
    if (!value){
        error= "***Required***";
    } else if (value.length < 4){
        error= "**Password must be 4 Characters long***";
    }
    return error;
  }

  
    export function validateOnlyText (value: string){
    let error;
    if (!value){
        error= "***Required***";
    } else if (!/^[A-Za-zÀ-ÿ' -]+$/i.test(value)){
        error= "**No Numbers or ordinary Characters allowed write them out!***";
    }
    return error;
  }

      export function validateNumber (value: string){
    let error;
    if (!value){
        error= "***Required***";
    } else if (!/^\d+$$/i.test(value)){
        error= "**Only Numbers are Allowed!***";
    }
    return error;
  }

       export function validateCountry (value: string){
    let error;
    if (!value){
        error= "***Required***";
    } else if (!/^\d+$$/i.test(value) ){
        error= "**Only Numbers are Allowed!***";
    }else if ( value.length < 1&& value.length > 233){
      error= "**Not an CountryID!***";
    }
    return error;
  }