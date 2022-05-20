import processor from "./processor";
var execute = {};
execute.exe = (lines, tags, pc, print) => {
    let valid = false;
    let currentPC = pc;
    if (lines == null) {
        pc = 0;
        return pc;
    }
    let line = lines[pc];
    if (line[0].includes(":") && line.length != 1) {
        line.splice(0, 1);
    }
    if (line[0] == "" || line[0] == "#" || line[0].includes(".")) {
        pc = pc + 1;
        valid = true;
    } else if (line[0].includes(":") && line.length === 1) {
        pc = pc + 1;
        valid = true;
    } else if (line[0] === "add" || line[0] === "addu") {
        let src1 = line[2].replace("$", "");
        let src2 = line[3].replace("$", "");
        let dest = line[1].replace("$", "");
        let val1 = processor.getRegister(src1);
        let val2 = processor.getRegister(src2);
        processor.setRegister(dest, val1 + val2);
        pc = pc + 1;
        valid = true;
    } else if (line[0] === "sub" || line[0] === "subu") {
        let src1 = line[2].replace("$", "");
        let src2 = line[3].replace("$", "");
        let dest = line[1].replace("$", "");
        let val1 = processor.getRegister(src1);
        let val2 = processor.getRegister(src2);
        processor.setRegister(dest, val1 - val2);
        pc = pc + 1;
        valid = true;
    } else if (line[0] === "addi" || line[0] === "addiu") {
        let src1 = line[2].replace("$", "");
        let src2 = parseInt(line[3]);
        let dest = line[1].replace("$", "");
        let val1 = processor.getRegister(src1);
        let val2 = src2;
        processor.setRegister(dest, val1 + val2);
        pc = pc + 1;
        valid = true;
    } else if (line[0] === "mul") {
        let src1 = line[2].replace("$", "");
        let src2 = line[3].replace("$", "");
        let dest = line[1].replace("$", "");
        let val1 = processor.getRegister(src1);
        let val2 = processor.getRegister(src2);
        processor.setRegister(dest, val1 * val2);
        pc = pc + 1;
        valid = true;
    } else if (line[0] === "muli") {
        let src1 = line[2].replace("$", "");
        let src2 = line[3].replace("$", "");
        let dest = line[1].replace("$", "");
        let val1 = processor.getRegister(src1);
        let val2 = src2;
        processor.setRegister(dest, parseInt(val1 * val2));
        pc = pc + 1;
        valid = true;
    } else if (line[0] === "and") {
        let src1 = line[2].replace("$", "");
        let src2 = line[3].replace("$", "");
        let dest = line[1].replace("$", "");
        let val1 = processor.getRegister(src1);
        let val2 = processor.getRegister(src2);
        processor.setRegister(dest, val1 && val2);
        pc = pc + 1;
        valid = true;
    } else if (line[0] === "andi") {
        let src1 = line[2].replace("$", "");
        let src2 = line[3].replace("$", "");
        let dest = line[1].replace("$", "");
        let val1 = processor.getRegister(src1);
        let val2 = src2;
        processor.setRegister(dest, parseInt(val1 && val2));
        pc = pc + 1;
        valid = true;
    } else if (line[0] === "slt") {
        let src1 = line[2].replace("$", "");
        let src2 = line[3].replace("$", "");
        let dest = line[1].replace("$", "");
        let val1 = processor.getRegister(src1);
        let val2 = processor.getRegister(src2);
        processor.setRegister(dest, val1 < val2 ? 1 : 0);
        pc = pc + 1;
        valid = true;
    } else if (line[0] === "slti") {
        let src1 = line[2].replace("$", "");
        let src2 = line[3].replace("$", "");
        let dest = line[1].replace("$", "");
        let val1 = processor.getRegister(src1);
        let val2 = src2;
        processor.setRegister(dest, val1 < val2 ? 1 : 0);
        pc = pc + 1;
        valid = true;
    } else if (line[0] === "or") {
        let src1 = line[2].replace("$", "");
        let src2 = line[3].replace("$", "");
        let dest = line[1].replace("$", "");
        let val1 = processor.getRegister(src1);
        let val2 = processor.getRegister(src2);
        processor.setRegister(dest, val1 || val2);
        pc = pc + 1;
        valid = true;
    } else if (line[0] === "ori") {
        let src1 = line[2].replace("$", "");
        let src2 = line[3].replace("$", "");
        let dest = line[1].replace("$", "");
        let val1 = processor.getRegister(src1);
        let val2 = src2;
        processor.setRegister(dest, val1 || val2);
        pc = pc + 1;
        valid = true;
    } else if (line[0] === "srl") {
        let src1 = line[2].replace("$", "");
        let src2 = parseInt(line[3]);
        let dest = line[1].replace("$", "");
        let val1 = processor.getRegister(src1);
        let val2 = src2;
        processor.setRegister(dest, val1 >> val2);
        pc = pc + 1;
        valid = true;
    } else if (line[0] === "sll") {
        let src1 = line[2].replace("$", "");
        let src2 = parseInt(line[3]);
        let dest = line[1].replace("$", "");
        let val1 = processor.getRegister(src1);
        let val2 = src2;
        processor.setRegister(dest, val1 << val2);
        pc = pc + 1;
        valid = true;
    } else if (line[0] === "bne") {
        let src1 = line[1].replace("$", "");
        let src2 = line[2].replace("$", "");
        let dest = tags.get(line[3] + ":");
        let val1 = processor.getRegister(src1);
        let val2 = processor.getRegister(src2);
        if (val1 != val2) {
            pc = dest;
        } else {
            pc = pc + 1;
        }
        valid = true;
    } else if (line[0] === "beq") {
        let src1 = line[1].replace("$", "");
        let src2 = line[2].replace("$", "");
        let dest = tags.get(line[3] + ":");
        let val1 = processor.getRegister(src1);
        let val2 = processor.getRegister(src2);
        if (val1 === val2) {
            pc = dest;
        } else {
            pc = pc + 1;
        }
        valid = true;
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
        valid = true;
    } else if (line[0] === "j") {
        let dest = tags.get(line[1] + ":");
        pc = dest;
        valid = true;
    } else if (line[0] === "li") {
        let src1 = parseInt(line[2]);
        let dest = line[1].replace("$", "");
        processor.setRegister(dest, src1);
        pc = pc + 1;
        valid = true;
    } else if (line[0] === "lui") {
        let src1 = parseInt(line[2]);
        let dest = line[1].replace("$", "");
        processor.setRegister(dest, src1 * 2 ** 16);
        pc = pc + 1;
        valid = true;
    } else if (line[0] === "lw") {
        let src = line[2].split("(");
        let offset = parseInt(src[0]);
        let src1 = src[1].replace("$", "").replace(")", "");
        let src2 = offset + processor.getRegister(src1);
        let dest = line[1].replace("$", "");
        let value = processor.getMemory(src2);
        processor.setRegister(dest, value);
        pc = pc + 1;
        valid = true;
    } else if (line[0] === "sw") {
        let dest = line[2].split("(");
        let offset = parseInt(dest[0]);
        let dest1 = dest[1].replace("$", "").replace(")", "");
        let dest2 = offset + processor.getRegister(dest1);
        let src = line[1].replace("$", "");
        let value = processor.getRegister(src);
        processor.setMemory(dest2, value);
        pc = pc + 1;
        valid = true;
    } else if (line[0] === "syscall") {
        let code = processor.getRegister("v0");
        switch (code) {
            case 1:
                const text = processor.getRegister("a0");
                print = print + text + " ";
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
        valid = true;
    } else if (line[0] === "jr") {
        pc = pc + 1;
        valid = true;
    } else {
        pc = pc + 1;
    }
    if (pc === lines.length) {
        pc = 0;
    }
    if (!valid) {
        print =
            print + "\nInvalid instruction on line " + (currentPC + 1) + " ";
    }
    return [pc, print];
};

export default execute;
