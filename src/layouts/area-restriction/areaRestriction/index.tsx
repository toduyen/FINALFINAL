import BasePage from "layouts/base/basePage";
import React from "react";
import AddAreaRestriction from "./add";
import areaRestrictionTableData from "./data";
import EditFormAreaRestriction from "./edit";
import ViewAreaRestriction from "./view";
import { handleDeleteApi } from "./api";
import {
  deleteAreaRestrictionSuccess,
  useAreaRestrictionController,
} from "../../../context/areaRestrictionContext";
import SettingFormAreaRestriction from "./setting";
import { AREA_RESTRICTION_TABLE_TITLE } from "../../../constants/app";

function AreaRestriction(): React.ReactElement {
  // @ts-ignore
  const [areaRestrictionController, areaRestrictionDispatch] = useAreaRestrictionController();
  return (
    <BasePage
      tableTitle={AREA_RESTRICTION_TABLE_TITLE}
      tableData={areaRestrictionTableData}
      AddForm={({ handleClose, handleAfterAdd }) => AddAreaRestriction({ handleClose, handleAfterAdd })}
      EditForm={({ handleClose, item, handleAfterUpdate }) =>
        EditFormAreaRestriction({ handleClose, areaRestriction: item, handleAfterUpdate })
      }
      ViewForm={({ handleClose, item }) =>
        ViewAreaRestriction({ handleClose, areaRestriction: item })
      }
      SettingForm={({ handleClose, item }) =>
        SettingFormAreaRestriction({ handleClose, areaRestriction: item })
      }
      deleteAction={{
        actionDelete: (id) => deleteAreaRestrictionSuccess(areaRestrictionDispatch, id),
        deleteApi: handleDeleteApi,
        filter: areaRestrictionController.filter,
      }}
      optionFeature={{
        enableCreate: true,
        enableExport: false,
        enableImport: false,
      }}
    />
  );
}

export default AreaRestriction;
