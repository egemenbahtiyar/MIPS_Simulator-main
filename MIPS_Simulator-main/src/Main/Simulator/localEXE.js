var local = {};
local.exe = (lines, tags, pc, processor) => {
    if (lines == null) {
        pc = 0;
        return pc;
    }
    let line = lines[pc];
    if (line[0].includes(":") && line.length != 1) {
        line.splice(0, 1);
    }
    if (line[0] == "" || line[0] == "#") {
        pc = pc + 1;
    } else if (line[0].includes(":") && line.length === 1) {
        pc = pc + 1;
    } else if (line[0] === "add") {
        let src1 = line[2].replace("$", "");
        let src2 = line[3].replace("$", "");
        let dest = line[1].replace("$", "");
        let val1 = processor.getRegister(src1);
        let val2 = processor.getRegister(src2);
        opcode = "00001";
        processor.setRegister(dest, opcodeDecoder(opcode, val1, val2));
        pc = pc + 1;
    } else if (line[0] === "mul") {
        let src1 = line[2].replace("$", "");
        let src2 = line[3].replace("$", "");
        let dest = line[1].replace("$", "");
        let val1 = processor.getRegister(src1);
        let val2 = processor.getRegister(src2);
        opcode = "01100";
        processor.setRegister(dest, opcodeDecoder(opcode, val1, val2));
        pc = pc + 1;
    } else if (line[0] === "muli") {
        let src1 = line[2].replace("$", "");
        let src2 = line[3].replace("$", "");
        let dest = line[1].replace("$", "");
        let val1 = processor.getRegister(src1);
        let val2 = src2;
        opcode = "01101";
        processor.setRegister(dest, opcodeDecoder(opcode, val1, val2));
        pc = pc + 1;
    } else if (line[0] === "and") {
        let src1 = line[2].replace("$", "");
        let src2 = line[3].replace("$", "");
        let dest = line[1].replace("$", "");
        let val1 = processor.getRegister(src1);
        let val2 = processor.getRegister(src2);
        opcode = "00011";
        processor.setRegister(dest, opcodeDecoder(opcode, val1, val2));
        pc = pc + 1;
    } else if (line[0] === "slt") {
        let src1 = line[2].replace("$", "");
        let src2 = line[3].replace("$", "");
        let dest = line[1].replace("$", "");
        let val1 = processor.getRegister(src1);
        let val2 = processor.getRegister(src2);
        opcode = "00101";
        processor.setRegister(dest, opcodeDecoder(opcode, val1, val2));
        pc = pc + 1;
    } else if (line[0] === "slti") {
        let src1 = line[2].replace("$", "");
        let src2 = line[3].replace("$", "");
        let dest = line[1].replace("$", "");
        let val1 = processor.getRegister(src1);
        let val2 = src2;
        opcode = "00110";
        processor.setRegister(dest, opcodeDecoder(opcode, val1, val2));
        processor.setRegister(dest, val1 < val2 ? 1 : 0);
        console.log(val1 && val2);
        pc = pc + 1;
    } else if (line[0] === "andi") {
        let src1 = line[2].replace("$", "");
        let src2 = line[3].replace("$", "");
        let dest = line[1].replace("$", "");
        let val1 = processor.getRegister(src1);
        let val2 = src2;
        processor.setRegister(dest, parseInt(val1 && val2));
        pc = pc + 1;
    } else if (line[0] === "or") {
        let src1 = line[2].replace("$", "");
        let src2 = line[3].replace("$", "");
        let dest = line[1].replace("$", "");
        let val1 = processor.getRegister(src1);
        let val2 = processor.getRegister(src2);
        opcode = "00100";
        processor.setRegister(dest, opcodeDecoder(opcode, val1, val2));
        pc = pc + 1;
    } else if (line[0] === "ori") {
        let src1 = line[2].replace("$", "");
        let src2 = line[3].replace("$", "");
        let dest = line[1].replace("$", "");
        let val1 = processor.getRegister(src1);
        let val2 = src2;
        processor.setRegister(dest, val1 || val2);
        pc = pc + 1;
    } else if (line[0] === "sub" || line[0] === "subu") {
        let src1 = line[2].replace("$", "");
        let src2 = line[3].replace("$", "");
        let dest = line[1].replace("$", "");
        let val1 = processor.getRegister(src1);
        let val2 = processor.getRegister(src2);
        opcode = "00010";
        processor.setRegister(dest, opcodeDecoder(opcode, val1, val2));
        processor.setRegister(dest, val1 - val2);
        pc = pc + 1;
    } else if (line[0] === "srl") {
        let src1 = line[2].replace("$", "");
        let src2 = parseInt(line[3]);
        let dest = line[1].replace("$", "");
        let val1 = processor.getRegister(src1);
        let val2 = src2;
        opcode = "01011";
        processor.setRegister(dest, opcodeDecoder(opcode, val1, val2));
        pc = pc + 1;
    } else if (line[0] === "sll") {
        let src1 = line[2].replace("$", "");
        let src2 = parseInt(line[3]);
        let dest = line[1].replace("$", "");
        let val1 = processor.getRegister(src1);
        let val2 = src2;
        opcode = "01010";
        processor.setRegister(dest, opcodeDecoder(opcode, val1, val2));
        pc = pc + 1;
    } else if (line[0] === "bne") {
        let src1 = line[1].replace("$", "");
        let src2 = line[2].replace("$", "");
        let dest = tags.get(line[3] + ":");
        let val1 = processor.getRegister(src1);
        let val2 = processor.getRegister(src2);
        opcode = "10010";
        if (opcodeDecoder(opcode, val1, val2)) {
            pc = dest;
        } else {
            pc = pc + 1;
        }
    } else if (line[0] === "beq") {
        let src1 = line[1].replace("$", "");
        let src2 = line[2].replace("$", "");
        let dest = tags.get(line[3] + ":");
        let val1 = processor.getRegister(src1);
        let val2 = processor.getRegister(src2);
        opcode = "10001";
        if (opcodeDecoder(opcode, val1, val2)) {
            pc = dest;
        } else {
            pc = pc + 1;
        }
    } else if (line[0] === "ble") {
        let src1 = line[1].replace("$", "");
        let src2 = line[2].replace("$", "");
        let dest = tags.get(line[3] + ":");
        let val1 = processor.getRegister(src1);
        let val2 = processor.getRegister(src2);
        if (val1 <= val2) {
            pc = dest;
        } else {
            pc = pc + 1;
        }
    } else if (line[0] === "j") {
        let dest = tags.get(line[1] + ":");
        opcode = "00111";
        pc = opcodeDecoder(opcode, dest);
    } else if (line[0] === "addi") {
        let src1 = line[2].replace("$", "");
        let src2 = parseInt(line[3]);
        let dest = line[1].replace("$", "");
        let val1 = processor.getRegister(src1);
        let val2 = src2;
        console.log(val1 + val2);
        processor.setRegister(dest, val1 + val2);
        pc = pc + 1;
    } else if (line[0] === "li") {
        let src1 = parseInt(line[2]);
        let dest = line[1].replace("$", "");
        processor.setRegister(dest, src1);
        pc = pc + 1;
    } else if (line[0] === "lui") {
        let src1 = parseInt(line[2]);
        let dest = line[1].replace("$", "");
        opcode = "01110";
        processor.setRegister(dest, opcodeDecoder(opcode, src1));
        pc = pc + 1;
    } else if (line[0] === "lw") {
        let src = line[2].split("(");
        let offset = parseInt(src[0]);
        let src1 = src[1].replace("$", "").replace(")", "");
        let src2 = offset + processor.getRegister(src1);
        let dest = line[1].replace("$", "");
        let value = processor.getMemory(src2);
        opcode = "10000";
        processor.setRegister(dest, opcodeDecoder(opcode, value));
        pc = pc + 1;
    } else if (line[0] === "sw") {
        let dest = line[2].split("(");
        let offset = parseInt(dest[0]);
        let dest1 = dest[1].replace("$", "").replace(")", "");
        let dest2 = offset + processor.getRegister(dest1);
        let src = line[1].replace("$", "");
        let value = processor.getRegister(src);
        opcode = "01111";
        processor.setMemory(dest2, opcodeDecoder(opcode, value));
        pc = pc + 1;
    } else if (line[0] === "syscall") {
        let code = processor.getRegister("v0");
        switch (code) {
            case 1:
                const text = processor.getRegister("a0");
                pc = pc + 1;
                break;
            case 4:
                pc = pc + 1;
                break;
            case 10:
                pc = 0;
                break;
            default:
                pc = pc + 1;
        }
    } else if (line[0] === "jr") {
        opcode = "01000";
        pc = opcodeDecoder(opcode, pc);
    } else {
        pc = pc + 1;
    }
    if (pc === lines.length) {
        pc = 0;
    }
    return pc;
};

export default local;
