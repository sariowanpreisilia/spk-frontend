import { useEffect, useState } from "react";
import axios from "axios";

function Alternatif() {
  const API = "spk-kegiatan-alam-production.up.railway.app";

  const [data, setData] = useState([]);
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [gambar, setGambar] = useState(null);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // ================= LOAD DATA =================
  const loadData = async () => {
    try {
      const res = await axios.get(`${API}/alternatif`);
      setData(res.data);
    } catch (err) {
      console.error(err);
      alert("Gagal mengambil data!");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // ================= HANDLE FILE =================
  const handleFile = (e) => {
    const file = e.target.files[0];
    setGambar(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  // ================= SIMPAN =================
  const handleSubmit = async () => {
    if (!nama) {
      alert("Nama tidak boleh kosong!");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("nama", nama);
      formData.append("deskripsi", deskripsi);
      if (gambar) formData.append("gambar", gambar);

      if (editId) {
        await axios.put(`${API}/alternatif/${editId}`, formData);
      } else {
        await axios.post(`${API}/alternatif`, formData);
      }

      // reset form
      setNama("");
      setDeskripsi("");
      setGambar(null);
      setPreview(null);
      setEditId(null);

      loadData();

    } catch (error) {
      console.error(error);
      alert("Terjadi error saat menyimpan!");
    }

    setLoading(false);
  };

  // ================= EDIT =================
  const handleEdit = (item) => {
    setNama(item.nama);
    setDeskripsi(item.deskripsi || "");
    setEditId(item.id);

    // 🔥 FIX UTAMA DI SINI
    if (item.gambar) {
      setPreview(`${API}/img/${item.gambar}`);
    } else {
      setPreview(null);
    }

    setGambar(null); // reset file input
  };

  // ================= HAPUS =================
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin hapus data?")) return;

    try {
      await axios.delete(`${API}/alternatif/${id}`);
      loadData();
    } catch (error) {
      console.error(error);
      alert("Gagal hapus data!");
    }
  };

 return(

<div className="card">

<h2>

🌿 Wisata Alam

</h2>

<div className="form">

<input
type="text"
placeholder="Nama kegiatan"
value={nama}
onChange={(e)=>
setNama(
e.target.value
)}
/>

<input
type="file"
onChange={handleFile}
/>

<input
type="text"
placeholder="Deskripsi"
value={deskripsi}
onChange={(e)=>
setDeskripsi(
e.target.value
)}
/>

<button
onClick={handleSubmit}
>

{
loading
?
"Menyimpan..."
:
editId
?
"Update"
:
"Tambah"
}

</button>

</div>

<div className="alternatif-grid">

{

data.map(item=>(

<div
key={item.id}
className="wisata-item"
>

{

item.gambar && (

<img

src={
`${API}/img/${item.gambar}`
}

alt=""

/>

)

}

<div className="wisata-body">

<h3>

{item.nama}

</h3>

<p>

{
item.deskripsi
||
"Belum ada deskripsi"
}

</p>

<br/>

<div className="btn-group">

<button
onClick={()=>
handleEdit(
item
)
}
>

Edit

</button>

<button
className="btn-delete"
onClick={()=>
handleDelete(
item.id
)
}
>

Hapus

</button>

</div>

</div>

</div>

))

}

</div>

</div>

);
}

export default Alternatif;