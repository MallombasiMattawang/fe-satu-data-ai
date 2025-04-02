import React, { useState, useEffect } from "react";
import LayoutAdmin from "../../../layouts/Admin";

import Api from "../../../services/Api";
import Cookies from "js-cookie";
import MapComponent from "../../../components/admin/MapComponent";
// import FilterComponent from "../../../components/admin/FilterComponent";
import DataTable from "../../../components/admin/DataTable";
import "leaflet/dist/leaflet.css";
import HeatMapComponent from "../../../components/admin/HeatMapComponent";

//import AI Components
import AIAnalysis from "../../../components/admin/AIAnalysis";

export default function MapsRbm() {
  document.title = "Peta Titik Patroli - RBM";
  const [patroliData, setPatroliData] = useState([]);

  const [filterParams, setFilterParams] = useState([]);

  // State untuk menyimpan nilai filter dari setiap input
  const [filters, setFilters] = useState({
    year: "",
    patrol_id: "",
    station: "",
    observation_category_0: "",
    observation_category_1: "",
    jenis_tumbuhan: "",
    jenis_satwa: "",
  });

  const [observationCategoryOptions, setObservationCategoryOptions] = useState([]);
  const [subObservationCategoryOptions, setSubObservationCategoryOptions] = useState([]);
  const [jenisTumbuhanOptions, setJenisTumbuhanOptions] = useState([]);
  const [jenisSatwaOptions, setJenisSatwaOptions] = useState([]);
  const [tindakan, setTindakan] = useState([]);
  const [temuan, setTemuan] = useState([]);
  const [leader, setLeader] = useState([]);
  const [station, setStation] = useState([]);

  //API kirim ke AI
  const [apiData, setApiData] = useState([]);

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
    window.location.href = `/admin/maps-rbm?${queryString}`;
  };


  const token = Cookies.get("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const queryString = params.toString();
        let url = "/api/admin/maps-rbm";
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
        const url = "/api/admin/filter-rbm";
        const response = await Api.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          const data = response.data.data;
          setObservationCategoryOptions(data.listObservationCategory_0 || []);
          setSubObservationCategoryOptions(data.listObservationCategory_1 || []);
          setJenisTumbuhanOptions(data.listTumbuhan || []);
          setJenisSatwaOptions(data.listSatwa || []);
          setTindakan(data.listTindakan || []);
          setTemuan(data.listTipeTemuan || []);
          setLeader(data.listLeader || []);
          setStation(data.listStation || []);
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
            <i className="fa fa-map"></i> Peta Titik Patroli RBM
          </h2>
          <div className="row">
            <div className="col-xl-9 col-md-9">
              <AIAnalysis apiData={apiData} />
              <MapComponent patroliData={patroliData} />
              <hr />
              <h6 className="mb-4">
                <i className="fa fa-map"></i> Heat Map Patroli RBM
              </h6>
              <HeatMapComponent patroliData={patroliData} />
              <DataTable patroliData={patroliData} />

            </div>
            <div className="col-xl-3 col-md-3">
              <div className="card bg-danger text-white mb-4 border-0 shadow-sm">
                <div className="card-body text-center">
                  <img src={"/images/logo-smart.png"} width={"80"} height={"80"} className="mb-3" />
                  <p>Filter Query berdasarkan:</p>
                  <div className="table-responsive">
                    <table className="table table-bordered bg-dark text-white">
                      <thead>
                        <tr>
                          <th>Field</th>
                          <th>Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filterParams.map((param, index) => (
                          <tr key={index}>
                            <td>{param.key}</td>
                            <td>{param.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                </div>
              </div>

              <div className="card bg-danger text-white mb-4 border-0 shadow-sm">
                <div className="card-body">
                  <p>Lakukan Pencarian Data:</p>
                  <form onSubmit={handleSubmit}>
                    <table className="table table-bordered bg-dark text-white">
                      <tbody>
                        <tr>
                          <td>Year</td>
                          <td>
                            <select
                              name="year"
                              value={filters.year}
                              onChange={handleInputChange}
                              className="form-control border-0 shadow-sm"
                            >
                              <option value="">All Year</option>
                              <option value="2023">2023</option>
                              <option value="2024">2024</option>
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <td>Resort/Station</td>
                          <td>
                            <select
                              name="station"
                              value={filters.station}
                              onChange={handleInputChange}
                              className="form-control border-0 shadow-sm"
                            >
                              <option value="">Select Resort</option>
                              {station.map((item) => (
                                <option key={item.station} value={item.station}>
                                  {item.station}
                                </option>
                              ))}
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <td>Leader</td>
                          <td>
                            <select
                              name="leader"
                              value={filters.leader}
                              onChange={handleInputChange}
                              className="form-control border-0 shadow-sm"
                            >
                              <option value="">Select leader</option>
                              {leader.map((item) => (
                                <option key={item.leader} value={item.leader}>
                                  {item.leader}
                                </option>
                              ))}
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <td>Observation Category</td>
                          <td>
                            <select
                              name="observation_category_0"
                              value={filters.observation_category_0}
                              onChange={handleInputChange}
                              className="form-control border-0 shadow-sm"
                            >
                              <option value="">Select Category</option>
                              {observationCategoryOptions.map((item) => (
                                <option key={item.observation_category_0} value={item.observation_category_0}>
                                  {item.observation_category_0}
                                </option>
                              ))}
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <td>Sub Observation Category</td>
                          <td>
                            <select
                              name="observation_category_1"
                              value={filters.observation_category_1}
                              onChange={handleInputChange}
                              className="form-control border-0 shadow-sm"
                            >
                              <option value="">Select Sub Category</option>
                              {subObservationCategoryOptions.map((item) => (
                                <option key={item.observation_category_1} value={item.observation_category_1}>
                                  {item.observation_category_1}
                                </option>
                              ))}
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <td>Jenis Tumbuhan</td>
                          <td>
                            <select
                              name="jenis_tumbuhan"
                              value={filters.jenis_tumbuhan}
                              onChange={handleInputChange}
                              className="form-control border-0 shadow-sm"
                            >
                              <option value="">Select Jenis Tumbuhan</option>
                              {jenisTumbuhanOptions.map((item) => (
                                <option key={item.jenis_tumbuhan} value={item.jenis_tumbuhan}>
                                  {item.jenis_tumbuhan}
                                </option>
                              ))}
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <td>Jenis Satwa</td>
                          <td>
                            <select
                              name="jenis_satwa"
                              value={filters.jenis_satwa}
                              onChange={handleInputChange}
                              className="form-control border-0 shadow-sm"
                            >
                              <option value="">Select Jenis Satwa</option>
                              {jenisSatwaOptions.map((item) => (
                                <option key={item.jenis_satwa} value={item.jenis_satwa}>
                                  {item.jenis_satwa}
                                </option>
                              ))}
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <td>Tipe Temuan</td>
                          <td>
                            <select
                              name="tipe_temuan"
                              value={filters.temuan}
                              onChange={handleInputChange}
                              className="form-control border-0 shadow-sm"
                            >
                              <option value="">Select Tipe Temuan</option>
                              {temuan.map((item) => (
                                <option key={item.tipe_temuan} value={item.tipe_temuan}>
                                  {item.tipe_temuan}
                                </option>
                              ))}
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <td>Tindakan Temuan</td>
                          <td>
                            <select
                              name="tindakan"
                              value={filters.tindakan}
                              onChange={handleInputChange}
                              className="form-control border-0 shadow-sm"
                            >
                              <option value="">Select Tindakan</option>
                              {tindakan.map((item) => (
                                <option key={item.tindakan} value={item.tindakan}>
                                  {item.tindakan}
                                </option>
                              ))}
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={2}>
                            <button
                              type="submit"
                              className="btn btn-md btn-primary border-0 shadow-sm w-100"
                            >
                              Filter
                            </button>
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