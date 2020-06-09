
const simpleTest = {
    run(invert) {
        const testList = [
            // [result, [args]]
            ['#000000', ['#fff']],
            ['#000000', ['#fff', true]],
            ['#FFFFFF', ['#000', true]],
            ['#dfec6a', ['#201395']],
            ['rgb(255,255,0)', ['rgb(255,255,0)']],
            ['rgb(255,255,0)', ['rgb(255,255,0)', true]],
            ['rgba(255,255,0,0.6)', ['rgb(255,255,0,0.6)']],
            ['rgba(255,255,0,0.6)', ['rgb(255,255,0,0.6)', true]],
        ];
        const html = [];
        testList.forEach(test => {
            let args = test[1];
            let result = invert(...args);
            let c = result.toLowerCase() === test[0].toLowerCase() ? 'green' : 'red';
            html.push(`<div style="color:${c}">invert(${args.join(', ')}) = ${result}</div>`);
        });
        return html.join('');
    },

    output(invert) {
        const box = document.getElementById('box');
        const type = Object.prototype.toString.call(invert).match(/\s(\w+)/i)[1].toLowerCase();
        if (type === 'function') {
            box.innerHTML = simpleTest.run(invert);
        } else if (type === 'object') {
            box.innerHTML = '<div style="color:red">Using default export: <code>invert.default</code></div><br />';
            box.innerHTML += simpleTest.run(invert.default);
        } else {
            box.innerHTML = `<div style="color:red"><code>type(invert) === ${object}</code></div>`;
        }
    }
}
