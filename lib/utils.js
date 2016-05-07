
function generateByte() {
    var value = Math.floor(Math.random() * 256).toString(16);
    
    if (value.length < 2)
        value = '0' + value;
    
    return value;
}

function generateBytes(n) {
    var key = '0x';
    
    for (var k = 0; k < n; k++)
        key += generateByte();
    
    return key;
}

function generateHash() {
    return generateBytes(32);
}

function generateAddress() {
    return generateBytes(20);
}

module.exports = {
    hash: generateHash,
    address: generateAddress
}
