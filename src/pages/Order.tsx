import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  TableContainer,
  Tabs,
  Tbody,
  Th,
  Thead,
  Tr,
  useColorMode,
} from "@chakra-ui/react";
import TableRow from "../components/TableRow";
import CreateSalesOrder from "../components/CreateSalesOrder";
import { useRecoilValue } from "recoil";
import { totalSaleOrderSelector } from "../store/atom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";

export default function Order() {
  const Orders = useRecoilValue(totalSaleOrderSelector);
  // console.log(Orders);
  const navigate = useNavigate();
  const { colorMode } = useColorMode(); // Get the current color mode

  useEffect(() => {
    const token = localStorage.getItem("name");
    if (token === null) {
      navigate("/"); // Navigate to login page if token is not present
    }
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div className="w-full">
        <div className=" flex justify-center p-10">
          <Tabs variant="soft-rounded" colorScheme="green" className="w-full">
            <TabList>
              <Tab
                className="border-2 mr-2"
                color={colorMode === "dark" ? "white" : "black"}
              >
                Active Sale Orders
              </Tab>
              <Tab
                className="border-2"
                color={colorMode === "dark" ? "white" : "black"}
              >
                Completed Sale Orders
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>ID</Th>
                        <Th>Customer Name</Th>
                        <Th>Price</Th>
                        <Th>Last Modified</Th>
                        <Th>Edit/View</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {/* <TableRow /> */}
                      {Orders.map((order, index) => {
                        if(!order.paid){
                          return <TableRow key={index} order={order} ID={index} TabEdit={true} />
                        }
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
              </TabPanel>
              <TabPanel>
              <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>ID</Th>
                        <Th>Customer Name</Th>
                        <Th>Price</Th>
                        <Th>Last Modified</Th>
                        <Th>View</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {/* <TableRow /> */}
                      {Orders.map((order, index) => {
                        if(order.paid){
                          return <TableRow key={index} order={order} ID={index} TabEdit={false} />
                        }
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
              </TabPanel>
            </TabPanels>
          </Tabs>
          <CreateSalesOrder />
        </div>
      </div>
    </>
  );
}
