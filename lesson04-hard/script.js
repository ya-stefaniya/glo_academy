'use strict'

function hard (argument){
    if (typeof(argument) !== 'string') {
        alert('Argument is not a string');
    } else if (typeof(argument) === 'string'){
        argument.trim();
        if (argument.length < 30) return argument;
    }
    return argument.slice(0, 30) + '...';
}

console.log(hard('  hghghhg  '));
console.log(hard('  hghghhghghghhghghghhghghghhghghghhghghghhghghghhghghghhghghghhghghghhghghghhghghghhghghghhghghghhghghghhghghghhghghghhghghghhg'));

