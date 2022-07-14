var processor = {
    memory: new Array(1024).fill(0),
    registers: new Map([
        ["s0", 0],
        ["s1", 0],
        ["s2", 0],
        ["s3", 0],
        ["s4", 0],
        ["s5", 0],
        ["s6", 0],
        ["s7", 0],
    ]),
    MMLatency: 10,
    isideal: false,
};

processor.setInitialMemory = (wordAddress, value) => {
    //shifting 0x10010000 to 0
    let index = (wordAddress - 268500992) / 4;
    processor.memory[index] = value;
};
processor.setMemory = (wordAddress, value) => {
    //shifting 0x10010000 to 0
    let index = (wordAddress - 268500992) / 4;
    processor.memory[index] = value;
};
processor.getMemory = (wordAddress) => {
    let index = (wordAddress - 268500992) / 4;
    return processor.memory[index];
};
processor.setRegister = (reg, num) => {
    if (reg === "r0" || reg === "zero") processor.registers.set("r0", 0);
    else processor.registers.set(reg, num);
};
processor.getRegister = (reg) => {
    if (reg === "zero" || reg === "r0") {
        return 0;
    }
    return processor.registers.get(reg);
};
processor.reset = () => {
    processor.memory = new Array(1024).fill(0);
    processor.pc = 0;
    processor.registers = new Map([
        ["s0", 0],
        ["s1", 0],
        ["s2", 0],
        ["s3", 0],
        ["s4", 0],
        ["s5", 0],
        ["s6", 0],
        ["s7", 0],
    ]);
};
export default processor;
