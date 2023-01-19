import { useRef, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import data from "../data/near-earth-asteroids.json";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "../assets/styles.css"

const dateFormatter = (params:any):string => {
  const dateAsString = params.value;
  const dateObject = new Date(dateAsString);
  const options = { year: 'numeric', month: 'short', day: 'numeric' } as const;
  return dateObject.toLocaleDateString('en-US', options);
};

const yesNoFormatter = (params:any): string => {
  const { value } = params;
  let displayValue = '';
  if (value === 'Y'){
    displayValue = 'Yes';
  } else if (value === 'N') {
    displayValue = 'No';
  }
  return displayValue;
}

const defaultColDef: ColDef<{}> = {
  sortable: true,
};

const columnDefs: ColDef[] = [
  {
    field: "designation",
    headerName: "Designation",
    filter: 'agTextColumnFilter',
    filterParams: {
      buttons: ['reset', 'apply'],
      closeOnApply: true,
    },
  },
  {
    field: "discovery_date",
    headerName: "Discovery Date",
    filter: 'agDateColumnFilter',
    filterParams: {
      comparator: (filterLocalDateAtMidnight:any, cellValue:any) => {
        const dateAsString = cellValue;
        if (dateAsString === null) {
          return -1;
        }
        const cellDate = new Date(dateAsString);
        if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
          return 0;
        }
        if (cellDate < filterLocalDateAtMidnight) {
          return -1;
        }
        if (cellDate > filterLocalDateAtMidnight) {
          return 1;
        }
        return 0;
      },
      buttons: ['reset', 'apply'],
      closeOnApply: true,
    },
    valueFormatter: dateFormatter,
  },
  {
    field: "h_mag",
    headerName: "H (mag)",
    filter: 'agNumberColumnFilter',
    filterParams: {
      buttons: ['reset', 'apply'],
      closeOnApply: true,
    },
  },
  {
    field: "moid_au",
    headerName: "MOID (au)",
    filter: 'agNumberColumnFilter',
    filterParams: {
      buttons: ['reset', 'apply'],
      closeOnApply: true,
    },
  },
  {
    field: "q_au_1",
    headerName: "q (au)",
    filter: 'agNumberColumnFilter',
    filterParams: {
      buttons: ['reset', 'apply'],
      closeOnApply: true,
    },
  },
  {
    field: "q_au_2",
    headerName: "Q (au)",
    filter: 'agNumberColumnFilter',
    filterParams: {
      buttons: ['reset', 'apply'],
      closeOnApply: true,
    },
  },
  {
    field: "period_yr",
    headerName: "Period (yr)",
    filter: 'agNumberColumnFilter',
    filterParams: {
      buttons: ['reset', 'apply'],
      closeOnApply: true,
    },
  },
  {
    field: "i_deg",
    headerName: "Inclination (deg)",
    filter: 'agNumberColumnFilter',
    filterParams: {
      buttons: ['reset', 'apply'],
      closeOnApply: true,
    },
  },
  {
    field: "pha",
    headerName: "Potentially Hazardous",
    filter: 'agTextColumnFilter',
    filterParams: {
      buttons: ['reset', 'apply'],
      closeOnApply: true,
    },
    valueFormatter: yesNoFormatter
  },
  {
    field: "orbit_class",
    headerName: "Orbit Class",
    enableRowGroup: true,
    filter: 'agTextColumnFilter',
    filterParams: {
      buttons: ['reset', 'apply'],
      closeOnApply: true,
    },
  },
];

const NeoGrid = (): JSX.Element => {
  const gridRef = useRef<any>();

  const clearFilters = useCallback(() => {
    // Clear filters
    gridRef.current.api.setFilterModel(null);
    // Clear sorters
    gridRef.current.columnApi.applyColumnState({
      defaultState: { sort: null },
    });
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ height: 900, width: 1920 }}>
      <div className="header-container">
        <h1>Near-Earth Object Overview</h1>
        <button
          className="btn"
          onClick={clearFilters}
        >
          Clear Filters and Sorters
        </button>
      </div>
      <AgGridReact
        ref={gridRef}
        rowData={data}
        defaultColDef={defaultColDef}
        columnDefs={columnDefs}
        enableRangeSelection
        rowGroupPanelShow="always"
      />
    </div>
  );
};

export default NeoGrid;
