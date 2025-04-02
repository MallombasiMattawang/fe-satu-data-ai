//import useState and useEffect
import { useState, useEffect } from "react";

//import Link from react router dom
import { Link } from "react-router-dom";

//import api
import Api from "../../../services/Api";

//import js cookie
import Cookies from "js-cookie";

//import layout
import LayoutAdmin from "../../../layouts/Admin";

//import permissions
import hasAnyPermission from "../../../utils/Permissions";

//import pagination component
import Pagination from "../../../components/general/Pagination";

//import react-confirm-alert
import { confirmAlert } from "react-confirm-alert";

//import CSS react-confirm-alert
import "react-confirm-alert/src/react-confirm-alert.css";

//import toast
import toast from "react-hot-toast";

export default function TrakingTsl() {
    //title page
    document.title = "Traking Data TSL";

    //define state "patrolis"
    const [patrolis, setPatrolis] = useState([]);

    //define state "pagination"
    const [pagination, setPagination] = useState({
        currentPage: 0,
        perPage: 0,
        total: 0,
    });

    //define state "keywords"
    const [keywords, setKeywords] = useState("");

    //token from cookies
    const token = Cookies.get("token");

    //function fetchData
    const fetchData = async (pageNumber = 1, keywords = "") => {
        //define variable "page"
        const page = pageNumber ? pageNumber : pagination.currentPage;

        await Api.get(`/api/admin/patroli-rbm?search=${keywords}&page=${page}`, {
            //header
            headers: {
                //header Bearer + Token
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            //set data response to state "setPatrolis"
            setPatrolis(response.data.data.data);

            //set data pagination to state "pagination"
            setPagination(() => ({
                currentPage: response.data.data.current_page,
                perPage: response.data.data.per_page,
                total: response.data.data.total,
            }));
        });
    };

    //useEffect
    useEffect(() => {
        //call function "fetchData"
        fetchData();
    }, []);

    //function "searchData"
    const searchData = async (e) => {
        //set value to state "keywords"
        setKeywords(e.target.value);

        //call function "fetchData"
        fetchData(1, e.target.value);
    };

    //function "deletePost"
    const deletePost = (id) => {
        //show confirm alert
        confirmAlert({
            title: "Are You Sure ?",
            message: "want to delete this data ?",
            buttons: [
                {
                    label: "YES",
                    onClick: async () => {
                        await Api.delete(`/api/admin/patrolis/${id}`, {
                            //header
                            headers: {
                                //header Bearer + Token
                                Authorization: `Bearer ${token}`,
                            },
                        }).then((response) => {
                            //show toast
                            toast.success(response.data.message, {
                                position: "top-right",
                                duration: 4000,
                            });

                            //call function "fetchData"
                            fetchData();
                        });
                    },
                },
                {
                    label: "NO",
                    onClick: () => { },
                },
            ],
        });
    };

    return (
        <LayoutAdmin>
            <main>
                <div className="container-fluid mb-5 mt-5">
                    <h2 className="mb-4">
                        <i className="fa fa-map"></i> Traking Data TSL
                    </h2>
                    <div className="row">
                        <div className="col-md-8">
                            <div className="row">
                                <div className="col-md-9 col-12 mb-2">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control border-0 shadow-sm"
                                            onChange={(e) => searchData(e)}
                                            placeholder="search here..."
                                        />
                                        <span className="input-group-text border-0 shadow-sm">
                                            <i className="fa fa-search"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-1">
                        <div className="col-md-6">
                            <div className="card border-0 rounded shadow-sm border-top-success">
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-bordered table-centered mb-0 rounded">
                                            <thead className="thead-dark">
                                                <tr className="border-0">
                                                    <th className="border-0" style={{ width: "5%" }}>
                                                        No.
                                                    </th>
                                                    <th className="border-0">Tahun</th>
                                                    <th className="border-0" style={{ width: "20%" }}>
                                                        Patroli ID
                                                    </th>
                                                    <th className="border-0" style={{ width: "20%" }}>
                                                        Station/Resort
                                                    </th>
                                                    <th className="border-0" style={{ width: "20%" }}>
                                                        Leader
                                                    </th>
                                                    <th className="border-0" style={{ width: "20%" }}>
                                                        Mulai Patroli
                                                    </th>
                                                    <th className="border-0" style={{ width: "20%" }}>
                                                        Selesai Patroli
                                                    </th>
                                                    <th className="border-0" style={{ width: "20%" }}>
                                                        Durasi Patroli
                                                    </th>
                                                    <th className="border-0" style={{ width: "20%" }}>
                                                        Jumlah Titik
                                                    </th>
                                                    <th className="border-0" style={{ width: "15%" }}>
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    //cek apakah data ada
                                                    patrolis.length > 0 ? (
                                                        //looping data "categories" dengan "map"
                                                        patrolis.map((patroli, index) => (
                                                            <tr key={index}>
                                                                <td className="fw-bold text-center">
                                                                    {++index +
                                                                        (pagination.currentPage - 1) *
                                                                        pagination.perPage}
                                                                </td>
                                                                <td>{patroli.year}</td>
                                                                <td>{patroli.patrol_id}</td>
                                                                <td>{patroli.station}</td>
                                                                <td>{patroli.leader}</td>
                                                                <td>{new Date(patroli.patrol_start_date).toLocaleDateString("id-ID", { day: "2-digit", month: "2-digit", year: "numeric" })}</td>
                                                                <td>{new Date(patroli.patrol_end_date).toLocaleDateString("id-ID", { day: "2-digit", month: "2-digit", year: "numeric" })}</td>
                                                                <td>{patroli.total_patrol_duration} Hari</td>
                                                                <td>{patroli.patrol_count} Titik</td>
                                                                <td className="text-center">
                                                                    {hasAnyPermission(["users.edit"]) && (
                                                                        <Link
                                                                            to={`/admin/patroli-rbm/${patroli.patrol_id}/${patroli.year}`}
                                                                            className="btn btn-primary btn-sm me-2"
                                                                        >
                                                                            <i className="fa fa-pencil-alt"></i>
                                                                        </Link>
                                                                    )}

                                                                    {hasAnyPermission(["patrolis.delete"]) && (
                                                                        <button
                                                                            onClick={() => deletePost(patroli.id)}
                                                                            className="btn btn-danger btn-sm"
                                                                        >
                                                                            <i className="fa fa-trash"></i>
                                                                        </button>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        //tampilkan pesan data belum tersedia
                                                        <tr>
                                                            <td colSpan={5}>
                                                                <div
                                                                    className="alert alert-danger border-0 rounded shadow-sm w-100 text-center"
                                                                    role="alert"
                                                                >
                                                                    Data Belum Tersedia!.
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <Pagination
                                        currentPage={pagination.currentPage}
                                        perPage={pagination.perPage}
                                        total={pagination.total}
                                        onChange={(pageNumber) => fetchData(pageNumber, keywords)}
                                        position="end"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </LayoutAdmin>
    );
}