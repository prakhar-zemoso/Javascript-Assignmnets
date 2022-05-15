const name1 = (firstName,lastName) => {
    const fname = firstName[0];
    const lname = lastName[0];
    const concat1 = fname+lname;
    return concat1.toUpperCase();
}
 
console.log(name1('prakhar','pandey'));
console.log(name1('Roger','Waters'));