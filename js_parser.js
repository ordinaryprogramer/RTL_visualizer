function parseVerilog(code) {

    const netlist = {
        moduleName: "",
        inputs: [],
        outputs: [],
        wires: [],
        gates: []
    };

    code = code.replace(/\r/g, "");

    const moduleMatch = code.match(/module\s+([A-Za-z_][A-Za-z0-9_]*)/);

    if (moduleMatch) {
        netlist.moduleName = moduleMatch[1];
    }

    parseSignals(code, "input", netlist.inputs);
    parseSignals(code, "output", netlist.outputs);
    parseSignals(code, "wire", netlist.wires);

    parseAssigns(code, netlist);

    return netlist;
}

function parseSignals(code, keyword, target) {

    const regex = new RegExp(keyword + "\\s+([^;]+);", "g");

    let match;

    while ((match = regex.exec(code)) !== null) {

        match[1]
            .split(",")
            .map(v => v.trim())
            .filter(v => v.length > 0)
            .forEach(v => target.push(v));

    }

}

function parseAssigns(code, netlist) {

    const regex = /assign\s+(.+?)\s*=\s*(.+?)\s*;/g;

    let match;

    let gateIndex = 1;

    while ((match = regex.exec(code)) !== null) {

        const output = match[1].trim();

        const expression = match[2].trim();

        const gate = expressionToGate(expression);

        gate.id = "G" + gateIndex++;

        gate.output = output;

        gate.expression = expression;

        netlist.gates.push(gate);

    }

}

function expressionToGate(expression) {

    const gate = {

        type: "BUF",

        inputs: [],

        output: "",

        expression: expression

    };

    if (expression.startsWith("~")) {

        gate.type = "NOT";

        gate.inputs.push(expression.substring(1).trim());

        return gate;

    }

    if (expression.includes("&")) {

        gate.type = "AND";

        gate.inputs = expression.split("&").map(v => v.trim());

        return gate;

    }

    if (expression.includes("|")) {

        gate.type = "OR";

        gate.inputs = expression.split("|").map(v => v.trim());

        return gate;

    }

    if (expression.includes("^")) {

        gate.type = "XOR";

        gate.inputs = expression.split("^").map(v => v.trim());

        return gate;

    }

    gate.type = "BUF";

    gate.inputs.push(expression);

    return gate;

}