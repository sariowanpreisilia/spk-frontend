import { Link, useLocation } from "react-router-dom";

function Sidebar() {

  const { pathname } = useLocation();

  const menus = [
    {
      path: "/",
      label: "Dashboard",
      icon: "🏠"
    },

    {
      path: "/kriteria",
      label: "Kriteria",
      icon: "📋"
    },

    {
      path: "/alternatif",
      label: "Alternatif",
      icon: "🌿"
    },

    {
      path: "/penilaian",
      label: "Penilaian",
      icon: "📝"
    },

    {
      path: "/hasil",
      label: "Ranking",
      icon: "🏆"
    }

  ];

  return (

    <div className="sidebar">

      <div className="logo-box">

        <div className="logo-icon">
          🌲
        </div>

        <div>

          <h2>
            SPK TOPSIS
          </h2>

          <span>
            Wisata Alam
          </span>

        </div>

      </div>

      <div className="menu-wrapper">

        {menus.map((m)=>(

          <Link
            key={m.path}
            to={m.path}
            className={
              pathname===m.path
              ? "active"
              : ""
            }
          >

            <span>
              {m.icon}
            </span>

            {m.label}

          </Link>

        ))}

      </div>

      <div className="sidebar-footer">

        Sistem Pendukung
        Keputusan TOPSIS

      </div>

    </div>

  );

}

export default Sidebar;