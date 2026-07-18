function drawCircuit(layout) {

    const svg = document.getElementById("diagram");

    svg.innerHTML = "";

    svg.setAttribute("viewBox", "0 0 1400 1000");

    const NS = "http://www.w3.org/2000/svg";

    function create(type) {
        return document.createElementNS(NS, type);
    }

    function line(x1, y1, x2, y2) {

        const l = create("line");

        l.setAttribute("x1", x1);
        l.setAttribute("y1", y1);
        l.setAttribute("x2", x2);
        l.setAttribute("y2", y2);

        l.setAttribute("stroke", "#222");
        l.setAttribute("stroke-width", "2");

        svg.appendChild(l);
    }

    function text(x, y, value) {

        const t = create("text");

        t.setAttribute("x", x);

        t.setAttribute("y", y);

        t.setAttribute("font-size", "18");

        t.setAttribute("font-family", "Consolas");

        t.textContent = value;

        svg.appendChild(t);
    }

    function gate(x, y, type) {

        const r = create("rect");

        r.setAttribute("x", x);

        r.setAttribute("y", y);

        r.setAttribute("width", "80");

        r.setAttribute("height", "80");

        r.setAttribute("rx", "8");

        r.setAttribute("fill", "#2563eb");

        r.setAttribute("stroke", "#1e3a8a");

        r.setAttribute("stroke-width", "2");

        svg.appendChild(r);

        const t = create("text");

        t.setAttribute("x", x + 40);

        t.setAttribute("y", y + 47);

        t.setAttribute("fill", "white");

        t.setAttribute("font-size", "16");

        t.setAttribute("text-anchor", "middle");

        t.textContent = type;

        svg.appendChild(t);
    }

    layout.inputs.forEach(input => {

        text(input.x - 30, input.y + 5, input.name);

        line(
            input.x,
            input.y,
            input.x + 40,
            input.y
        );

    });

    layout.wires.forEach(wire => {

        line(
            wire.from.x + 40,
            wire.from.y,
            wire.to.x,
            wire.to.y
        );

    });

    layout.gates.forEach(g => {

        gate(
            g.x,
            g.y,
            g.type
        );

        line(
            g.x + 80,
            g.y + 40,
            g.outputPos.x,
            g.outputPos.y
        );

        text(
            g.outputPos.x + 8,
            g.outputPos.y - 8,
            g.output
        );

    });

    layout.outputs.forEach(output => {

        line(
            output.source.x,
            output.source.y,
            output.x,
            output.y
        );

        text(
            output.x + 8,
            output.y + 5,
            output.name
        );

    });

}