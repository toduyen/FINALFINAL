import { useCallback, useEffect, useState } from "react";
import { getAllNotificationHistoryApi } from "../api";
import { NotificationHistory } from "models/base/notificationHistory";
import { convertStringTime } from "utils/helpers";
import { useAuthenController } from "../../../../context/authenContext";
import {
  getAllNotificationHistoriesSuccess,
  updateFilterNotificationHistory,
  updateUserAttendanceChoosed,
  useNotificationHistoryController,
} from "../../../../context/notificationHistoryContext";
import { isAreaRestrictionModule, isBehaviorModule, isTimeKeepingModule } from "utils/checkRoles";
import { CardMedia } from "@mui/material";
import MDBox from "components/bases/MDBox";
import MDButton from "components/bases/MDButton";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {
  convertNotificationHistoryToUserAttendanceItem,
  UserAttendanceItemType,
} from "types/userAttendanceItemType";
import convertEllipsisCharacter from "../../../../components/customizes/ConvertEllipsisCharacter";
import { STRING_LONG_LENGTH_EMPLOYEE } from "../../../../constants/app";
import {
  initNotificationHistoryFilter,
  NotificationHistoryFilterType,
} from "../../../../types/filterType";

export default function data() {
  const [pageCount, setPageCount] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [notificationHistoryData, setNotificationHistoryData] = useState([]);
  const [filter, setFilter] = useState<NotificationHistoryFilterType>(
    initNotificationHistoryFilter
  );

  // @ts-ignore
  const [authController] = useAuthenController();

  // @ts-ignore
  const [notificationHistoryController, notificationHistoryDispatch] =
    useNotificationHistoryController();

  const [token, setToken] = useState(null);

  useEffect(
    () => () => {
      getAllNotificationHistoriesSuccess(notificationHistoryController, []);
      // eslint-disable-next-line no-unused-expressions
      updateFilterNotificationHistory(notificationHistoryDispatch, initNotificationHistoryFilter);
    },
    []
  );

  useEffect(() => {
    if (token !== authController.token) {
      setToken(authController.token);
    }
  }, [authController.token]);

  const isChangeFormFilter = () =>
    notificationHistoryController.filter.status !== filter.status ||
    JSON.stringify(notificationHistoryController.filter.employee) !==
      JSON.stringify(filter.employee) ||
    JSON.stringify(notificationHistoryController.filter.areaRestriction) !==
      JSON.stringify(filter.areaRestriction);

  useEffect(() => {
    if (isChangeFormFilter()) {
      setFilter(notificationHistoryController.filter);
    }
  }, [notificationHistoryController.filter]);
  const fetchData = useCallback(
    async ({ page, size }) => {
      if (token) {
        const getAllNotificationHistoryResponse = await getAllNotificationHistoryApi({
          token,
          page,
          size,
          areaRestrictionId: filter.areaRestriction ? filter.areaRestriction.id : undefined,
          employeeId: filter.employee ? filter.employee.id : undefined,
          status:
            isAreaRestrictionModule() || isBehaviorModule()
              ? notificationHistoryController.filter.status
                ? notificationHistoryController.filter.status
                : ""
              : "",
        });
        if (getAllNotificationHistoryResponse.data !== null) {
          if (
            getAllNotificationHistoryResponse.data.data.length === 0 &&
            getAllNotificationHistoryResponse.data.itemCount > 0
          ) {
            await fetchData({ page: page - 1, size });
          } else {
            getAllNotificationHistoriesSuccess(
              notificationHistoryDispatch,
              getAllNotificationHistoryResponse.data.data
            );
            setPageCount(getAllNotificationHistoryResponse.data.pageCount);
            setItemCount(getAllNotificationHistoryResponse.data.itemCount);
            if (isChangeFormFilter()) {
              updateFilterNotificationHistory(notificationHistoryDispatch, {
                ...notificationHistoryController.filter,
                pageSize: size,
                page,
              });
            }
          }
        }
      }
    },
    [token, filter]
  );

  const convertDataToRow = (history: NotificationHistory) => {
    let temp = {
      notificationType: history.type ? history.type : "",
      employee: (
        <MDBox style={{ textAlignLast: "left" }}>
          {history.employee?.name ? (
            <MDBox display="flex">
              T??n nh??n vi??n: &nbsp;
              {convertEllipsisCharacter(history?.employee?.name, STRING_LONG_LENGTH_EMPLOYEE)}
            </MDBox>
          ) : (
            ""
          )}
          {history.employee?.code ? (
            <MDBox display="flex">
              M?? nh??n vi??n:&nbsp;
              {convertEllipsisCharacter(history?.employee?.code, STRING_LONG_LENGTH_EMPLOYEE)}
            </MDBox>
          ) : (
            ""
          )}
          {history.employee?.manager ? (
            <MDBox style={{ display: "flex" }}>
              Qu???n l??:&nbsp;
              {convertEllipsisCharacter(
                history.employee?.manager?.code,
                STRING_LONG_LENGTH_EMPLOYEE
              )}
              -
              {convertEllipsisCharacter(
                history?.employee?.manager?.name,
                STRING_LONG_LENGTH_EMPLOYEE
              )}
            </MDBox>
          ) : (
            ""
          )}
        </MDBox>
      ),
      time: convertStringTime(history.time),
    };

    if (isAreaRestrictionModule() || isBehaviorModule()) {
      temp = {
        ...temp,
        // @ts-ignore

        camera: history.camera ? convertEllipsisCharacter(history?.camera?.name, 18) : "",
        areaRestriction: history.areaRestriction
          ? convertEllipsisCharacter(history?.areaRestriction?.areaName, 18)
          : "",
        status: history.status,
        image:
          history.image !== null ? (
            <CardMedia component="img" height="80" image={history.image?.path} alt="" />
          ) : (
            <div />
          ),
        action:
          history.status === "Ch??a x??? l??" ? (
            <MDBox
              display="flex"
              alignItems="center"
              mt={{ xs: 2, sm: 0 }}
              ml={{ xs: -1.5, sm: 0 }}
            >
              <MDButton
                variant="text"
                color="info"
                onClick={() => {
                  const userAttendance: UserAttendanceItemType =
                    convertNotificationHistoryToUserAttendanceItem(
                      history,
                      authController.currentUser.location.id
                    );
                  updateUserAttendanceChoosed(notificationHistoryDispatch, userAttendance);
                }}
              >
                <RemoveRedEyeIcon />
                &nbsp;Xem chi ti???t
              </MDButton>
            </MDBox>
          ) : (
            <div />
          ),
      };
    }
    return temp;
  };
  useEffect(() => {
    if (notificationHistoryController.notificationHistories) {
      setNotificationHistoryData(
        notificationHistoryController.notificationHistories.map((history: NotificationHistory) =>
          convertDataToRow(history)
        )
      );
    }
  }, [
    notificationHistoryController.notificationHistories,
    notificationHistoryController.userAttendanceChoosed,
  ]);

  return {
    columns: isTimeKeepingModule()
      ? [
          { Header: "Lo???i c???nh b??o", accessor: "notificationType", align: "center" },
          { Header: "Nh??n vi??n", accessor: "employee", align: "left" },
          { Header: "Th???i gian", accessor: "time", align: "left" },
        ]
      : [
          { Header: "Camera", accessor: "camera", align: "center" },
          { Header: "Khu v???c h???n ch???", accessor: "areaRestriction", align: "center" },
          { Header: "Lo???i c???nh b??o", accessor: "notificationType", align: "center" },
          { Header: "Nh??n vi??n", accessor: "employee", align: "center" },
          { Header: "Th???i gian", accessor: "time", align: "center" },
          { Header: "Tr???ng th??i", accessor: "status", align: "center" },
          { Header: "H??nh ???nh", accessor: "image", align: "center" },
          { Header: "Thao t??c", accessor: "action", align: "center" },
        ],

    rows: notificationHistoryData,
    fetchData,
    pageCount,
    itemCount,
  };
}
