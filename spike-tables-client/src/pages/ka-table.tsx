/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { Table } from "ka-table";
import {
  DataType,
  EditingMode,
  FilteringMode,
  SortingMode,
} from "ka-table/enums";
import { useEffect, useState } from "react";
import { Course } from "../../types/types";
import { GET_DATA } from "../../queries/getFakeData";
import { useQuery } from "@apollo/client";

import "ka-table/style.scss";
import "../../style.scss";

export default function KaTablePage() {
  const [rowData, setRowData] = useState<Course[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  const { loading, error, data } = useQuery(GET_DATA);

  useEffect(() => {
    if (data) {
      setRowData(data.fakeData);
    }
  }, [data]);

  // if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1> Ka Table Page</h1>
      <Link to="/">Home</Link>
      <input
        type="search"
        value={searchText}
        onChange={(event) => {
          setSearchText(event.currentTarget.value);
        }}
        className="top-element"
      />
      <Table
        columns={[
          {
            key: "title",
            title: "Title",
            dataType: DataType.String,
            width: 250,
          },
          {
            key: "academicYearStart",
            title: "Academic Year Start",
            dataType: DataType.String,
            width: 150,
          },
          {
            key: "academicYearEnd",
            title: "Academic Year End",
            dataType: DataType.String,
          },
          { key: "language", title: "Language", dataType: DataType.String },
          {
            key: "owners",
            title: "Owners",
            dataType: DataType.Object,
          },
          {
            key: "courseCoordinator",
            title: "Course Coordinator",
            dataType: DataType.Object,
          },
          {
            key: "extraCourseCoordinators",
            title: "Extra Course Coordinators",
            dataType: DataType.Object,
          },
        ]}
        data={rowData}
        editingMode={EditingMode.Cell}
        rowKeyField={"id"}
        columnResizing={true}
        columnReordering={true}
        sortingMode={SortingMode.Single}
        filteringMode={FilteringMode.HeaderFilter}
        search={({ searchText: searchTextValue, rowData, column }) => {
          if (column.key === "language") {
            return (
              (searchTextValue === "NL" && !rowData.language) ||
              (searchTextValue === "EN" && rowData.language)
            );
          }
        }}
        virtualScrolling={{
          enabled: true,
        }}
        searchText={searchText}
        noData={{
          text: "No Data Found",
        }}
        groups={[{ columnKey: "language" }]}
        groupPanel={{
          enabled: true,
          text: "For grouping, drag a column here...",
        }}
        loading={{
          enabled: loading,
          text: "Loading data",
        }}
        paging={{
          enabled: false,
          pageSize: 20,
          pageIndex: 0,
        }}
        format={({ column, value }) => {
          if (
            column.key === "academicYearStart" ||
            column.key === "academicYearEnd"
          ) {
            return new Date(value * 1000).toLocaleString();
          }
          if (column.key === "owners") {
            return value.map((owner: any) => owner.displayName).join(", ");
          }
          if (column.key === "courseCoordinator") {
            return value.displayName;
          }
          if (column.key === "extraCourseCoordinators") {
            return value
              .map((coordinator: any) => coordinator.displayName)
              .join(", ");
          }
        }}
        childComponents={{
          headCell: {
            elementAttributes: (props) => {
              if (props.column.key === "title") {
                return {
                  style: {
                    ...props.column.style,
                    position: "sticky",
                    left: 0,
                    zIndex: 10,
                  },
                };
              }
            },
          },
          cell: {
            elementAttributes: (props) => {
              if (props.column.key === "title") {
                return {
                  style: {
                    ...props.column.style,
                    position: "sticky",
                    left: 0,
                    backgroundColor: "#eee",
                    color: "#333",
                  },
                };
              }
            },
          },
        }}
      />
    </div>
  );
}
