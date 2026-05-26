import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

  const API =
  "http://localhost:5000";

  const [
    totalAlternatif,
    setTotalAlternatif
  ] = useState(0);

  const [
    totalKriteria,
    setTotalKriteria
  ] = useState(0);

  const [
    totalPenilaian,
    setTotalPenilaian
  ] = useState(0);

  const [
    ranking,
    setRanking
  ] = useState([]);

  const loadData = async()=>{

    try{

      const [
        altRes,
        kriRes,
        penRes,
        hasilRes
      ]=await Promise.all([

        axios.get(
          `${API}/alternatif`
        ),

        axios.get(
          `${API}/kriteria`
        ),

        axios.get(
          `${API}/penilaian`
        ),

        axios.get(
          `${API}/alternatif`
        )

      ]);

      setTotalAlternatif(
        altRes.data.length
      );

      setTotalKriteria(
        kriRes.data.length
      );

      setTotalPenilaian(
        penRes.data.length
      );

      setRanking(
        hasilRes.data.slice(
          0,
          3
        )
      );

    }

    catch(err){

      console.log(err);

    }

  };

  useEffect(()=>{

    loadData();

  },[]);

  return(

<div>

<div className="hero-card">

<div>

<h1>

🌲 SPK TOPSIS
Wisata Alam

</h1>

<p>

Sistem pendukung keputusan
untuk menentukan wisata
alam terbaik menggunakan
metode TOPSIS secara
objektif dan otomatis.

</p>

<button>

Mulai Analisis

</button>

</div>

<div className="hero-image">

🏕️

</div>

</div>

<div className="dashboard-grid">

<div className="stat-card">

<h3>

{totalKriteria}

</h3>

<span>

📋 Total Kriteria

</span>

</div>

<div className="stat-card">

<h3>

{totalAlternatif}

</h3>

<span>

🌿 Alternatif

</span>

</div>

<div className="stat-card">

<h3>

{totalPenilaian}

</h3>

<span>

📝 Penilaian

</span>

</div>

<div className="stat-card">

<h3>

TOPSIS

</h3>

<span>

🏆 Metode

</span>

</div>

</div>

<div className="card">

<h2>

Wisata Populer

</h2>

<div className="wisata-grid">

{ranking.map(
(r,i)=>(

<div
className="wisata-card"
key={i}
>

<div
className="wisata-icon"
>

🌄

</div>

<h3>

{r.nama}

</h3>

<p>

Alternatif wisata
alam pilihan.

</p>

</div>

)

)}

</div>

</div>

<div className="card">

<h2>

Keunggulan Sistem

</h2>

<div className="fitur-grid">

<div className="fitur">

⚡

<h3>

Cepat

</h3>

<p>

Perhitungan
otomatis.

</p>

</div>

<div className="fitur">

🎯

<h3>

Objektif

</h3>

<p>

Multi kriteria.

</p>

</div>

<div className="fitur">

📈

<h3>

Analitis

</h3>

<p>

Ranking akurat.

</p>

</div>

<div className="fitur">

🌿

<h3>

Modern

</h3>

<p>

UI elegan.

</p>

</div>

</div>

</div>

</div>

);

}

export default Dashboard;