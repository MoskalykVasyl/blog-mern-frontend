export const byField = (fieldName)=>{
    return (a,b)=> b[fieldName] - a[fieldName] ;
}