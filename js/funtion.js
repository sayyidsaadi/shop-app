/**
 * Alert Meassage Funtion
 */
const alertMsFun=(ms, alertType='danger')=>{

    return `<p class="alert alert-${alertType} d-flex justify-content-between">${ms} <button data-bs-dismiss="alert" class="btn-close"></button> </p>`;

}

/**
 * Set LS Data
 */
const setLsData=(key, value)=>{

    // Get Old Data
    let loadData=[];
    if(localStorage.getItem(key)){
        loadData=JSON.parse(localStorage.getItem(key))
    }

    // Set New Fata
    loadData.push(value)
    localStorage.setItem(key, JSON.stringify(loadData));
}

/**
 * Get Ls Data
 */
const getLsData=(key)=>{
    
    // Check data
    if(localStorage.getItem(key)){
        return JSON.parse(localStorage.getItem(key))
    }else{
        return false;
    }

}

/**
 * Update Data
 */

const updateLsdata=(key, value)=>{
    
    localStorage.setItem(key, JSON.stringify(value))
}