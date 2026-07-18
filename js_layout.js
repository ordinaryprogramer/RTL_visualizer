function generateLayout(netlist) {

    const layout = {

        moduleName: netlist.moduleName,

        inputs: [],

        outputs: [],

        gates: [],

        wires: []

    };

    const signalPos = {};

    const inputSpacing = 100;
    const gateSpacing = 180;
    const gateX = 350;

    netlist.inputs.forEach((input, index) => {

        const pos = {

            name: input,

            x: 80,

            y: 120 + index * inputSpacing

        };

        signalPos[input] = pos;

        layout.inputs.push(pos);

    });

    netlist.gates.forEach((gate, index) => {

        const gatePos = {

            id: gate.id,

            type: gate.type,

            x: gateX,

            y: 120 + index * gateSpacing,

            inputs: [],

            output: gate.output

        };

        gate.inputs.forEach((inputName, i) => {

            let source = signalPos[inputName];

            if (!source) {

                source = {

                    name: inputName,

                    x: gatePos.x - 120,

                    y: gatePos.y + 25 + i * 30

                };

                signalPos[inputName] = source;

            }

            gatePos.inputs.push(source);

            layout.wires.push({

                from: source,

                to: {

                    x: gatePos.x,

                    y: gatePos.y + 25 + i * 30

                }

            });

        });

        const outPos = {

            name: gate.output,

            x: gatePos.x + 150,

            y: gatePos.y + 40

        };

        signalPos[gate.output] = outPos;

        gatePos.outputPos = outPos;

        layout.gates.push(gatePos);

    });

    netlist.outputs.forEach(output => {

        if (signalPos[output]) {

            layout.outputs.push({

                name: output,

                x: signalPos[output].x + 120,

                y: signalPos[output].y,

                source: signalPos[output]

            });

        }

    });

    return layout;

}