// Material Dashboard 2 React components
import { Role } from "models/base/role";
import React, { useCallback, useEffect, useState } from "react";
// @ts-ignore
import MDBox from "components/bases/MDBox";

import { getAllRoleApi, getAllUserApi, reSendCodeUserApi } from "layouts/base/users/api";
import { User } from "models/base/user";
import { getAllOrganizationApi } from "../../organization/api";
import { useAuthenController } from "../../../../context/authenContext";
import {
  getAllUserSuccess,
  updateFilterUser,
  useUserController,
} from "../../../../context/userContext";
import { getAllRoleSuccess, useRoleController } from "../../../../context/roleContext";
import {
  getAllOrganizationSuccess,
  useOrganizationController,
} from "../../../../context/organizationContext";
import RowAction from "../../../../components/customizes/Tables/RowAction";
import { convertStatusToString } from "utils/helpers";
import { showSnackbar, useSnackbarController } from "context/snackbarContext";
import {
  ERROR_TYPE,
  SEND_CODE_SUCCESS,
  STRING_LONG_LENGTH,
  STRING_SHORT_LENGTH,
  SUCCESS_TYPE,
} from "constants/app";
import { AcionType } from "../../../../types/actionType";
import convertEllipsisCharacter from "../../../../components/customizes/ConvertEllipsisCharacter";
import { isSuperAdmin, isSuperAdminOrganization } from "../../../../utils/checkRoles";
import { initUserFilter, UserFilterType } from "../../../../types/filterType";

