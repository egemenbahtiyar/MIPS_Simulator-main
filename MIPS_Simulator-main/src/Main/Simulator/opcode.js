// {
//     "add": "00001"
//     "sub": "00010"
//     "and": "00011"
//     "or": "00100"
//     "slt": "00101"
//     "slti": "00110"
//     "j": "00111"
//     "jr": "01000"
//     "li": "01001"
//     "sll": "01010"
//     "srl": "01011"
//     "mul": "01100"
//     "muli": "01101"
//     "lui": "01110"
//     "sw": "01111"
//     "lw": "10000"
//     "beq":"10001"
//     "bne":"10010"
// }
function opcodeDecoder(opcode, val1, val2 = null) {
    switch (opcode) {
        case "00001":
            return val1 + val2;
        case "00010":
            return val1 - val2;
        case "00011":
            return parseInt(val1 && val2);
        case "00100":
            return val1 || val2;
        case "00101":
            return val1 < val2 ? 1 : 0;
        case "00110":
            return val1 < val2 ? 1 : 0;
        case "00111":
            return val1;
        case "01000":
            return val1 + 1;
        case "01001":
            return val1;
        case "01010":
            return val1 << val2;
        case "01011":
            return val1 >> val2;
        case "01100":
            return val1 * val2;
        case "01101":
            return parseInt(val1 * val2);
        case "01110":
            return val1 * 2 ** 10;
        case "01111":
            return val1;
        case "10000":
            return val1;
        case "10001":
            return val1 === val2;
        case "10010":
            return val1 != val2;
        default:
            "1";
    }
}
