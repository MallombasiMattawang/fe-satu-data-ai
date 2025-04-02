import React, { useState, useEffect } from "react";
import LayoutAdmin from "../../../layouts/Admin";
import { useNavigate } from "react-router-dom";

import Api from "../../../services/Api";
import Cookies from "js-cookie";
import MapComponent from "../../../components/admin/MapComponent";
import MapWruComponent from "../../../components/admin/MapWruComponent";
// import FilterComponent from "../../../components/admin/FilterComponent";
import DataTable from "../../../components/admin/DataTable";
import "leaflet/dist/leaflet.css";
import HeatMapComponent from "../../../components/admin/HeatMapComponent";

//import AI
import AIAnalysis from "../../../components/admin/AIAnalysis";

// Komponen Autocomplete
function SearchAutocomplete({ name, value, onChange, options }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);

  

  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    if (val.trim() !== "") {
      setFilteredOptions(
        options.filter((opt) =>
          opt.toLowerCase().includes(val.toLowerCase())
        )
      );
    } else {
      setFilteredOptions([]);
    }
  };

  const handleSelect = (selectedValue) => {
    setSearchTerm(selectedValue);
    onChange({ target: { name, value: selectedValue } });
    setFilteredOptions([]);
  };

  

  return (
    <div className="position-relative">
      <input
        type="text"
        name={name}
        value={searchTerm}
        onChange={handleSearch}
        className="form-control border-0 shadow-sm"
        placeholder={`Cari ${name.replace("_", " ")}...`}
      />
      {filteredOptions.length > 0 && (
        <ul className="list-group position-absolute w-100 shadow-sm mt-1" style={{ zIndex: 1000 }}>
          {filteredOptions.map((opt, index) => (
            <li
              key={index}
              className="list-group-item list-group-item-action"
              onClick={() => handleSelect(opt)}
              style={{ cursor: "pointer" }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function MapsWru() {
  document.title = "Peta Titik Sebaran TSL - WRU";
  const [patroliData, setPatroliData] = useState([]);

  const [filterParams, setFilterParams] = useState([]);
  //API kirim ke AI
  const [apiData, setApiData] = useState([]);

  // State untuk menyimpan nilai filter dari setiap input
  const [filters, setFilters] = useState({
    year: "",
    jenis_kejadian: "",
    lokasi: "",
    kode_tsl: "",
    jenis_tsl: "",
    berita_acara: "",
    penyebab_kematian: "",
    serahan: "",

  });

  const [listKejadian, setListKejadians] = useState([]);
  const [listKodeTsl, setListKodeTsls] = useState([]);
  const [listTsl, setListTsls] = useState([]);
  const [listPihakMenyerahkan, setListPihakMenyerahkans] = useState([]);
  const [listPenyebabKematian, setListPenyebabKematians] = useState([]);



  // Fungsi untuk menangani perubahan input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };


  // Fungsi untuk menangani submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Filter hanya nilai yang tidak kosong
    const filteredParams = Object.entries(filters)
      .filter(([key, value]) => value.trim() !== "") // Hanya ambil yang tidak kosong
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});

    // Buat query string
    const queryString = new URLSearchParams(filteredParams).toString();

    // Redirect ke halaman Maps dengan query string
    window.location.href = `/admin/maps-wru?${queryString}`;
  };

  const navigate = useNavigate();

  const handleReset = () => {
    setFilters({
      jenis_kejadian: "",
      jenis_tsl: "",
      serahan: "",
      penyebab_kematian: "",
    });

    // Arahkan ke halaman tanpa reload
    navigate("/admin/maps-wru");
  };


  const token = Cookies.get("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const queryString = params.toString();
        let url = "/api/admin/maps-wru";
        if (queryString) url += `?${queryString}`;
        const response = await Api.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.success) setPatroliData(response.data.data);
        const filtersArray = [];
        params.forEach((value, key) => {
          filtersArray.push({ key, value });
        });
        setFilterParams(filtersArray);
        setApiData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();

    const fetchFilterData = async () => {
      try {
        const url = "/api/admin/filter-wru";
        const response = await Api.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          const data = response.data.data;
          setListKejadians(data.listKejadian || []);
          setListTsls(data.listTsl || []);
          setListKodeTsls(data.listKodeTsl || []);
          setListPihakMenyerahkans(data.listPihakMenyerahkan || []);
          setListPenyebabKematians(data.listPenyebabKematian || []);
        }
      } catch (error) {
        console.error("Error fetching filter data:", error);
      }
    };
    fetchFilterData();


  }, [token]);



  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid px-4 mt-5">
          <h2 className="mb-4">
            <i className="fa fa-map"></i> Peta Sebaran WRU
          </h2>
          <div className="row">
            <div className="col-xl-9 col-md-9">
              {/* Menampilkan filter dalam teks dengan koma pemisah */}
              <p className="text-white bg-dark p-3 rounded shadow-sm">
                <strong>Filter Aktif:</strong>
                {filterParams.length > 0
                  ? filterParams.map((param) => `${param.key}: ${param.value}`).join(", ")
                  : " Tidak ada filter yang dipilih"}
              </p>
              {/* Kirim data ke AIAnalysis */}
              <AIAnalysis apiData={apiData} />
              <MapWruComponent patroliData={patroliData} />
              <hr />
              <div className="card bg-danger text-white mb-4 border-0 shadow-sm">
                <div className="card-body text-center">
                  <div className="table-responsive">
                    <div className="container bg-dark text-white p-4 rounded">
                      <div className="row g-3">
                        {[
                          { src: "/images/icon-tsl-konflik.png", label: "Konflik TSL" },
                          { src: "/images/icon-tsl-mati.png", label: "Kematian TSL" },
                          { src: "/images/icon-tsl-patroli.png", label: "Patroli TSL" },
                          { src: "/images/icon-tsl-pelepasliaran.png", label: "Pelepasliaran TSL" },
                          { src: "/images/icon-tsl-serahan.png", label: "Serahan TSL" },
                          { src: "/images/icon-tsl-titipan.png", label: "Titipan TSL" },
                          { src: "/images/icon-tsl-translokasi.png", label: "Translokasi TSL" },
                          { src: "/images/icon-tsl-kandang.png", label: "Kandang Transit" }
                        ].map((item, index) => (
                          <div key={index} className="col-6 col-md-4 col-lg-3">
                            <div className="card bg-secondary text-center p-3 border-0">
                              <img src={item.src} alt={item.label} className="img-fluid mx-auto" style={{ width: "50px", height: "50px" }} />
                              <div className="mt-2">{item.label}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* <DataTable patroliData={patroliData} /> */}

            </div>
            <div className="col-xl-3 col-md-3">
              <div className="card bg-danger text-white mb-4 border-0 shadow-sm">
                <div className="card-body">
                  <img src={"/images/logo-wru.png"} width={"200"} className="text-center mb-3" />
                  <p>Lakukan Pencarian Data:</p>
                  <form onSubmit={handleSubmit}>
                    <table className="table table-bordered bg-dark text-white">
                      <tbody>
                        <tr>
                          <td>Jenis Kejadian</td>
                          <td>
                            <select
                              name="jenis_kejadian"
                              value={filters.jenis_kejadian}
                              onChange={handleInputChange}
                              className="form-control border-0 shadow-sm"
                            >
                              <option value="">Select Kejadian</option>
                              {listKejadian.map((item) => (
                                <option key={item.jenis_kejadian} value={item.jenis_kejadian}>
                                  {item.jenis_kejadian}
                                </option>
                              ))}
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <td>Jenis TSL</td>
                          <td>
                            <select
                              name="jenis_tsl"
                              value={filters.jenis_tsl}
                              onChange={handleInputChange}
                              className="form-control border-0 shadow-sm"
                            >
                              <option value="">Select TSL</option>
                              {listTsl.map((item) => (
                                <option key={item.jenis_tsl} value={item.jenis_tsl}>
                                  {item.jenis_tsl}
                                </option>
                              ))}
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <td>Kode TSL</td>
                          <td>
                            <SearchAutocomplete
                              name="kode_tsl"
                              value={filters.kode_tsl}
                              onChange={(e) => setFilters({ ...filters, kode_tsl: e.target.value })}
                              options={listKodeTsl.map((item) => item.kode_tsl)}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Pihak Menyerahkan</td>
                          <td>
                            <select
                              name="serahan"
                              value={filters.serahan}
                              onChange={handleInputChange}
                              className="form-control border-0 shadow-sm"
                            >
                              <option value="">Select Menyerahkan</option>
                              {listPihakMenyerahkan.map((item) => (
                                <option key={item.serahan} value={item.serahan}>
                                  {item.serahan}
                                </option>
                              ))}
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <td>Penyebab Kematian</td>
                          <td>
                            <select
                              name="penyebab_kematian"
                              value={filters.penyebab_kematian}
                              onChange={handleInputChange}
                              className="form-control border-0 shadow-sm"
                            >
                              <option value="">Select Penyebab Kematian</option>
                              {listPenyebabKematian.map((item) => (
                                <option key={item.penyebab_kematian} value={item.penyebab_kematian}>
                                  {item.penyebab_kematian}
                                </option>
                              ))}
                            </select>
                          </td>
                        </tr>


                        <tr>
                          <td colSpan={2} className="text-center">
                            <button type="submit" className="btn btn-primary w-40">
                              Filter
                            </button>
                            &nbsp;
                            <a href={`/admin/maps-wru`} className="btn btn-danger w-40">
                              Reset
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </form>
                </div>
              </div>




            </div>
          </div>
        </div>
      </main>
    </LayoutAdmin>
  );
}