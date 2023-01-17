import { useCallback, useEffect, useState } from "react";
import { useAuthenController } from "context/authenContext";
import { getAllLogApi } from "../api";
import { UserLog } from "models/base/userLog";
import { convertStringTime } from "../../../../utils/helpers";
import {
  getAllUserLogResponseSuccess,
  updateFilterUserLog,
  useUserLogController,
} from "context/userLogContext";
import convertEllipsisCharacter from "../../../../components/customizes/ConvertEllipsisCharacter";
import { STRING_MAX_LENGTH } from "../../../../constants/app";
import { initUserLogFilter, UserLogFilterType } from "../../../../types/filterType";

export default function data() {
  const [pageCount, setPageCount] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [logDatas, setLogDatas] = useState([]);
  const [filter, setFilter] = useState<UserLogFilterType>(initUserLogFilter);

  // @ts-ignore
  const [authController] = useAuthenController();
  // @ts-ignore
  const [userLogController, userLogDispatch] = useUserLogController();

  const [token, setToken] = useState(null);

  useEffect(
    () => () => {
      getAllUserLogResponseSuccess(userLogDispatch, []);
      updateFilterUserLog(userLogDispatch, initUserLogFilter);
    },
    []
  );

  useEffect(() => {
    if (token !== authController.token) {
      setToken(authController.token);
    }
  }, [authController.token]);

  const isChangeFormFilter = () =>
    JSON.stringify(userLogController.filter.accountChoosed) !==
    JSON.stringify(filter.accountChoosed);

  useEffect(() => {
    if (isChangeFormFilter()) {
      setFilter(userLogController.filter);
    }
  }, [userLogController.filter]);

  const fetchData = useCallback(
    // eslint-disable-next-line no-shadow
    async ({ page, size, search }) => {
      if (token) {
        const getAllLogResponse = await getAllLogApi({
          token,
          page,
          size,
          search,
          userId: filter?.accountChoosed?.id,
        });
        if (getAllLogResponse.data !== null) {
          if (getAllLogResponse.data.data.length === 0 && getAllLogResponse.data.itemCount > 0) {
            await fetchData({ page: page - 1, size, search });
          } else {
            getAllUserLogResponseSuccess(userLogDispatch, getAllLogResponse.data.data);
            setPageCount(getAllLogResponse.data.pageCount);
            setItemCount(getAllLogResponse.data.itemCount);
            if (isChangeFormFilter()) {
              updateFilterUserLog(userLogDispatch, {
                ...userLogController.filter,
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

  const convertDataToRow = (log: UserLog) => ({
    accountName: convertEllipsisCharacter(log?.username, STRING_MAX_LENGTH),
    time: convertStringTime(log.time),
    logInfo: log.content,
  });

  useEffect(() => {
    if (userLogController.userLogs) {
      setLogDatas(userLogController.userLogs.map((log: UserLog) => convertDataToRow(log)));
    }
  }, [userLogController.userLogs]);

  return {
    columns: [
      { Header: "Tên tài khoản", accessor: "accountName", align: "center" },
      { Header: "Thời gian", accessor: "time", align: "center" },
      { Header: "Thông tin log", accessor: "logInfo", align: "center" },
    ],

    rows: logDatas,
    fetchData,
    pageCount,
    itemCount,
  };
}
