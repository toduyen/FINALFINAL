import Icon from "@mui/material/Icon";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import MDBox from "components/bases/MDBox";
import MDButton from "components/bases/MDButton";
import { Organization } from "models/base/organization";
import { useCallback, useEffect, useState } from "react";
import { getAllOrganizationApi } from "../api";
import { useAuthenController } from "../../../../context/authenContext";
import {
  getAllOrganizationSuccess,
  updateFilterOrganization,
  useOrganizationController,
} from "../../../../context/organizationContext";
import { AcionType } from "../../../../types/actionType";
import convertEllipsisCharacter from "../../../../components/customizes/ConvertEllipsisCharacter";
import { STRING_LONG_LENGTH } from "../../../../constants/app";
import { initOrganizationFilter } from "../../../../types/filterType";

export default function data({ handleView, handleEdit, handleDelete }: AcionType) {
  const [organizationDatas, setOrganizationDatas] = useState([]);

  // @ts-ignore
  const [authController] = useAuthenController();
  // @ts-ignore
  const [organizationController, organizationDispatch] = useOrganizationController();

  const [pageCount, setPageCount] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  const [token, setToken] = useState(null);

  useEffect(
    () => () => {
      getAllOrganizationSuccess(organizationDispatch, []);
      updateFilterOrganization(organizationDispatch, initOrganizationFilter);
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
        const getAllOrganizationResponse = await getAllOrganizationApi({
          token,
          page,
          size,
          search,
        });
        if (getAllOrganizationResponse.data !== null) {
          if (
            getAllOrganizationResponse.data.data.length === 0 &&
            getAllOrganizationResponse.data.itemCount > 0
          ) {
            await fetchData({ page: page - 1, size, search });
          } else {
            getAllOrganizationSuccess(organizationDispatch, getAllOrganizationResponse.data.data);
            setPageCount(getAllOrganizationResponse.data.pageCount);
            setItemCount(getAllOrganizationResponse.data.itemCount);
            updateFilterOrganization(organizationDispatch, {
              ...organizationController.filter,
              pageSize: size,
              search,
              page,
            });
          }
        }
      }
    },
    [token]
  );

  const convertDataToRow = (organization: Organization) => ({
    name: convertEllipsisCharacter(organization?.name, STRING_LONG_LENGTH),
    email: organization.email
      ? convertEllipsisCharacter(organization.email, STRING_LONG_LENGTH)
      : "",
    phone: organization.phone ? organization.phone : "",
    description: organization.description
      ? convertEllipsisCharacter(organization?.description, STRING_LONG_LENGTH)
      : "",
    accountNumber: organization.numberUser ? organization.numberUser : 0,
    action: (
      <MDBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
        <MDButton variant="text" color="info" onClick={() => handleView(organization)}>
          <RemoveRedEyeIcon />
          &nbsp;xem
        </MDButton>
        <MDButton variant="text" color="dark" onClick={() => handleEdit(organization)}>
          <Icon>edit</Icon>&nbsp;s???a
        </MDButton>
        <MDBox mr={1}>
          <MDButton variant="text" color="error" onClick={() => handleDelete(organization)}>
            <Icon>delete</Icon>&nbsp;x??a
          </MDButton>
        </MDBox>
      </MDBox>
    ),
  });

  useEffect(() => {
    // Get data from context and set for organzationDatas
    if (organizationController.organizations) {
      setOrganizationDatas(
        organizationController.organizations.map((organization: Organization) =>
          convertDataToRow(organization)
        )
      );
    }
  }, [organizationController.organizations]);
  return {
    columns: [
      { Header: "T??n t??? ch???c", accessor: "name", align: "left" },
      { Header: "Email", accessor: "email", align: "center" },
      { Header: "S??? ??i???n tho???i", accessor: "phone", align: "center" },
      { Header: "M?? t???", accessor: "description", align: "center" },
      { Header: "T???ng s??? t??i kho???n", accessor: "accountNumber", align: "center" },
      { Header: "Thao t??c", accessor: "action", align: "center", width: "20%" },
    ],

    rows: organizationDatas,
    fetchData,
    pageCount,
    itemCount,
  };
}
