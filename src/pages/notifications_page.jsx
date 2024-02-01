import { Stack, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useFetching } from "../hooks/useFetching";
import useWindowDimensions from "../hooks/window_dimensions";
import NotificationService from "../API/services/notification_service";
import TableNotifications from "../components/tables/tableNotification/table_notification";

const NotificationPage = () => {
  const [notificationList, setNotificationList] = useState([]);

  const { width, height } = useWindowDimensions();

  const [getNotificationList, notificationListError] = useFetching(async () => {
    await NotificationService.getNotifications().then((response) => {
      setNotificationList(response.data.notifications);
    });
  });

  useEffect(() => {
    getNotificationList();
  }, []);
  return (
    <VStack
      padding={25}
      alignItems="flex-start"
      spacing="20px"
      flexGrow={1}
      width="100%"
    >
      <Text
        color="#000"
        fontSize='22px !important'
        fontWeight={700}
        lineHeight="normal"
        fontStyle="normal"
      >
        Уведомления
      </Text>
      <Text fontSize={14} fontWeight={400} marginBottom="20px">
        Страница уведомлений
      </Text>
      <Stack
        color={"black"}
        width="100%"
        direction={width >= 935 ? "row" : "row"}
        align="flex-start"
      >
        <Stack
          color={"black"}
          spacing="25px"
          direction={width >= 935 ? "row" : "column"}
        ></Stack>
      </Stack>
      {notificationListError ? (
        <div>{notificationListError}</div>
      ) : (
        <TableNotifications
          notificationList={notificationList}
          getNotificationList={getNotificationList}
        />
      )}
    </VStack>
  );
};
export default NotificationPage;
