import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  VStack,
  Box,
  OrderedList,
  ListItem,
} from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";
import MaterialService from "../../../API/services/material_service";
const AllWarehouses = ({ materialId }) => {
  const [count, setCount] = useState({ warehouses: [], count: 23 });
  const getCountAll = async (id) => {
    const result = await MaterialService.getMaterial(id);
    console.log(result.data);
    setCount(result.data);
  };
  useEffect(() => {
    getCountAll(materialId);
  }, []);
  return (
    <VStack>
      <Accordion allowMultiple>
        <AccordionItem>
          <AccordionButton border={"0px"}>
            {count.warehouses.length == 0
              ? 0
              : count.warehouses
                  .map((warehouse) => warehouse.count)
                  .reduce((partialSum, a) => partialSum + a, 0)}
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <OrderedList>
              {count.warehouses.map((warehouse) => (
                <ListItem>
                  {warehouse.name} {warehouse.count}
                </ListItem>
              ))}
            </OrderedList>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </VStack>
  );
};
export default AllWarehouses;
