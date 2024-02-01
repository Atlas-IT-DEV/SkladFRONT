import { Text, VStack } from "@chakra-ui/react";
import MainInfo from "../components/main_info";
import Recent from "../components/recent";
import MaterialSearch from "../components/material_search";
import TablePurchases from "../components/tables/tablePurchases/table_purchases";
import TableLogs from "../components/tables/table_logs";

const MainPage = () => {
  return (
    <VStack padding={25} alignItems="flex-start" spacing="40px" flexGrow={1}>
      <Text
        color="#000"
        fontSize={[24, 26, 28, 32, 36]}
        fontWeight={700}
        lineHeight="normal"
        fontStyle="normal"
      >
        Главная страница
      </Text>
      <Text fontSize={14} fontWeight={400} marginBottom="20px">
        На главной странице вы можете видеть недавние действия пользователей,
        которые работают с вашим складом. Это поможет вам быть в курсе всех
        изменений, которые происходят на складе, а также контролировать работу
        своих сотрудников.
      </Text>

      <TableLogs />
    </VStack>
  );
};
export default MainPage;
