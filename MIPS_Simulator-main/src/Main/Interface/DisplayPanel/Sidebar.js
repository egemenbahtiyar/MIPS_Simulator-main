import React, { useState } from "react";
import "./Sidebar.css";

var x = 0;

const Sidebar = (
    props // Sidebar component (main)
) => {
    const [d, setD] = useState(true);

    var pc = props.programCounter;
    var registersmap = props.registersmap;

    var registersmaphex = new Map();
    var registersmapbin = new Map();

    var memoryArr = props.memoryArray;

    var strdec = "";

    var start = -1;
    var prev = -1;
    var c = 0;
    var lastSeen = 0;

    for (var i = 0; i < 1024; i++) {
        // populating the memory segment
        if (memoryArr[i] != 0) {
            c = 1;
            lastSeen = i;
            if (start == prev) {
                strdec +=
                    "[0x" +
                    (4 * i + 268500992).toString(16) +
                    "]: " +
                    memoryArr[i].toString(10) +
                    "<br/>";
                prev = i;
            } else {
                strdec +=
                    start == prev
                        ? "[0x" +
                          (4 * i + 268500992).toString(16) +
                          "]: " +
                          memoryArr[i].toString(10) +
                          "<br/>"
                        : "<br>" +
                          "[0x" +
                          (4 * (prev + 1) + 268500992).toString(16) +
                          "...<br/>..." +
                          "0x" +
                          (4 * i + 268500992).toString(16) +
                          "]: 0<br></br>" +
                          "[0x" +
                          (4 * i + 268500992).toString(16) +
                          "]: " +
                          memoryArr[i].toString(10) +
                          "<br/>";
                prev = i;
            }
        }
        start = i;
    }

    if (c === 0) {
        // populating the memory segment
        prev = 0;
        strdec +=
            "[0x" +
            (4 * prev + 268500992).toString(16) +
            "...<br/>...0x" +
            (4 * 1024 + 268500992).toString(16) +
            "]: 0<br/>";
    } else {
        // populating the memory segment
        if (lastSeen != 1023) {
            strdec +=
                "<br>" +
                "[0x" +
                (4 * (lastSeen + 1) + 268500992).toString(16) +
                "...<br/>...0x" +
                (4 * 1024 + 268500992).toString(16) +
                "]: 0<br/>";
        }
    }

    /* setting dec string */

    if (document.getElementById("memory-tabledec") != null) {
        document.getElementById("memory-tabledec").innerHTML = strdec;
    }

    for (var [key, value] of registersmap) {
        if (value != undefined) {
            registersmaphex.set(key, value.toString(16));
            registersmapbin.set(key, value.toString(2));
        }
    }

    function reg() {
        // display register segment only on toggle
        {
            document.getElementById("mem").style.display = "none";
        }
        {
            document.getElementById("regs").style.display = "block";
        }
        {
            document.getElementById("b1").style.backgroundColor = "gray";
        }
        {
            document.getElementById("b2").style.backgroundColor = "#333333";
        }
        document.getElementById("sb1").style.opacity = "1";
    }

    function memory() {
        // display memory segment only on toggle
        {
            document.getElementById("regs").style.display = "none";
        }
        {
            document.getElementById("mem").style.display = "block";
        }
        {
            document.getElementById("b1").style.backgroundColor = "#333333";
        }
        {
            document.getElementById("b2").style.backgroundColor = "gray";
        }
        document.getElementById("sb1").style.opacity = "1";
    }

    function dec() {
        // display decimal values only on toggle
        setD(true);
        {
            document.getElementById("decimal").style.display = "block";
        }
        {
            document.getElementById("sb1").style.backgroundColor = "grey";
        }
    }

    return (
        <div className="sidebar">
            <div className="sidebar-menu">
                <button id="b1" onClick={reg}>
                    REGISTERS
                </button>
                <button id="b2" onClick={memory}>
                    MEMORY
                </button>
            </div>

            <br></br>
            <hr
                style={{
                    margin: `0px`,
                    clear: `both`,
                    padding: `0px`,
                    height: `2px`,
                    border: `none`,
                    backgroundColor: `gray`,
                }}
            ></hr>

            <div className="sidebar-options">
                <button id="sb1" onClick={dec}>
                    DECIMAL
                </button>
            </div>
            <br></br>
            <hr
                style={{
                    margin: `0px`,
                    clear: `both`,
                    padding: `0px`,
                    height: `1px`,
                    border: `none`,
                    backgroundColor: `gray`,
                }}
            ></hr>

            <div>
                <ul>
                    <li id="regs">
                        <div>
                            <ul>
                                <li
                                    id="decimal"
                                    style={{ display: d ? `block` : `none` }}
                                >
                                    {/* Decimal */}
                                    <table className="registers-table">
                                        <tr className="tr-table">
                                            <td id="pc-table">PC: {pc}</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td id="s0">
                                                R0 [s0]:{" "}
                                                {registersmap.get("s0")}
                                            </td>
                                            <td id="s1">
                                                R1 [s1]:{" "}
                                                {registersmap.get("s1")}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td id="s2">
                                                R2 [s2]:{" "}
                                                {registersmap.get("s2")}
                                            </td>
                                            <td id="s3">
                                                R3 [s3]:{" "}
                                                {registersmap.get("s3")}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td id="s4">
                                                R4 [s4]:{" "}
                                                {registersmap.get("s4")}
                                            </td>
                                            <td id="s5">
                                                R5 [s5]:{" "}
                                                {registersmap.get("s5")}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td id="s6">
                                                R6 [s6]:{" "}
                                                {registersmap.get("s6")}
                                            </td>
                                        </tr>
                                    </table>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li id="mem">
                        <div>
                            <ul>
                                <li
                                    id="decimal"
                                    style={{ display: d ? `block` : `none` }}
                                >
                                    <div id="memory-tabledec"></div>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
