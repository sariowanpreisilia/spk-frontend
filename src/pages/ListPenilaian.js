import { useEffect, useState } from "react";
import axios from "axios";

function ListPenilaian() {

  const API =
  "http://localhost:5000";

  const [
    data,
    setData
  ] = useState([]);

  const loadData =
  async()=>{

    try{

      const res=
      await axios.get(
        `${API}/penilaian`
      );

      setData(
        res.data
      );

    }

    catch(err){

      console.log(err);

      alert(
        "Gagal mengambil data"
      );

    }

  };

  useEffect(()=>{

    loadData();

  },[]);

return(

<div className="card">

<h2>

📊 Data Penilaian

</h2>

{

data.length===0

?

<div className="empty">

Belum ada data penilaian

</div>

:

<div
className="
penilaian-grid
"
>

{

data.map(d=>(

<div

key={d.id}

className="
penilaian-card
"

>

<div
className="
penilaian-header
"
>

<div
className="
penilaian-icon
"
>

📝

</div>

<div>

<h3>

{
d.alternatif
?.nama

||

"-"

}

</h3>

<p>

{

d.kriteria
?.nama

||

"-"

}

</p>

</div>

</div>

<div
className="
nilai-section
"
>

<h1>

{
Number(
d.nilai
).toFixed(0)
}

</h1>

<span>

Nilai

</span>

</div>

<div
className="
progress
"
>

<div

className="
progress-fill
"

style={{

width:
`${d.nilai}%`

}}

>

</div>

</div>

</div>

))

}

</div>

}

</div>

);

}

export default ListPenilaian;