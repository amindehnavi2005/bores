import React, { useState } from "react";
import { Box } from "@mui/material";
import {
    MRT_ShowHideColumnsButton,
    MRT_ToggleFiltersButton,
    MRT_ToggleFullScreenButton,
    MRT_ToggleGlobalFilterButton,
    useMaterialReactTable,
} from "material-react-table";
import { MRT_Localization_FA } from "material-react-table/locales/fa";

const useCustomTable = (columns, data, { isLoading = false, onDownloadCsv, ...options } = {}) => {

    const tableConfig = {
        muiTablePaperProps: {
            elevation: 0,
            sx: {
                borderRadius: "0.5rem",
                border: "1px solid",
                borderColor: "#e0e0e0",
            },
        },
        state: {
            isLoading: isLoading,
            showSkeletons: isLoading,
            showProgressBars: isLoading,
        },
        enableSelectAll: false,
        enableRowSelection: false,
        enableColumnSelection: false,
        columnResizeDirection: "rtl",
        localization: MRT_Localization_FA,
        muiTablePaginationProps: {
            rowsPerPageOptions: [10, 20, 50, 100],
            labelRowsPerPage: "تعداد در صفحه",
            labelDisplayedRows: ({ from, to, count }) => `${from}-${to} از ${count}`,
        },
        initialState: {
            density: "compact",
            showColumnFilters: false,
        },
        renderToolbarInternalActions: ({ table }) => (
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                <MRT_ToggleGlobalFilterButton table={table} />
                <MRT_ToggleFiltersButton table={table} />
                <MRT_ShowHideColumnsButton table={table} />
                <MRT_ToggleFullScreenButton table={table} />
            </Box>
        ),
        renderEmptyRowsFallback: () => (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    color: "text.secondary",
                    padding: "25px",
                }}
            >
                <img src="/images/icons/no-results.svg" alt="داده ای وجود ندارد" className={"h-36"} />
                <div>هیچ داده‌ای جهت نمایش وجود ندارد</div>
            </Box>
        ),
        muiSkeletonProps: {
            animation: "wave",
            height: 28,
        },
        muiLinearProgressProps: {
            color: "primary",
        },
        muiCircularProgressProps: {
            color: "secondary",
        },
        muiTableHeadCellProps: {
            align: "center",
        },
        muiPaginationProps: {
            color: "primary",
            shape: "rounded",
            showRowsPerPage: true,
            variant: "outlined",
            sx: {
                button: {
                    borderRadius: "50%",
                },
            },
        },
        paginationDisplayMode: "pages",
        muiTableBodyCellProps: {
            className: "bg-backgroundPaper",
            sx: {
                textAlign: "center",
                padding: "2px 8px",
                lineHeight: "1",
            },
        },
        // onGlobalFilterChange: (globalFilter) => {
        //   setGlobalFilter(globalFilter);
        // },
    };

    return useMaterialReactTable({
        columns,
        data,
        ...tableConfig,
        ...options,
    });
};

export default useCustomTable;