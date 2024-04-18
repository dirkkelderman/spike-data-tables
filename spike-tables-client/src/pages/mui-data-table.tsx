/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@apollo/client";
import { GET_DATA } from "../../queries/getFakeData";
import { useEffect, useState } from "react";
import { Course } from "../../types/types";
import {
  GridRowParams,
  GridActionsCellItem,
  DataGridPremium,
} from "@mui/x-data-grid-premium";

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

export default function MuiDataTablePage() {
  const [rowData, setRowData] = useState<Course[]>([]);
  const { loading, error, data } = useQuery(GET_DATA);

  const columns: GridColDef<Course>[] = [
    {
      field: "title",
      headerName: "Title",
    },
    {
      field: "academicYearStart",
      headerName: "Academic Year Start",
      valueGetter: (value) => {
        if (!value) {
          return value;
        }
        const date = new Date(value * 1000);
        return date.toLocaleString();
      },
    },
    {
      field: "academicYearEnd",
      headerName: "Academic Year End",
      type: "dateTime",
      valueGetter: (value) => value && new Date(value * 1000),

      //   valueGetter: (value) => {
      //     if (!value) {
      //       return value;
      //     }
      //     const date = new Date(value * 1000);
      //     return date.toLocaleString();
      //   },
    },
    {
      field: "language",
      headerName: "Language",
      renderCell(params) {
        return <CustomCell value={params.value} />;
      },
    },
    {
      field: "owners",
      headerName: "Owners",
      valueGetter: (value: any) => {
        if (!value) {
          return value;
        }
        return value.map((owner: any) => owner.displayName).join(", ");
      },
    },
    {
      field: "courseCoordinator",
      headerName: "Course Coordinator",
      valueGetter: (value) => {
        if (!value) {
          return value;
        }
        return (value as any).displayName;
      },
    },
    {
      field: "extraCourseCoordinators",
      headerName: "Extra Course Coordinators",
      valueGetter: (value: any) => {
        if (!value) {
          return value;
        }
        return value
          .map((coordinator: any) => coordinator.displayName)
          .join(", ");
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          onClick={() => console.log("Delete")}
          label="Delete"
          showInMenu
        />,
        <GridActionsCellItem
          onClick={() => console.log("Print", params)}
          label="Print"
          showInMenu
        />,
      ],
    },
  ];

  useEffect(() => {
    if (data) {
      setRowData(data.fakeData);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Link to="/">Home</Link>
      <h1> MUI Data Table Page</h1>
      <div style={{ height: 700, width: "100%", backgroundColor: "white" }}>
        <DataGridPremium
          rows={rowData}
          columns={columns}
          initialState={{
            rowGrouping: {
              model: ["title", "academicYearStart"],
            },
          }}
          rowGroupingColumnMode="multiple"
        />
      </div>
    </div>
  );
}
