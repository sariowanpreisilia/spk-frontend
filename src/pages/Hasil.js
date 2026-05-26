import { useEffect, useState } from "react";
import axios from "axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell
} from "recharts";

function Hasil() {

  const API =
  "spk-kegiatan-alam-production.up.railway.app";

  const [hasil,setHasil] =
  useState([]); 

  useEffect(()=>{

    loadData();

  },[]);

  const loadData =
  async()=>{

    try{

      const [
        altRes,
        kriRes,
        penRes

      ]=await Promise.all([

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

      const alternatif=
      altRes.data;

      const kriteria=
      kriRes.data;

      const penilaian=
      penRes.data;

      setAlternatif(
        alternatif
      );

      setKriteria(
        kriteria
      );

      let matriks={};

      alternatif.forEach(a=>{

        matriks[a.id]={};

        kriteria.forEach(k=>{

          const nilai=
          penilaian.find(

            p=>

            p.id_alternatif===a.id
            &&

            p.id_kriteria===k.id

          );

          matriks[a.id][k.id]=
          Number(
          nilai?.nilai||0
          );

        });

      });

      let penyebut={};

      kriteria.forEach(k=>{

        let sum=0;

        alternatif.forEach(a=>{

          sum+=Math.pow(
          matriks[a.id][k.id],
          2
          );

        });

        penyebut[k.id]=
        Math.sqrt(sum);

      });

      let normalisasi={};

      alternatif.forEach(a=>{

        normalisasi[a.id]={};

        kriteria.forEach(k=>{

          normalisasi[a.id][k.id]=

          matriks[a.id][k.id]

          /

          (penyebut[k.id]||1);

        });

      });

      let terbobot={};

      alternatif.forEach(a=>{

        terbobot[a.id]={};

        kriteria.forEach(k=>{

          terbobot[a.id][k.id]=

          normalisasi[a.id][k.id]

          *

          k.bobot;

        });

      });

      let idealPlus={};
      let idealMinus={};

      kriteria.forEach(k=>{

        let values=

        alternatif.map(
        a=>

        terbobot[a.id][k.id]

        );

        if(
        k.tipe==="benefit"
        ){

          idealPlus[k.id]=
          Math.max(...values);

          idealMinus[k.id]=
          Math.min(...values);

        }

        else{

          idealPlus[k.id]=
          Math.min(...values);

          idealMinus[k.id]=
          Math.max(...values);

        }

      });

      let preferensi=[];

      alternatif.forEach(a=>{

        let plus=0;
        let minus=0;

        kriteria.forEach(k=>{

          plus+=Math.pow(

          terbobot[a.id][k.id]

          -

          idealPlus[k.id]

          ,2);

          minus+=Math.pow(

          terbobot[a.id][k.id]

          -

          idealMinus[k.id]

          ,2);

        });

        plus=
        Math.sqrt(plus);

        minus=
        Math.sqrt(minus);

        const nilai=

        minus/

        (
        plus+minus
        );

        preferensi.push({

          id:a.id,

          nama:a.nama,

          nilai

        });

      });

      preferensi.sort(

        (a,b)=>

        b.nilai-a.nilai

      );

      setHasil(
        preferensi
      );

      setDetail({

        matriks,

        normalisasi

      });

    }

    catch(err){

      console.log(err);

      alert(
      "Gagal ambil data"
      );

    }

  };

return(

<div className="card">

<h2>

🏆 Hasil Ranking TOPSIS

</h2>

{

hasil.length===0

?

<p>

Belum ada data.

</p>

:

<>

<div
className="podium"
>

<div
className="
podium-card
silver
"
>

🥈

<h3>

{
hasil[1]
?.nama
||

"-"

}

</h3>

<p>

{
hasil[1]
?.nilai
?.toFixed(4)

||

"-"

}

</p>

</div>

<div
className="
podium-card
gold
"
>

🏆

<h2>

{
hasil[0]
?.nama
}

</h2>

<p>

{
hasil[0]
?.nilai
.toFixed(4)
}

</p>

</div>

<div
className="
podium-card
bronze
"
>

🥉

<h3>

{
hasil[2]
?.nama
||

"-"

}

</h3>

<p>

{
hasil[2]
?.nilai
?.toFixed(4)

||

"-"

}

</p>

</div>

</div>

<div
style={{

height:300,

marginTop:30

}}
>

<ResponsiveContainer>

<BarChart
data={hasil}
>

<CartesianGrid
strokeDasharray="
3 3"
/>

<XAxis
dataKey="nama"
/>

<YAxis/>

<Tooltip/>

<Bar
dataKey="nilai"
>

{

hasil.map(
(_,i)=>(

<Cell

key={i}

fill={

i===0

?

"#14b8a6"

:

"#60a5fa"

}

/>

))

}

</Bar>

</BarChart>

</ResponsiveContainer>

</div>

<br/>

<table>

<thead>

<tr>

<th>
Rank
</th>

<th>
Alternatif
</th>

<th>
Nilai
</th>

</tr>

</thead>

<tbody>

{

hasil.map(
(h,i)=>(

<tr
key={i}
>

<td>

#{i+1}

</td>

<td>

{h.nama}

</td>

<td>

{
h.nilai
.toFixed(4)
}

</td>

</tr>

)

)

}

</tbody>

</table>

</>

}

</div>

);

}

export default Hasil;