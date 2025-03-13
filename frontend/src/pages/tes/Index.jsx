import React from "react";
import DataTable from "react-data-table-component";

export default function TesIndex() {
  const data = Array.from({ length: 1 }, (_, index) => ({
    id: index + 1,
    name: `Item ${index + 1}`
  }));

  const columns = [
    { name: "ID", selector: row => row.id, sortable: true },
    { name: "Name", selector: row => row.name, sortable: true },
    {
      name: "Actions",
      cell: row => <a>aaa</a>
    }
  ];

  const handleEdit = row => {
    alert(`Edit ${row.name}`);
  };

  const handleDelete = row => {
    alert(`Delete ${row.name}`);
  };

  return (
    <div>
      <h1>Tes</h1>
      <DataTable title="Data Table" columns={columns} data={data} />
    </div>
  );
}
