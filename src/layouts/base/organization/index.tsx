import React from "react";
import AddOrganization from "./add";
import organizationTableData from "./data";
import EditFormOrganization from "./edit";
import ViewOrganization from "./view";
import BasePage from "../basePage";
import { deleteOrganizationApi } from "./api";
import {
  deleteOrganizationSuccess,
  useOrganizationController,
} from "../../../context/organizationContext";
import { ORGANIZATION_TABLE_TITLE } from "../../../constants/app";
// @ts-ignore
import FilterFormOrganization from "./components/FilterForm";

function Organizations(): React.ReactElement {
  // @ts-ignore
  const [organizationController, organizationDispatch] = useOrganizationController();
  return (
    <BasePage
      tableTitle={ORGANIZATION_TABLE_TITLE}
      tableData={organizationTableData}
      AddForm={({ handleClose, handleAfterAdd }) =>
        AddOrganization({ handleClose, handleAfterAdd })
      }
      EditForm={({ handleClose, item, handleAfterUpdate }) =>
        EditFormOrganization({ handleClose, organization: item, handleAfterUpdate })
      }
      ViewForm={({ handleClose, item }) => ViewOrganization({ handleClose, organization: item })}
      deleteAction={{
        actionDelete: (id) => deleteOrganizationSuccess(organizationDispatch, id),
        deleteApi: deleteOrganizationApi,
        filter: organizationController.filter,
      }}
      FilterForm={FilterFormOrganization}
      optionFeature={{
        enableCreate: true,
        enableImport: false,
        enableExport: false,
      }}
    />
  );
}

export default Organizations;
