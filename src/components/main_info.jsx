import {
  VStack,
  Stack,
  Text,
  Card,
  CardHeader,
  Heading,
  Box,
  StackDivider,
  CardBody,
} from "@chakra-ui/react";

const MainInfo = () => {
  return (
    <VStack
      alignItems="flex-start"
      width="100%"
    >
      <Card>
        <CardHeader>
          <Heading
            fontSize={[18, 20, 22, 24, 26]}
            fontWeight={700}
            lineHeight="normal"
            fontStyle="normal"
          >
            Важная информация
          </Heading>
        </CardHeader>

        <CardBody>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Dignissim enim sit amet venenatis urna cursus eget nunc scelerisque.
            In eu mi bibendum neque egestas congue quisque egestas diam. Lacus
            suspendisse faucibus interdum posuere lorem ipsum dolor sit. Turpis
            in eu mi bibendum neque egestas congue. Facilisis sed odio morbi
            quis commodo odio aenean. Scelerisque purus semper eget duis at
            tellus at urna condimentum. Mi ipsum faucibus vitae aliquet nec.
            Dictum at tempor commodo ullamcorper a lacus vestibulum sed arcu.
            Pellentesque diam volutpat commodo sed egestas egestas. Suscipit
            adipiscing bibendum est ultricies. Libero justo laoreet sit amet
            cursus. Vitae turpis massa sed elementum tempus egestas sed sed. A
            scelerisque purus semper eget duis. Sed adipiscing diam donec
            adipiscing tristique risus nec. Placerat in egestas erat imperdiet
            sed euismod nisi porta. Facilisis mauris sit amet massa. Diam in
            arcu cursus euismod. Morbi enim nunc faucibus a pellentesque.
          </Text>
        </CardBody>
      </Card>
    </VStack>
  );
};

export default MainInfo;
