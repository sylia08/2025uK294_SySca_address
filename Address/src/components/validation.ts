

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