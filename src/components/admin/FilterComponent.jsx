import React from "react";

const FilterComponent = ({
  filters = {},
  handleInputChange,
  handleSubmit,
  observationCategoryOptions = [],
  subObservationCategoryOptions = [],
  jenisTumbuhanOptions = [],
  jenisSatwaOptions = [],
}) => {
  return (
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
                    value={filters.year || ""}
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
                <td>Observation Category</td>
                <td>
                  <select
                    name="observation_category_0"
                    value={filters.observation_category_0 || ""}
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
                    value={filters.observation_category_1 || ""}
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
                    value={filters.jenis_tumbuhan || ""}
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
                    value={filters.jenis_satwa || ""}
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
                <td colSpan={2}>
                  <button type="submit" className="btn btn-md btn-primary border-0 shadow-sm w-100">
                    Filter
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default FilterComponent;