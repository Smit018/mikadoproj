// src/AdvancedDataTable.js

import React, { useMemo, useState } from 'react';
import {MaterialReactTable,useMaterialReactTable,MRT_TableInstance,
MRT_ColumnDef,
MRT_SortingState,
MRT_FilterState} from 'material-react-table';
import { data } from './data';
import { Box, Button, IconButton, Drawer } from '@mui/material';
import { FilterList, ViewColumn, Sort, Group } from '@mui/icons-material';
import {  FormControlLabel, Checkbox, TextField, Typography, Pagination } from '@mui/material';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getGroupedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
} from '@tanstack/react-table';
import {
  createColumnHelper,
  filterFns,
  sortingFns,
} from '@tanstack/table-core';

const AdvancedDataTable = () => {
  const [openDrawer, setOpenDrawer] = useState(null);

  const columns = useMemo(() => [
    {
      accessorKey: 'id',
      header: 'ID',
      enableSorting: true,
    },
    {
      accessorKey: 'name',
      header: 'Name',
      enableSorting: true,
      filterFn: filterFns.fuzzy,
    },
    {
      accessorKey: 'category',
      header: 'Category',
      enableSorting: true,
      filterFn: filterFns.includesString,
    },
    {
      accessorKey: 'subcategory',
      header: 'Subcategory',
      enableSorting: true,
      filterFn: filterFns.includesString,
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At',
      enableSorting: true,
      cell: info => new Date(info.getValue()).toLocaleString(),
    },
    {
      accessorKey: 'updatedAt',
      header: 'Updated At',
      enableSorting: true,
      cell: info => new Date(info.getValue()).toLocaleString(),
    },
    {
      accessorKey: 'price',
      header: 'Price',
      enableSorting: true,
      filterFn: filterFns.between,
    },
    {
      accessorKey: 'sale_price',
      header: 'Sale Price',
      enableSorting: true,
      filterFn: filterFns.between,
    },
  ], []);
  
  console.log(data);

  const table = useMaterialReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    enableColumnOrdering: true, //enable some features
    enableRowSelection: true,
    enablePagination: true, //disable a default feature
    // initialState: { pagination: { pageSize: 10, pageIndex: 2 } },
  });

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <IconButton onClick={() => setOpenDrawer('filter')}>
          <FilterList />
        </IconButton>
        <IconButton onClick={() => setOpenDrawer('columnVisibility')}>
          <ViewColumn />
        </IconButton>
        <IconButton onClick={() => setOpenDrawer('sort')}>
          <Sort />
        </IconButton>
        <IconButton onClick={() => setOpenDrawer('group')}>
          <Group />
        </IconButton>
      </Box>

      <MaterialReactTable table={table} />

      <Drawer
        anchor="right"
        open={Boolean(openDrawer)}
        onClose={() => setOpenDrawer(null)}
      >
      // src/AdvancedDataTable.js (inside Drawer component)

      {openDrawer === 'filter' && (
        <Box p={2} width={300}>
          {table.getAllLeafColumns().map(column => (
            <Box key={column.id} mb={2}>
              <Typography variant="subtitle1">{column.columnDef.header}</Typography>
              <TextField
                variant="outlined"
                fullWidth
                placeholder={`Filter ${column.columnDef.header}`}
                value={column.getFilterValue() || ''}
                onChange={e => column.setFilterValue(e.target.value)}
              />
            </Box>
          ))}
        </Box>
      )}
      
        {openDrawer === 'columnVisibility' && (
          <Box p={2} width={300}>
          {table.getAllLeafColumns().map(column => (
            <FormControlLabel
              key={column.id}
              control={
                <Checkbox
                  checked={column.getIsVisible()}
                  onChange={() => column.toggleVisibility()}
                />
              }
              label={column.columnDef.header}
            />
          ))}
          </Box>
        )}
        {openDrawer === 'sort' && (
          <Box p={2} width={300}>
          {table.getAllLeafColumns().map(column => (
          <Box key={column.id} mb={2}>
          <Typography variant="subtitle1">{column.columnDef.header}</Typography>
          <Button onClick={() => column.toggleSorting('asc')}>
            Sort Asc
          </Button>
          <Button onClick={() => column.toggleSorting('desc')}>
            Sort Desc
          </Button>
          <Button onClick={() => column.clearSorting()}>
            Clear Sorting
          </Button>
        </Box>
      ))}
          </Box>
        )}
        {openDrawer === 'group' && (
          <Box p={2} width={300}>
            {/* Implement Grouping Controls Here */}
          </Box>
        )}
      </Drawer>
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={table.getPageCount()}
          page={table.getState().pagination.pageIndex + 1}
          onChange={(event, value) => table.setPageIndex(value - 1)}
        />
      </Box>
    </Box>
  );
};

export default AdvancedDataTable;
