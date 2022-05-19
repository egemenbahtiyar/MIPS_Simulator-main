import React, { useState } from "react";
import "./Sidebar.css";
import { makeStyles } from "@material-ui/core/styles";

var x = 0;

const useStyles = makeStyles({
    // CSS for checkbox (Material UI)
    icon: {
        borderRadius: 3,
        width: 18,
        height: 18,
        margin: 3,
        border: "2px solid #ffaaaa",
        backgroundColor: "white",
        "input:hover ~ &": {
            backgroundColor: "#ffaaaa",
        },
    },
});

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

    /* back-end for cache settings */

    var l1cachetable = props.l1cache;
    var l2cachetable = props.l2cache;

    var l1sets, l2sets;

    l1sets = [];
    l2sets = [];

    try {
        for (var i = 0; i < l1cachetable._data.length; i++) {
            l1sets.push(l1cachetable._data[i]);
            x = 0;
        }
    } catch (error) {
        x = 1;
    }

    try {
        for (var i = 0; i < l2cachetable._data.length; i++) {
            l2sets.push(l2cachetable._data[i]);
            x = 0;
        }
    } catch (error) {
        x = 1;
    }
    return (
        // rendering the complete UI
        <div className="sidebar">
            {/* buttons */}
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

            {/* buttons */}
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
                    {/* segments */}
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
                                            <td id="r0">
                                                R0 [r0]:{" "}
                                                {registersmap.get("r0")}
                                            </td>
                                            <td id="s0">
                                                R16 [s0]:{" "}
                                                {registersmap.get("s0")}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td id="at">
                                                R1 [at]:{" "}
                                                {registersmap.get("at")}
                                            </td>
                                            <td id="s1">
                                                R17 [s1]:{" "}
                                                {registersmap.get("s1")}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td id="v0">
                                                R2 [v0]:{" "}
                                                {registersmap.get("v0")}
                                            </td>
                                            <td id="s2">
                                                R18 [s2]:{" "}
                                                {registersmap.get("s2")}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td id="v1">
                                                R3 [v1]:{" "}
                                                {registersmap.get("v1")}
                                            </td>
                                            <td id="s3">
                                                R19 [s3]:{" "}
                                                {registersmap.get("s3")}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td id="a0">
                                                R4 [a0]:{" "}
                                                {registersmap.get("a0")}
                                            </td>
                                            <td id="s4">
                                                R20 [s4]:{" "}
                                                {registersmap.get("s4")}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td id="a1">
                                                R5 [a1]:{" "}
                                                {registersmap.get("a1")}
                                            </td>
                                            <td id="s5">
                                                R21 [s5]:{" "}
                                                {registersmap.get("s5")}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td id="a2">
                                                R6 [a2]:{" "}
                                                {registersmap.get("a2")}
                                            </td>
                                            <td id="s6">
                                                R22 [s6]:{" "}
                                                {registersmap.get("s6")}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td id="a3">
                                                R7 [a3]:{" "}
                                                {registersmap.get("a3")}
                                            </td>
                                            <td id="s7">
                                                R23 [s7]:{" "}
                                                {registersmap.get("s7")}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td id="t0">
                                                R8 [t0]:{" "}
                                                {registersmap.get("t0")}
                                            </td>
                                            <td id="t8">
                                                R24 [t8]:{" "}
                                                {registersmap.get("t8")}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td id="t1">
                                                R9 [t1]:{" "}
                                                {registersmap.get("t1")}
                                            </td>
                                            <td id="t9">
                                                R25 [t9]:{" "}
                                                {registersmap.get("t9")}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td id="t2">
                                                R10 [t2]:{" "}
                                                {registersmap.get("t2")}
                                            </td>
                                            <td id="k0">
                                                R26 [k0]:{" "}
                                                {registersmap.get("k0")}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td id="t3">
                                                R11 [t3]:{" "}
                                                {registersmap.get("t3")}
                                            </td>
                                            <td id="k1">
                                                R27 [k1]:{" "}
                                                {registersmap.get("k1")}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td id="t4">
                                                R12 [t4]:{" "}
                                                {registersmap.get("t4")}
                                            </td>
                                            <td id="gp">
                                                R28 [gp]:{" "}
                                                {registersmap.get("gp")}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td id="t5">
                                                R13 [t5]:{" "}
                                                {registersmap.get("t5")}
                                            </td>
                                            <td id="sp">
                                                R29 [sp]:{" "}
                                                {registersmap.get("sp")}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td id="t6">
                                                R14 [t6]:{" "}
                                                {registersmap.get("t6")}
                                            </td>
                                            <td id="s8">
                                                R30 [s8]:{" "}
                                                {registersmap.get("s8")}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td id="t7">
                                                R15 [t7]:{" "}
                                                {registersmap.get("t7")}
                                            </td>
                                            <td id="ra">
                                                R31 [ra]:{" "}
                                                {registersmap.get("ra")}
                                            </td>
                                        </tr>
                                    </table>
                                </li>
                            </ul>
                        </div>
                        {/* end of Register segment */}
                    </li>
                    <li id="mem">
                        <div>
                            <ul>
                                <li
                                    id="decimal"
                                    style={{ display: d ? `block` : `none` }}
                                >
                                    {/* Decimal */}

                                    <div id="memory-tabledec"></div>
                                </li>
                            </ul>
                        </div>
                        {/* end of Memory segment */}
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
