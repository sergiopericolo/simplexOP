
class Frac {
    constructor(n, d = 1) {
        if (d === 0) throw "DivByZero";
        let common = (a, b) => b ? common(b, a % b) : a;
        let g = Math.abs(common(n, d));
        this.n = (d < 0 ? -n : n) / g;
        this.d = Math.abs(d) / g;
    }
    
    add(f) { return new Frac(this.n * f.d + f.n * this.d, this.d * f.d); }
    sub(f) { return new Frac(this.n * f.d - f.n * this.d, this.d * f.d); }
    mul(f) { return new Frac(this.n * f.n, this.d * f.d); }
    
    toString(showFrac) {
        if (!showFrac) return Math.round((this.n / this.d) * 10000) / 10000;
        if (this.d === 1) return this.n.toString();
        return `${this.n}/${this.d}`;
    }
}

let n = 4;



function showHome() {
    document.getElementById('setup-page').classList.remove('hidden');
    document.getElementById('calc-page').classList.add('hidden');
}



function buildAddPage() {
    let el = document.getElementById('num_elements');
    n = Math.min(Math.max(parseInt(el.value) || 1, 1), 10);

    const grid = document.getElementById('matrix-grid');
    grid.style.gridTemplateColumns = `auto auto repeat(${n}, auto) auto`;
    
    let h = '<div class="label-cell">R1</div><div></div>';
    
    for (let i = 0; i < n; i++) h += `<input id="a_${i}" value="0">`;
    h += '<div></div>';
    h += '<div><select id="operation"><option value="-">-</option><option value="+">+</option></select></div>';
    h += `<div style="display:flex; align-items:center;"><input id="m_value" value="1" style="width:55px"><span style="margin-left:4px">×</span></div>`;
   
    for (let i = 0; i < n; i++) h += `<input id="b_${i}" value="0">`;
    h += '<div class="label-cell">=</div>';
    h += '<div class="label-cell">RES</div><div></div>';
    
    for (let i = 0; i < n; i++) h += `<div id="res_${i}" class="result-box">0</div>`;
    h += '<div></div>';
    
    grid.innerHTML = h;
    
    document.getElementById('setup-page').classList.add('hidden');
    document.getElementById('calc-page').classList.remove('hidden');
}



function parseNum(v) {
    let s = v.toString().trim().replace(',', '.');

    if (!s) return new Frac(0);
    
    if (s.includes('/')) {
        let p = s.split('/');
        return new Frac(parseInt(p[0]), parseInt(p[1]));
    }
    if (s.includes('.')) {
        let dec = s.split('.')[1].length;
        let den = Math.pow(10, dec);
        let num = Math.round(parseFloat(s) * den);
        return new Frac(num, den);
    }
    return new Frac(parseInt(s) || 0);
}



function compute() {
    const useFrac = document.getElementById('use_fractions').checked;
    const op = document.getElementById('operation').value;
    const m = parseNum(document.getElementById('m_value').value);
    
    for (let i = 0; i < n; i++) {
        const a = parseNum(document.getElementById(`a_${i}`).value);
        const b = parseNum(document.getElementById(`b_${i}`).value);
        const resBox = document.getElementById(`res_${i}`);
        let res = (op === "+") ? a.add(m.mul(b)) : a.sub(m.mul(b));
        resBox.innerText = res.toString(useFrac);
    }
}
