import { useEffect, useState } from "react";
import axios from "axios";

function Kriteria() {
  const API = "spk-kegiatan-alam-production.up.railway.app";

  const [data, setData] = useState([]);
  const [nama, setNama] = useState("");
  const [bobot, setBobot] = useState("");
  const [tipe, setTipe] = useState("benefit");
  const [editId, setEditId] = useState(null);

  // ================= LOAD DATA =================
  const load = async () => {
    try {
      const res = await axios.get(`${API}/kriteria`);
      setData(res.data);
    } catch (error) {
      console.error(error);
      alert("Gagal mengambil data");
    }
  };

  useEffect(() => {
    load();
  }, []);

  // ================= RESET FORM =================
  const resetForm = () => {
    setNama("");
    setBobot("");
    setTipe("benefit");
    setEditId(null);
  };

  // ================= SIMPAN =================
  const simpan = async () => {
    // VALIDASI
    if (!nama.trim()) {
      alert("Nama kriteria wajib diisi!");
      return;
    }

    if (!bobot) {
      alert("Bobot wajib diisi!");
      return;
    }

    const nilaiBobot = parseFloat(bobot);

    if (nilaiBobot < 0 || nilaiBobot > 1) {
      alert("Bobot harus antara 0 sampai 1");
      return;
    }

    try {
      const payload = {
        nama,
        bobot: nilaiBobot,
        tipe,
      };

      if (editId) {
        // UPDATE
        await axios.put(
          `${API}/kriteria/${editId}`,
          payload
        );

        alert("Data berhasil diupdate!");
      } else {
        // INSERT
        await axios.post(
          `${API}/kriteria`,
          payload
        );

        alert("Data berhasil ditambahkan!");
      }

      resetForm();
      load();

    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan data");
    }
  };

  // ================= HAPUS =================
  const hapus = async (id, namaKriteria) => {
    const konfirmasi = window.confirm(
      `Yakin ingin menghapus kriteria "${namaKriteria}" ?`
    );

    if (!konfirmasi) return;

    try {
      await axios.delete(`${API}/kriteria/${id}`);

      alert("Data berhasil dihapus!");
      load();

    } catch (error) {
      console.error(error);

      // ERROR RELASI
      if (error.response?.data?.error) {
        alert(
          "Data gagal dihapus karena masih digunakan pada penilaian"
        );
      } else {
        alert("Gagal hapus data");
      }
    }
  };

  // ================= EDIT =================
  const edit = (d) => {
    setEditId(d.id);
    setNama(d.nama || "");
    setBobot(d.bobot || "");
    setTipe(d.tipe || "benefit");

    // scroll ke atas biar nyaman edit
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

 return (

<div className="card">

<h2>
📋 Data Kriteria
</h2>

<div className="form">

<input
type="text"
placeholder="Nama kriteria"
value={nama}
onChange={(e)=>
setNama(e.target.value)
}
/>

<input
type="number"
step="0.01"
min="0"
max="1"
placeholder="Bobot"
value={bobot}
onChange={(e)=>
setBobot(e.target.value)
}
/>

<select
value={tipe}
onChange={(e)=>
setTipe(e.target.value)
}
>

<option value="benefit">
Benefit
</option>

<option value="cost">
Cost
</option>

</select>

<button onClick={simpan}>

{editId
?
"Update"
:
"Tambah"}

</button>

</div>

<div className="kriteria-grid">

{

data.map((d)=>(

<div
key={d.id}
className="kriteria-card"
>

<h3>

{d.nama}

</h3>

<br/>

<p>

Bobot :

<b>

{
Number(
d.bobot
).toFixed(2)
}

</b>

</p>

<br/>

<div
className={
d.tipe==="benefit"
?
"badge-benefit"
:
"badge-cost"
}
>

{d.tipe}

</div>

<br/>
<br/>

<div className="btn-group">

<button
onClick={()=>
edit(d)
}
>

Edit

</button>

<button
className="btn-delete"
onClick={()=>
hapus(
d.id,
d.nama
)
}
>

Hapus

</button>

</div>

</div>

))

}

</div>

</div>

);
}

export default Kriteria;