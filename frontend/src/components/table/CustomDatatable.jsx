import React from "react";
import { Table } from "antd";

export default function CustomDatatable({ dataSource, columns, loading, tableState, setTableState, total }) {
  const paginationProps = {
    current: tableState.page,
    pageSize: tableState.perPage,
    total: total,
    pageSizeOptions: ['10', '20', '50'],
    showSizeChanger: true, 
    showTotal: (total, [start, end]) => `Showing ${start} to ${end} of ${total} entries`,
  };

  function handleTableChange(page, filters, sorterData) {
    const isSortingOrSortOrderChanged =
          sorterData.column.columnKey !== tableState.sortColumn ||
          sorterData.order !== tableState.sortOrder;
      
    setTableState({
        page: isSortingOrSortOrderChanged? 1 : page.current,
        perPage: page.pageSize,
        sortColumn:  sorterData.column? sorterData.column.columnKey : 1,
        sortOrder: sorterData.order? sorterData.order : 'descend'
    });
  };

  return (
    <>
      <Table
          dataSource={dataSource}
          onChange={handleTableChange}
          columns={columns}
          pagination={paginationProps}
          loading={loading}
          rowKey="id"
          scroll={{ x: 'max-content', y:'auto' }}
      />
    </>
  )
}


