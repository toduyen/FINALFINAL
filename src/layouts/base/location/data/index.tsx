import { useCallback, useEffect, useState } from "react";
import { getAllLocationApi } from "../api";
import { Location } from "models/base/location";
import { Icon } from "@mui/material";
import MDBox from "components/bases/MDBox";
import MDButton from "components/bases/MDButton";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {
  getAllLocationSuccess,
  updateFilterLocation,
  useLocationController,
} from "../../../../context/locationContext";
import { useAuthenController } from "../../../../context/authenContext";
import { AcionType } from "../../../../types/actionType";
import convertEllipsisCharacter from "../../../../components/customizes/ConvertEllipsisCharacter";
import { STRING_LONG_LENGTH } from "../../../../constants/app";

export default function data({ handleView, handleEdit, handleDelete }: AcionType) {
  const [pageCount, setPageCount] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [rowTableData, setRowTableData] = useState([]);
  // @ts-ignore
  const [authController] = useAuthenController();
  // @ts-ignore
  const [locationController, locationDispatch] = useLocationController();

  const [token, setToken] = useState(null);

  useEffect(() => {
    if (token !== authController.token) {
      setToken(authController.token);
    }
  }, [authController.token]);

  useEffect(() => () => getAllLocationSuccess(locationDispatch, []), []);

  const fetchData = useCallback(
    async ({ page, size, search }) => {
      if (token) {
        const getAllLocationResponse = await getAllLocationApi({
          token,
          page,
          size,
          search,
        });
        if (getAllLocationResponse.data !== null) {
          if (
            getAllLocationResponse.data.data.length === 0 &&
            getAllLocationResponse.data.itemCount > 0
          ) {
            await fetchData({ page: page - 1, size, search });
          } else {
            getAllLocationSuccess(locationDispatch, getAllLocationResponse.data.data);
            setPageCount(getAllLocationResponse.data.pageCount);
            setItemCount(getAllLocationResponse.data.itemCount);
            updateFilterLocation(locationDispatch, {
              ...locationController.filter,
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

  const convertDataToRow = (location: Location) => ({
    locationName: convertEllipsisCharacter(location?.name, STRING_LONG_LENGTH),
    branchCode: convertEllipsisCharacter(location?.code, STRING_LONG_LENGTH),
    numberOfPersonnel: location.numberEmployee,
    numberCamera: location.numberCamera,
    action: (
      <MDBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
        <MDButton variant="text" color="info" onClick={() => handleView(location)}>
          <RemoveRedEyeIcon />
          &nbsp;xem
        </MDButton>
        <MDButton variant="text" color="dark" onClick={() => handleEdit(location)}>
          <Icon>edit</Icon>&nbsp;s???a
        </MDButton>
        <MDBox mr={1}>
          <MDButton variant="text" color="error" onClick={() => handleDelete(location)}>
            <Icon>delete</Icon>&nbsp;x??a
          </MDButton>
        </MDBox>
      </MDBox>
    ),
  });

  useEffect(() => {
    if (locationController.locations) {
      setRowTableData(
        locationController.locations.map((location: Location) => convertDataToRow(location))
      );
    }
  }, [locationController.locations]);

  return {
    columns: [
      { Header: "T??n chi nh??nh", accessor: "locationName", align: "center" },
      { Header: "M?? chi nh??nh", accessor: "branchCode", align: "center" },
      { Header: "S??? nh??n s???", accessor: "numberOfPersonnel", align: "center" },
      { Header: "S??? camera", accessor: "numberCamera", align: "center" },
      { Header: "Thao t??c", accessor: "action", align: "center" },
    ],

    rows: rowTableData,
    fetchData,
    pageCount,
    itemCount,
  };
}
