import BasePage from "layouts/base/basePage";
import AddLocation from "./add";
import locationTableData from "./data";
import EditFormLocation from "./edit";
import React from "react";
import ViewUser from "./view";
import { deleteLocationApi } from "./api";
import { deleteLocationSuccess, useLocationController } from "../../../context/locationContext";
import { LOCATIONS_TABLE_TITLE } from "../../../constants/app";

function Location(): React.ReactElement {
  // @ts-ignore
  const [locationController, locationDispatch] = useLocationController();
  return (
    <BasePage
      tableTitle={LOCATIONS_TABLE_TITLE}
      tableData={locationTableData}
      AddForm={({ handleClose, handleAfterAdd }) => AddLocation({ handleClose, handleAfterAdd })}
      EditForm={({ handleClose, item, handleAfterUpdate }) =>
        EditFormLocation({
          handleClose,
          location: item,
          handleAfterUpdate,
        })
      }
      ViewForm={({ handleClose, item }) => ViewUser({ handleClose, location: item })}
      deleteAction={{
        actionDelete: (id) => deleteLocationSuccess(locationDispatch, id),
        deleteApi: deleteLocationApi,
        filter: locationController.filter,
      }}
      optionFeature={{
        enableCreate: true,
        enableImport: false,
        enableExport: false,
      }}
    />
  );
}

export default Location;
