// CustomDataTable.jsx
import React from "react";
import DataTable from "react-data-table-component";
import { customDataTableStyles } from "../../utils/datatableStyle";

const CustomDataTable = ({
  columns,
  data,
  totalRows,
  handlePageChange,
  handlePerPageChange,
  handleSort,
  loading
}) => {
  return (
    <DataTable
      columns={columns}
      data={data}
      pagination
      paginationServer
      paginationTotalRows={totalRows}
      onChangePage={handlePageChange}
      onChangeRowsPerPage={handlePerPageChange}
      onSort={handleSort}
      progressPending={loading}
      highlightOnHover
      sortServer
      customStyles={customDataTableStyles}
      className="!overflow-x-clip !overflow-y-visible"
    />
  );
};

export default CustomDataTable;
