//import react router dom
import { Routes, Route, Navigate } from "react-router-dom";

//======================================================
// view admin
//======================================================

//import view login
import Login from "../views/auth/Login";
import Forbidden from "../views/auth/Forbidden";
import PrivateRoutes from "./PrivateRoutes";
import Dashboard from "../views/admin/dashboard/Index";
import NotFound from "../views/auth/NotFound";
import Register from "../views/auth/Register";
import TiketIndex from "../views/admin/Tikets/Index";
import TiketCreate from "../views/admin/Tikets/Create";
import Cetak from "../views/admin/Tikets/Cetak";
import TiketAll from "../views/admin/Tikets/All";
import TiketBooking from "../views/admin/Tikets/Booking";
import TiketEdit from "../views/admin/Tikets/Edit";
import LayanansIndex from "../views/admin/Layanans/Index";
import LayanansCreate from "../views/admin/Layanans/Create";
import LayanansEdit from "../views/admin/Layanans/Edit";
import HolidaysIndex from "../views/admin/Holidays/Index";
import HolidaysCreate from "../views/admin/Holidays/Create"
//import view permissions
import PermissionsIndex from "../views/admin/Permissions/Index";

//import view roles index
import RolesIndex from "../views/admin/Roles/Index";

//import view roles create
import RolesCreate from "../views/admin/Roles/Create";

//import view roles edit
import RolesEdit from "../views/admin/Roles/Edit";

//import view users index
import UsersIndex from "../views/admin/Users/Index";

//import view users create
import UsersCreate from "../views/admin/Users/Create";

//import view users edit
import UsersEdit from "../views/admin/Users/Edit";
import PintuMasukIndex from "../views/admin/PintuMasuk/Index";
import PintuMasukCreate from "../views/admin/PintuMasuk/Create";
import PintuMasukEdit from "../views/admin/PintuMasuk/Edit";

import DashboardRbm from "../views/admin/dashboard-rbm/Index";
import PatroliIndex from "../views/admin/patroli-rbm/Index";
import PatroliDetail from "../views/admin/patroli-rbm/Detail";
import MapsRbm from "../views/admin/dashboard-rbm/maps";
import MapComponent from "../views/admin/dashboard-rbm/sample";
import HeatMapsRbm from "../views/admin/dashboard-rbm/heatmaps";
import DashboardStation from "../views/admin/dashboard-rbm/station";
import ImportDbRbm from "../views/admin/ImportDb/ImportDbRbm";
import ImportDbWru from "../views/admin/ImportDb/ImportDbWru";
import DashboardWru from "../views/admin/dashboard-wru/Index";
import MapsWru from "../views/admin/dashboard-wru/mapsWru";
import DataKonflik from "../views/admin/dashboard-wru/dataKonflik";
import TrakingTsl from "../views/admin/dashboard-wru/TrackingTsl";
import KategoriAsetIndex from "../views/admin/dashboard-bmn//KategoriAsets/Index";
import KondisiAsetIndex from "../views/admin/dashboard-bmn//KondisiAsets/Index";
import StatusAsetIndex from "../views/admin/dashboard-bmn//StatusAsets/Index";
import LokasiAsetIndex from "../views/admin/dashboard-bmn//LokasiAsets/Index";
import AsetIndex from "../views/admin/dashboard-bmn//Asets/Index";
import AsetExpired from "../views/admin/dashboard-bmn//Asets/expired";
import LokasiAsetCreate from "../views/admin/dashboard-bmn//LokasiAsets/Create";
import LokasiAsetEdit from "../views/admin/dashboard-bmn//LokasiAsets/Edit";
import KategoriAsetCreate from "../views/admin/dashboard-bmn//KategoriAsets/Create";
import KategoriAsetEdit from "../views/admin/dashboard-bmn//KategoriAsets/Edit";
import KondisiAsetCreate from "../views/admin/dashboard-bmn//KondisiAsets/Create";
import KondisiAsetEdit from "../views/admin/dashboard-bmn//KondisiAsets/Edit";
import StatusAsetCreate from "../views/admin/dashboard-bmn//StatusAsets/Create";
import StatusAsetEdit from "../views/admin/dashboard-bmn//StatusAsets/Edit";
import AsetCreate from "../views/admin/dashboard-bmn//Asets/Create";
import AsetEdit from "../views/admin/dashboard-bmn//Asets/Edit";
import InspeksiAsetIndex from "../views/admin/dashboard-bmn//InspeksiAsets/Index";
import InspeksiAsetView from "../views/admin/dashboard-bmn//InspeksiAsets/View";
import AsetFilter from "../views/admin/dashboard-bmn//Asets/Filter";
import MasaAsetIndex from "../views/admin/dashboard-bmn//MasaAsets/Index";
import MasaAsetCreate from "../views/admin/dashboard-bmn//MasaAsets/Create";
import MasaAsetEdit from "../views/admin/dashboard-bmn//MasaAsets/Edit";
import DashboardBmn from "../views/admin/dashboard-bmn/Dashboard/Index";

