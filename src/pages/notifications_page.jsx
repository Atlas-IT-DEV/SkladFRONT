import { Button, Stack, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "../components/header/header";
import Footer from "../components/footer";
import { useFetching } from "../hooks/useFetching";
import useWindowDimensions from "../hooks/window_dimensions";
import NotificationService from "../API/services/notification_service";
import TableNotifications from "../components/tables/tableNotification/table_notification";

const NotificationPage = () => {
  const [visibleCreateModal, setVisibleCreateModal] = useState();
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
    <Stack
      direction={"row"}
      height="100vh"
      spacing="0"
      backgroundColor="menu_white"
      width="100%"
    >
      <VStack backgroundColor="menu_white" width="100%">
        <Header title="Материалы" />
        <VStack
          padding={25}
          alignItems="flex-start"
          spacing="40px"
          flexGrow={1}
          width="100%"
        >
          <Text
            color="#000"
            fontSize={[24, 26, 28, 32, 36]}
            fontWeight={700}
            lineHeight="normal"
            fontStyle="normal"
          >
            Уведомления
          </Text>
          <Text fontSize={14} fontWeight={400} marginBottom="20px">
            Возможно здесь будет тоже какой то поясняющий текст
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
            >
              <Button
                variant="menu_yellow"
                fontSize={["14px", "14px", "16px", "16px", "16px"]}
                onClick={() => setVisibleCreateModal(true)}
              >
                Добавить новый
              </Button>
            </Stack>
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
        <Footer />
      </VStack>
    </Stack>
  );
};
export default NotificationPage;