export default function data({ handleView, handleEdit, handleDelete }: AcionType) {
  const [userDatas, setUserDatas] = useState([]);
  // @ts-ignore
  const [authController] = useAuthenController();
  // @ts-ignore
  const [userController, userDispatch] = useUserController();
  // @ts-ignore
  const [roleController, roleDispatch] = useRoleController();
  // @ts-ignore
  const [, organizationDispatch] = useOrganizationController();
  // @ts-ignore
  const [, snackbarDispatch] = useSnackbarController();

  const [pageCount, setPageCount] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  const [token, setToken] = useState(null);
  const [filter, setFilter] = useState<UserFilterType>(initUserFilter);
  const isChangeFormFilter = () =>
    userController.filter.status !== filter.status ||
    userController.filter.roleName !== filter.roleName;

  useEffect(() => {
    if (isChangeFormFilter()) {
      setFilter(userController.filter);
    }
  }, [userController.filter]);

  const convertStatus = () => {
    if (userController.filter.status === "???? x??a") {
      return "deleted";
    }
    if (userController.filter.status === "??ang ho???t ?????ng") {
      return "active";
    }
    if (userController.filter.status === "??ang ch??? x??c nh???n") {
      return "pending";
    }
    return "";
  };

  useEffect(
    () => () => {
      getAllUserSuccess(userDispatch, []);
      updateFilterUser(userDispatch, initUserFilter);
    },
    []
  );

  useEffect(() => {
    if (token !== authController.token) {
      setToken(authController.token);
    }
  }, [authController.token]);

  const fetchData = useCallback(
    // eslint-disable-next-line no-shadow
    async ({ page, size, search }) => {
      if (token) {
        const roleNames = userController.filter.roleName
          ? filter?.roleName
            ? filter?.roleName
            : ""
          : "";
        const getAllUserResponse = await getAllUserApi({
          token,
          status: convertStatus(),
          page,
          size,
          search,
          roleNames,
        });
        if (getAllUserResponse.data !== null) {
          if (getAllUserResponse.data.data.length === 0 && getAllUserResponse.data.itemCount > 0) {
            await fetchData({ page: page - 1, size, search });
          } else {
            getAllUserSuccess(userDispatch, getAllUserResponse.data.data);
            setPageCount(getAllUserResponse.data.pageCount);
            setItemCount(getAllUserResponse.data.itemCount);
            if (isChangeFormFilter()) {
              updateFilterUser(userDispatch, {
                ...userController.filter,
                pageSize: size,
                search,
                page,
              });
            }
          }
        }
      }
    },
    [token, filter]
  );

  // @ts-ignore
  useEffect(async () => {
    if (token) {
      const [getAllOrganizationResponse, getAllRoleResponse] = await Promise.all([
        getAllOrganizationApi({ token, page: 0, size: "", search: "" }),
        getAllRoleApi(token),
      ]);
      if (getAllRoleResponse.data != null) {
        getAllRoleSuccess(roleDispatch, getAllRoleResponse.data);
      }
      if (getAllOrganizationResponse.data !== null) {
        getAllOrganizationSuccess(organizationDispatch, getAllOrganizationResponse.data.data);
      }
    }
  }, [filter, token]);

  const confirmReSendCode = async (user: User) => {
    if (user) {
      const reSendCodeResponse = await reSendCodeUserApi({
        token: authController.token,
        id: user.id,
      });
      if (reSendCodeResponse.data !== null) {
        showSnackbar(snackbarDispatch, {
          typeSnackbar: SUCCESS_TYPE,
          messageSnackbar: SEND_CODE_SUCCESS,
        });
      } else {
        showSnackbar(snackbarDispatch, {
          typeSnackbar: ERROR_TYPE,
          messageSnackbar: reSendCodeResponse.messageError,
        });
      }
    }
  };

  const showAction = (user: User) => {
    if (user.status === "delete") return <div />;
    if (user.status === "pending")
      return (
        <RowAction
          handleView={() => handleView(user)}
          handleEdit={() => handleEdit(user)}
          handleDelete={() => handleDelete(user)}
          handleReSendCode={() => confirmReSendCode(user)}
        />
      );
    if (user.status === "active")
      return (
        <RowAction
          handleView={() => handleView(user)}
          handleEdit={() => handleEdit(user)}
          handleDelete={() => handleDelete(user)}
        />
      );
    return false;
  };

  const convertDataToRow = (user: User) => ({
    username: convertEllipsisCharacter(user?.username, STRING_SHORT_LENGTH),
    fullName: convertEllipsisCharacter(user?.fullName, STRING_SHORT_LENGTH),
    email: convertEllipsisCharacter(user.email, STRING_LONG_LENGTH),
    organization:
      user.organization === null
        ? ""
        : convertEllipsisCharacter(user.organization.name, STRING_SHORT_LENGTH),
    roles: (
      <MDBox>
        {user.roles.map((item: Role) => (
          <MDBox>{item.name}</MDBox>
        ))}
      </MDBox>
    ),
    status: convertStatusToString(user.status),
    action: showAction(user),
    location: user.location && (
      <MDBox>{convertEllipsisCharacter(user.location.name, STRING_LONG_LENGTH)}</MDBox>
    ),
  });

  useEffect(() => {
    if (userController.users) {
      setUserDatas(userController.users.map((user: User) => convertDataToRow(user)));
    }
  }, [userController.users, roleController.roles]);

  return {
    columns: isSuperAdmin(authController.currentUser)
      ? [
          { Header: "T??n ????ng nh???p", accessor: "username", align: "center" },
          { Header: "H??? v?? t??n", accessor: "fullName", align: "center" },
          { Header: "Email", accessor: "email", align: "center" },
          { Header: "T??? ch???c", accessor: "organization", align: "center" },
          { Header: "Quy???n qu???n l??", accessor: "roles", align: "center" },
          { Header: "Tr???ng th??i", accessor: "status", align: "center" },
          { Header: "Thao t??c", accessor: "action", align: "center" },
        ]
      : isSuperAdminOrganization(authController.currentUser)
      ? [
          { Header: "T??n ????ng nh???p", accessor: "username", align: "center" },
          { Header: "H??? v?? t??n", accessor: "fullName", align: "center" },
          { Header: "Email", accessor: "email", align: "center" },
          { Header: "Quy???n qu???n l??", accessor: "roles", align: "center" },
          { Header: "Tr???ng th??i", accessor: "status", align: "center" },
          { Header: "Thao t??c", accessor: "action", align: "center" },
        ]
      : [
          { Header: "T??n ????ng nh???p", accessor: "username", align: "center" },
          { Header: "H??? v?? t??n", accessor: "fullName", align: "center" },
          { Header: "Email", accessor: "email", align: "center" },
          { Header: "Chi nh??nh", accessor: "location", align: "center" },
          { Header: "Quy???n qu???n l??", accessor: "roles", align: "center" },
          { Header: "Tr???ng th??i", accessor: "status", align: "center" },
          { Header: "Thao t??c", accessor: "action", align: "center" },
        ],

    rows: userDatas,
    fetchData,
    pageCount,
    itemCount,
  };
}
