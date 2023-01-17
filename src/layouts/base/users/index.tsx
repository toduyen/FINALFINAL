import usersTableData from "layouts/base/users/data";
import React from "react";
import AddUser from "./add";
import EditFormUser from "./edit";
import ViewUser from "./view";
import BasePage from "../basePage";
import { deleteUserApi } from "./api";
import { deleteUserSuccess, useUserController } from "../../../context/userContext";
import { FilterFormUser } from "./components/FilterFormUser";
import { USER_TABLE_TITLE } from "../../../constants/app";

function Users(): React.ReactElement {
  // @ts-ignore
  const [userController, userDispatch] = useUserController();
  return (
    <BasePage
      tableTitle={USER_TABLE_TITLE}
      tableData={usersTableData}
      AddForm={({ handleClose, handleAfterAdd }) => AddUser({ handleClose, handleAfterAdd })}
      EditForm={({ handleClose, item, handleAfterUpdate }) =>
        EditFormUser({
          handleClose,
          user: item,
          handleAfterUpdate,
        })
      }
      ViewForm={({ handleClose, item }) => ViewUser({ handleClose, user: item })}
      FilterForm={FilterFormUser}
      deleteAction={{
        actionDelete: (id) => deleteUserSuccess(userDispatch, id),
        deleteApi: deleteUserApi,
        filter: userController.filter,
      }}
      optionFeature={{
        enableCreate: true,
        enableExport: false,
        enableImport: false,
      }}
    />
  );
}

export default Users;
