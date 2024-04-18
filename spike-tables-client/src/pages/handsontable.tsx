/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from "react-router-dom";
import "handsontable/dist/handsontable.full.min.css";

import { registerRenderer, textRenderer } from "handsontable/renderers";
import { registerAllModules } from "handsontable/registry";
import { HotTable } from "@handsontable/react";
import { useQuery } from "@apollo/client";
import { GET_DATA } from "../../queries/getFakeData";
import { useEffect, useState } from "react";

registerAllModules();

export default function HandsontablePage() {
  const [dataForTable, setDataForTable] = useState([]); // data is an array of objects [{}, {}, {}
  const { loading, error, data } = useQuery(GET_DATA);

  useEffect(() => {
    if (data) {
      setDataForTable(data.fakeData);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const arrayForSort = [...dataForTable];

  function firstRowRenderer(
    instance: any,
    td: { style: { fontWeight: string; color: string; background: string } },
    row: any,
    col: any,
    prop: any,
    value: any,
    cellProperties: any
  ) {
    textRenderer.apply(this, arguments);
    td.style.fontWeight = "bold";
    td.style.color = "green";
    td.style.background = "#CEC";
  }

  function ownersRenderer(
    instance: any,
    td: {
      style: { fontWeight: string; color: string; background: string };
      innerHTML: any;
    },
    row: any,
    col: any,
    prop: any,
    value: any[],
    cellProperties: any
  ) {
    textRenderer.apply(this, arguments);

    if (!value) {
      return;
    }

    td.style.fontWeight = "bold";
    td.style.color = "green";
    td.style.background = "#CEC";

    td.innerHTML = value.map(
      (owner: { displayName: any }) => owner.displayName
    );
  }

  function extraCourseCoordinatorsRenderer(
    instance: any,
    td: {
      style: { fontWeight: string; color: string; background: string };
      innerHTML: any;
    },
    row: any,
    col: any,
    prop: any,
    value: { displayName: any }[],
    cellProperties: any
  ) {
    textRenderer.apply(this, arguments);

    if (!value) {
      return;
    }

    td.style.fontWeight = "bold";
    td.style.color = "green";
    td.style.background = "#CEC";

    td.innerHTML = value[0].displayName;
  }

  return (
    <div>
      <h1> Handsontable </h1>
      <Link to="/">Back to Home</Link>

      <HotTable
        data={arrayForSort}
        height="100vh"
        width="100%"
        rowHeights={23}
        colWidths={100}
        colHeaders={[
          "Title",
          "Academic Year Start",
          "Academic Year End",
          "Language",
          "Owners",
          "Course Coordinator",
          "Extra Course Coordinators",
        ]}
        minSpareRows={1}
        autoWrapRow={true}
        autoWrapCol={true}
        licenseKey="non-commercial-and-evaluation"
        manualColumnMove={true}
        manualColumnResize={true}
        // enable filtering
        filters={true}
        // enable the column menu
        dropdownMenu={true}
        columns={[
          { data: "title" },
          { data: "academicYearStart" },
          { data: "academicYearEnd" },
          { data: "language" },
          { data: "owners", renderer: ownersRenderer },
          { data: "courseCoordinator" },
          {
            data: "extraCourseCoordinators",
            renderer: extraCourseCoordinatorsRenderer,
          },
        ]}
      />
    </div>
  );
}