export default function RoutesIndex() {
  return (
    <Routes>
      {/* route "/login" */}
      <Route path="/" element={<Login />} />

      {/* route "/login" */}
      <Route path="/login" element={<Login />} />

      {/* route "/register" */}
      <Route path="/register" element={<Register />} />

      {/* route "/forbidden" */}
      <Route path="/forbidden" element={<Forbidden />} />

      {/* route "/notfound" */}
      <Route path="/notfound" element={<NotFound />} />

      {/* private route "/admin/dashboard" */}
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoutes>
            <Dashboard />
          </PrivateRoutes>
        }
      />

      <Route
        path="/admin/sample"
        element={
          <PrivateRoutes>
            <MapComponent />
          </PrivateRoutes>
        }
      />
      {/* private route "/admin/dashboard-rbm" */}
      <Route
        path="/admin/dashboard-rbm"
        element={
          <PrivateRoutes>
            <DashboardRbm />
          </PrivateRoutes>
        }
      />
      {/* private route "/admin/maps-rbm" */}
      <Route
        path="/admin/maps-rbm"
        element={
          <PrivateRoutes>
            <MapsRbm />
          </PrivateRoutes>
        }
      />
      {/* private route "/admin/heatmaps-rbm" */}
      <Route
        path="/admin/heatmaps-rbm"
        element={
          <PrivateRoutes>
            <HeatMapsRbm />
          </PrivateRoutes>
        }
      />
      {/* private route "/admin/patroli-rbm" */}
      <Route
        path="/admin/patroli-rbm"
        element={
          <PrivateRoutes>
            <PatroliIndex />
          </PrivateRoutes>
        }
      />
      {/* private route "/admin/patroli-rbm/patrol_id/year" */}
      <Route
        path="/admin/patroli-rbm/:patrol_id/:year"
        element={
          <PrivateRoutes>
            <PatroliDetail />
          </PrivateRoutes>
        }
      />
      {/* private route "/admin/patroli-rbm-station/station" */}
      <Route
        path="/admin/patroli-rbm-station/:station"
        element={
          <PrivateRoutes>
            <DashboardStation />
          </PrivateRoutes>
        }
      />


      {/* private route "/admin/permissions" */}
      <Route
        path="/admin/permissions"
        element={
          <PrivateRoutes>
            <PermissionsIndex />
          </PrivateRoutes>
        }
      />

      {/* private route "/admin/roles" */}
      <Route
        path="/admin/roles"
        element={
          <PrivateRoutes>
            <RolesIndex />
          </PrivateRoutes>
        }
      />
      {/* private route "/admin/roles/create" */}
      <Route
        path="/admin/roles/create"
        element={
          <PrivateRoutes>
            <RolesCreate />
          </PrivateRoutes>
        }
      />

      {/* private route "/admin/roles/edit" */}
      <Route
        path="/admin/roles/edit/:id"
        element={
          <PrivateRoutes>
            <RolesEdit />
          </PrivateRoutes>
        }
      />

      {/* private route "/admin/users" */}
      <Route
        path="/admin/users"
        element={
          <PrivateRoutes>
            <UsersIndex />
          </PrivateRoutes>
        }
      />
      {/* private route "/admin/users/create" */}
      <Route
        path="/admin/users/create"
        element={
          <PrivateRoutes>
            <UsersCreate />
          </PrivateRoutes>
        }
      />

      {/* private route "/admin/users/edit" */}
      <Route
        path="/admin/users/edit/:id"
        element={
          <PrivateRoutes>
            <UsersEdit />
          </PrivateRoutes>
        }
      />


      {/* private route "/admin/import-db-rbm" */}
      <Route
        path="/admin/import-db-rbm"
        element={
          <PrivateRoutes>
            <ImportDbRbm />
          </PrivateRoutes>
        }
      />

      {/* private route "/admin/import-db-wru" */}
      <Route
        path="/admin/import-db-wru"
        element={
          <PrivateRoutes>
            <ImportDbWru />
          </PrivateRoutes>
        }
      />

      {/* private route "/admin/dashboard-wru" */}
      <Route
        path="/admin/dashboard-wru"
        element={
          <PrivateRoutes>
            <DashboardWru />
          </PrivateRoutes>
        }
      />

      {/* private route "/admin/maps-wru" */}
      <Route
        path="/admin/maps-wru"
        element={
          <PrivateRoutes>
            <MapsWru />
          </PrivateRoutes>
        }
      />

      {/* private route "/admin/traking-wru" */}
      <Route
        path="/admin/traking-wru"
        element={
          <PrivateRoutes>
            <TrakingTsl />
          </PrivateRoutes>
        }
      />


      {/* ############################################################  */}
      {/* private route "/admin/dashboard-bmn" */}
      <Route
        path="/admin/dashboard-bmn"
        element={
          <PrivateRoutes>
            <DashboardBmn />
          </PrivateRoutes>
        }
      />
      {/* private route "/admin/kategori-asets/" */}
      <Route
        path="/admin/kategori-asets"
        element={
          <PrivateRoutes>
            <KategoriAsetIndex />
          </PrivateRoutes>
        }
      />

      {/* private route "/admin/kondisi-asets/" */}
      <Route
        path="/admin/kondisi-asets"
        element={
          <PrivateRoutes>
            <KondisiAsetIndex />
          </PrivateRoutes>
        }
      />

      {/* private route "/admin/status-asets/" */}
      <Route
        path="/admin/status-asets"
        element={
          <PrivateRoutes>
            <StatusAsetIndex />
          </PrivateRoutes>
        }
      />

      {/* private route "/admin/lokasi-asets/" */}
      <Route
        path="/admin/lokasi-asets"
        element={
          <PrivateRoutes>
            <LokasiAsetIndex />
          </PrivateRoutes>
        }
      />

      {/* private route "/admin/asets/" */}
      <Route
        path="/admin/asets"
        element={
          <PrivateRoutes>
            <AsetIndex />
          </PrivateRoutes>
        }
      />
      {/* private route "/admin/asets-expired/" */}
      <Route
        path="/admin/asets-expired"
        element={
          <PrivateRoutes>
            <AsetExpired />
          </PrivateRoutes>
        }
      />
      {/* private route "/admin/lokasi-asets/create" */}
      <Route
        path="/admin/lokasi-asets/create"
        element={
          <PrivateRoutes>
            <LokasiAsetCreate />
          </PrivateRoutes>
        }
      />
      {/* private route "/admin/lokasi-asets/edit/:id" */}
      <Route
        path="/admin/lokasi-asets/edit/:id"
        element={
          <PrivateRoutes>
            <LokasiAsetEdit />
          </PrivateRoutes>
        }
      />
      {/* private route "/admin/kategori-asets/create" */}
      <Route
        path="/admin/kategori-asets/create"
        element={
          <PrivateRoutes>
            <KategoriAsetCreate />
          </PrivateRoutes>
        }
      />
      {/* private route "/admin/kategori-asets/edit/:id" */}
      <Route
        path="/admin/kategori-asets/edit/:id"
        element={
          <PrivateRoutes>
            <KategoriAsetEdit />
          </PrivateRoutes>
        }
      />
      {/* private route "/admin/kondisi-asets/create" */}
      <Route
        path="/admin/kondisi-asets/create"
        element={
          <PrivateRoutes>
            <KondisiAsetCreate />
          </PrivateRoutes>
        }
      />
      {/* private route "/admin/kondisi-asets/edit/:id" */}
      <Route
        path="/admin/kondisi-asets/edit/:id"
        element={
          <PrivateRoutes>
            <KondisiAsetEdit />
          </PrivateRoutes>
        }
      />
      {/* private route "/admin/status-asets/create" */}
      <Route
        path="/admin/status-asets/create"
        element={
          <PrivateRoutes>
            <StatusAsetCreate />
          </PrivateRoutes>
        }
      />
      {/* private route "/admin/status-asets/edit/:id" */}
      <Route
        path="/admin/status-asets/edit/:id"
        element={
          <PrivateRoutes>
            <StatusAsetEdit />
          </PrivateRoutes>
        }
      />
      {/* private route "/admin/asets" */}
      <Route
        path="/admin/asets"
        element={
          <PrivateRoutes>
            <AsetIndex />
          </PrivateRoutes>
        }
      />
      {/* private route "/admin/asets/create" */}
      <Route
        path="/admin/asets/create"
        element={
          <PrivateRoutes>
            <AsetCreate />
          </PrivateRoutes>
        }
      />
      {/* private route "/admin/asets/edit/:id" */}
      <Route
        path="/admin/asets/edit/:id"
        element={
          <PrivateRoutes>
            <AsetEdit />
          </PrivateRoutes>
        }
      />

      {/* private route "/admin/inspeksi-asets/" */}
      <Route
        path="/admin/inspeksi-asets"
        element={
          <PrivateRoutes>
            <InspeksiAsetIndex />
          </PrivateRoutes>
        }
      />

      {/* private route "/admin/inspeksi-asets/view/:tanggal_inspeksi" */}
      <Route
        path="/admin/inspeksi-asets/view/:tanggal_inspeksi"
        element={
          <PrivateRoutes>
            <InspeksiAsetView />
          </PrivateRoutes>
        }
      />

      {/* private route "/admin/asets/filter/:kategori" */}
      <Route
        path="/admin/asets/filter"
        element={
          <PrivateRoutes>
            <AsetFilter />
          </PrivateRoutes>
        }
      />

      {/* private route "/admin/asets/masa-asets*/}
      <Route
        path="/admin/masa-asets"
        element={
          <PrivateRoutes>
            <MasaAsetIndex />
          </PrivateRoutes>
        }
      />
      {/* private route "/admin/asets/masa-asets/create*/}
      <Route
        path="/admin/masa-asets/create"
        element={
          <PrivateRoutes>
            <MasaAsetCreate />
          </PrivateRoutes>
        }
      />
      {/* private route "/admin/masa-asets/edit/:id" */}
      <Route
        path="/admin/masa-asets/edit/:id"
        element={
          <PrivateRoutes>
            <MasaAsetEdit />
          </PrivateRoutes>
        }
      />





      {/* wildcard route to redirect to forbidden */}
      <Route path="*" element={<Navigate to="/notfound" replace />} />
    </Routes>
  );
}