import { Icon } from "@mui/material";
import MDBox from "components/bases/MDBox";
import MDButton from "components/bases/MDButton";
import { useCallback, useEffect, useState } from "react";
import { getAllAreaRestrictionApi } from "../api";
import {
  getAllAreaRestrictionSuccess,
  updateFilterAreaRestriction,
  useAreaRestrictionController,
} from "../../../../context/areaRestrictionContext";
import { AreaRestriction } from "models/area-restriction/areaRestriction";
import { useAuthenController } from "../../../../context/authenContext";
import RowAction from "../../../../components/customizes/Tables/RowAction";
import { AcionType } from "../../../../types/actionType";
import convertEllipsisCharacter from "../../../../components/customizes/ConvertEllipsisCharacter";
import { STRING_MAX_LENGTH, STRING_SHORT_LENGTH } from "../../../../constants/app";

export default function data({ handleView, handleEdit, handleDelete, handleSetting }: AcionType) {
  const [areaRestrictionData, setAreaRestrictionData] = useState<Array<any>>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  // @ts-ignore
  const [authController] = useAuthenController();
  // @ts-ignore
  const [areaRestrictionController, areaRestrictionDispatch] = useAreaRestrictionController();

  const [token, setToken] = useState(null);

  useEffect(() => {
    if (token !== authController.token) {
      setToken(authController.token);
    }
  }, [authController.token]);

  const fetchData = useCallback(
    async ({ page, size, search }) => {
      if (token) {
        const getAllAreaRestrictionResponse = await getAllAreaRestrictionApi({
          token,
          page,
          size,
          search,
        });

        if (getAllAreaRestrictionResponse.data !== null) {
          if (
            getAllAreaRestrictionResponse.data.data.length === 0 &&
            getAllAreaRestrictionResponse.data.itemCount > 0
          ) {
            await fetchData({ page: page - 1, size, search });
          } else {
            getAllAreaRestrictionSuccess(
              areaRestrictionDispatch,
              getAllAreaRestrictionResponse.data.data
            );
            setPageCount(getAllAreaRestrictionResponse.data.pageCount);
            setItemCount(getAllAreaRestrictionResponse.data.itemCount);
            updateFilterAreaRestriction(areaRestrictionDispatch, {
              ...areaRestrictionController.filter,
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

  const convertDataToRow = (areaRestriction: AreaRestriction) => ({
    areaName: convertEllipsisCharacter(areaRestriction?.areaName, STRING_SHORT_LENGTH),
    areaCode: convertEllipsisCharacter(areaRestriction?.areaCode, STRING_SHORT_LENGTH),
    personnelAllowedInOut: areaRestriction.personnelAllowedInOut
      ? areaRestriction.personnelAllowedInOut
      : "0",
    personnelInCharge: (
      <MDBox>
        {areaRestriction.personnelInCharge?.map((item, index) => (
          <MDBox key={index} style={{ display: "flex" }}>
            {convertEllipsisCharacter(item.name, STRING_MAX_LENGTH)}
          </MDBox>
        ))}
      </MDBox>
    ),
    theTimeAllowed: `${areaRestriction.timeStart} - ${areaRestriction.timeEnd}`,
    numberCamera: areaRestriction.numberCamera ? areaRestriction.numberCamera : "0",
    numberOfAlertsForTheDay: areaRestriction.numberOfAlertsForTheDay
      ? areaRestriction.numberOfAlertsForTheDay
      : "0",
    setting: (
      <MDBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
        <MDButton variant="text" color="info" onClick={() => handleSetting(areaRestriction)}>
          <Icon fontSize="small">settings</Icon>
          &nbsp;c??i ?????t
        </MDButton>
      </MDBox>
    ),
    action: (
      <RowAction
        handleView={() => handleView(areaRestriction)}
        handleEdit={() => handleEdit(areaRestriction)}
        handleDelete={() => handleDelete(areaRestriction)}
      />
    ),
  });

  useEffect(() => {
    if (areaRestrictionController.areaRestrictions !== null) {
      setAreaRestrictionData(
        areaRestrictionController.areaRestrictions.map((areaRestriction: AreaRestriction) =>
          convertDataToRow(areaRestriction)
        )
      );
    }
  }, [areaRestrictionController.areaRestrictions]);

  return {
    columns: [
      { Header: "T??n khu v???c", accessor: "areaName", align: "center" },
      { Header: "M?? khu v???c", accessor: "areaCode", align: "center" },
      { Header: "S??? nh??n s??? ???????c ph??p v??o ra", accessor: "personnelAllowedInOut", align: "center" },
      { Header: "Nh??n s??? ph??? tr??ch", accessor: "personnelInCharge", align: "left" },
      { Header: "Th???i gian cho ph??p", accessor: "theTimeAllowed", align: "center" },
      { Header: "S??? camera", accessor: "numberCamera", align: "center" },
      { Header: "S??? c???nh b??o trong ng??y", accessor: "numberOfAlertsForTheDay", align: "center" },
      { Header: "C??i ?????t c???nh b??o", accessor: "setting", align: "center" },
      { Header: "Thao t??c", accessor: "action", align: "center" },
    ],

    rows: areaRestrictionData,
    fetchData,
    pageCount,
    itemCount,
  };
}
