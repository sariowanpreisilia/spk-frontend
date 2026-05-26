import { useEffect, useState } from "react";
import axios from "axios";

function Penilaian() {

const API =
"http://localhost:5000";

const [
alternatif,
setAlternatif
] = useState([]);

const [
kriteria,
setKriteria
] = useState([]);

const [
nilai,
setNilai
] = useState({});


// ================= LOAD DATA =================

const loadData =
async()=>{

try{

const [

altRes,
kriRes,
penRes

] = await Promise.all([

axios.get(
`${API}/alternatif`
),

axios.get(
`${API}/kriteria`
),

axios.get(
`${API}/penilaian`
)

]);

setAlternatif(
altRes.data
);

setKriteria(
kriRes.data
);

const temp={};

penRes.data.forEach(p=>{

temp[
`${p.id_alternatif}-${p.id_kriteria}`
]

=
p.nilai;

});

setNilai(
temp
);

}

catch(err){

console.log(err);

alert(
"Gagal load data"
);

}

};

useEffect(()=>{

loadData();

},[]);


// ================= INPUT =================

const handleChange=(

altId,
kritId,
value

)=>{

const key=
`${altId}-${kritId}`;

if(
value===""
){

setNilai(
prev=>({

...prev,

[key]:""

})
);

return;

}

let val=
Number(value);

if(val<0)
val=0;

if(val>100)
val=100;

setNilai(
prev=>({

...prev,

[key]:val

})
);

};


// ================= SIMPAN =================

const simpanSemua =
async()=>{

try{

const data=[];

for(
let a of alternatif
){

for(
let k of kriteria
){

const key=
`${a.id}-${k.id}`;

const val=
nilai[key];

if(
val===""
||
val===undefined
){

alert(

`Nilai ${a.nama} - ${k.nama} belum diisi`

);

return;

}

data.push({

id_alternatif:
Number(a.id),

id_kriteria:
Number(k.id),

nilai:
Number(val)

});

}

}

console.log(
"SEND DATA:",
data
);

await axios.post(

`${API}/penilaian/bulk`,

data,

{

headers:{

"Content-Type":
"application/json"

}

}

);

alert(
"Berhasil disimpan"
);

loadData();

}

catch(err){

console.log(
"ERROR:",
err
);

console.log(
err.response?.data
);

alert(

err.response?.data?.message

||

"Gagal simpan"

);

}

};


// ================= VIEW =================

return(

<div className="card">

<div
className="
penilaian-header-modern
"
>

<div>

<h2>

📝 Penilaian Alternatif

</h2>

<p>

Input nilai tiap wisata
berdasarkan seluruh
kriteria TOPSIS

</p>

</div>

<button
onClick={
simpanSemua
}
>

💾 Simpan Semua

</button>

</div>

<div className="
matrix-modern
">

<table>

<thead>

<tr>

<th>

Wisata

</th>

{

kriteria.map(k=>(

<th
key={k.id}
>

{k.nama}

</th>

))

}

</tr>

</thead>

<tbody>

{

alternatif.map(a=>(

<tr
key={a.id}
>

<td>

<div
className="
alt-badge
"
>

🌿

<span>

{a.nama}

</span>

</div>

</td>

{

kriteria.map(k=>{

const key=
`${a.id}-${k.id}`;

return(

<td
key={k.id}
>

<div
className="
nilai-modern-box
"
>

<input

className="
nilai-modern-input
"

type="number"

min="0"

max="100"

value={
nilai[key]
?? ""
}

onChange={(e)=>

handleChange(

a.id,
k.id,
e.target.value

)

}

/>

<div
className="
nilai-progress
"
>

<div

className="
nilai-progress-fill
"

style={{

width:
`${nilai[key]||0}%`

}}

>

</div>

</div>

<span
className="
nilai-badge
"
>

{
nilai[key]
??0
}

</span>

</div>

</td>

);

})

}

</tr>

))

}

</tbody>

</table>

</div>

</div>

);

}

export default Penilaian;