import "../App.css";
import React, { Component } from "react";
import Editor from "./Interface/Editor/Editor.js";
import Navbar from "./Interface/Navbar/Navbar.js";
import Sidebar from "./Interface/DisplayPanel/Sidebar";
import processor from "./Simulator/processor.js";
import parser from "./Simulator/parser.js";
import execute from "./Simulator/execute.js";

class MainPage extends Component {
    //this is the Mainpage where all components of the simulator are integrated
    constructor(props) {
        super(props);
        this.ideMan = React.createRef();
    }

    state = {
        code: "", //the MIPS code input from the editor as a string
        lines: null, //MIPS code input parsed linewise
        tags: null, //array containing tags such as "main:"
        registers: processor.registers,
        print: "📖 Read Only\n", // 🕮 📖 contains the string contents of the Read only console
        pc: 0, //program counter
        memory: processor.memory,
        prevRegisters: new Map([
            ["s0", 0],
            ["s1", 0],
            ["s2", 0],
            ["s3", 0],
            ["s4", 0],
            ["s5", 0],
            ["s6", 0],
            ["s7", 0],
        ]), //previous state of registers is maintained to enable highlighting of registers when the corresponding values change
        memlatency: 10, //latency of Man Memory access
        isidealcase: false, //if this is checked, the memory heirarchy is disabled and all memory are operations are assumed to be 1 cycle
    };

    setCode = (newCode) => {
        this.setState({
            code: newCode,
        });
        this.state.code = newCode;
        this.render();
    };

    run = () => {
        processor.reset();
        this.state.print = "📖 Read Only\n";
        this.state.pc = 0;
        this.setState({
            pc: 0,
            print: "📖 Read Only\n",
        });
        do {
            this.step();
        } while (this.state.pc != 0);

        this.ideMan.current.highlight(-1);
    };

    step = () => {
        //executes the instruction pointed to by pc
        if (this.state.pc === 0) {
            this.state.print = "📖 Read Only\n";
            this.setState({
                lines: null,
                tags: null,
                print: this.state.print,
                valid: 0,
            });
        }
        if (this.state.lines == null) {
            [this.state.lines, this.state.tags] = parser.parse(this.state.code);
        }
        for (var [key, value] of processor.registers) {
            this.state.prevRegisters.set(key, value);
        }
        [this.state.pc, this.state.print] = execute.exe(
            this.state.lines,
            this.state.tags,
            this.state.pc,
            this.state.print
        );

        this.setState({
            pc: this.state.pc,
            registers: processor.registers,
            memory: processor.memory,
            print: this.state.print,
        });
        this.ideMan.current.highlight(this.state.pc); //updates the parameter used to move the highlight of the line to be executed on the next click of step
    };

    onCodeChange = (changedCode) => {
        this.setState({
            code: changedCode,
            lines: null,
            tags: null,
            pc: 0,
        });
    };
    render = () => {
        return (
            <div className="main-screen">
                <div className="App">
                    <div style={{ width: "35%" }}>
                        <Sidebar
                            registersmap={this.state.registers}
                            programCounter={this.state.pc}
                            memoryArray={this.state.memory}
                            prevRegisters={this.state.prevRegisters}
                            // onCacheChange={this.onCacheChange}
                            // l1cache={processor.L1}
                            // l2cache={processor.L2}
                        />
                    </div>
                    <div style={{ width: "65%", height: `100%` }}>
                        <div>
                            <Navbar run={this.run} step={this.step} />
                        </div>
                        <div id="editor" style={{ height: ``, zIndex: `-20` }}>
                            <Editor
                                ref={this.ideMan}
                                onCodeChange={this.onCodeChange}
                                code={this.state.code}
                                pc={this.state.pc}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}
export default MainPage;
