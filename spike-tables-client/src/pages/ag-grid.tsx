/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { GET_DATA } from "../../queries/getFakeData";

import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

import { AgGridReact } from "ag-grid-react"; // AG Grid Component
import { ColDef } from "ag-grid-community";
import { LicenseManager } from "@ag-grid-enterprise/core";

import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
import { ServerSideRowModelModule } from "@ag-grid-enterprise/server-side-row-model";

LicenseManager.setLicenseKey(
  "[TRIAL]_this_{AG_Charts_and_AG_Grid}_Enterprise_key_{AG-057526}_is_granted_for_evaluation_only___Use_in_production_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_purchasing_a_production_key_please_contact_info@ag-grid.com___You_are_granted_a_{Single_Application}_Developer_License_for_one_application_only___All_Front-End_JavaScript_developers_working_on_the_application_would_need_to_be_licensed___This_key_will_deactivate_on_{31 May 2024}____[v3]_[0102]_MTcxNzExMDAwMDAwMA==7248f424acb603bf964495a90204f0ef"
);

import { useEffect, useMemo, useState } from "react";

import { Course } from "../../types/types";

const CustomCell = ({ value }: { value: any }) => {
  return (
    <span
      style={{
        color: value === "EN" ? "green" : "red",
        fontWeight: value === "EN" ? "bold" : "normal",
      }}
    >
      {value}
    </span>
  );
};

export default function AgGridPage() {
  const { loading, error, data } = useQuery(GET_DATA);

  const [rowData, setRowData] = useState<Course[]>([]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState<ColDef<Course>[]>([
    {
      field: "title",
      filter: true,
      rowGroup: true,
      enableRowGroup: true,
      hide: true,
      // checkboxSelection: true,,
      headerCheckboxSelection: true,
      checkboxSelection: true,
    },
    {
      field: "academicYearStart",
      enableRowGroup: true,
      valueFormatter: (params) => {
        if (!params.value) return "";
        const date = new Date(params.value * 1000);
        return date.toLocaleString();
      },
    },
    {
      field: "academicYearEnd",
      enableRowGroup: true,
      valueFormatter: (params) => {
        if (!params.value) return "";
        const date = new Date(params.value * 1000);
        return date.toLocaleString();
      },
    },
    {
      field: "language",
      enableRowGroup: true,
      cellRenderer: CustomCell,
      rowGroup: true,
      hide: true,
      headerCheckboxSelection: true,
      checkboxSelection: true,
    },
    {
      field: "owners",
      enableRowGroup: true,
      valueFormatter: (params) => {
        if (!params.value) return "";
        return params.value.map((owner: any) => owner.displayName).join(", ");
      },
    },
    {
      field: "courseCoordinator",
      enableRowGroup: true,
      valueFormatter: (params) => {
        if (!params.value) return "";
        return params.value.displayName;
      },
    },
    {
      field: "extraCourseCoordinators",
      valueFormatter: (params) => {
        if (!params.value) return "";

        return params?.value
          .map((coordinator: any) => coordinator.displayName)
          .join(", ");
      },
    },
  ]);

  // Apply settings across all columns
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      filter: true,
      editable: true,
    };
  }, []);

  const autoGroupColumnDef = useMemo<ColDef>(() => {
    return {
      minWidth: 200,
    };
  }, []);

  useEffect(() => {
    if (data) {
      setRowData(data.fakeData);
    }
  }, [data]);

  const rowGroupPanelShow = "always";

  // if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1> Ag Grid Page</h1>
      <Link to="/">Home</Link>

      <div
        className="ag-theme-quartz" // applying the grid theme
        style={{ height: 500 }} // the grid will fill the size of the parent container
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          onCellValueChanged={(event) =>
            console.log(`New Cell Value: ${event.value}`)
          }
          rowSelection="multiple"
          modules={[ServerSideRowModelModule, RowGroupingModule]}
          autoGroupColumnDef={autoGroupColumnDef}
          // rowModelType={"serverSide"}
          rowGroupPanelShow={rowGroupPanelShow}
        />
      </div>
    </div>
  );
}
