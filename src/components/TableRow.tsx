import {
  Avatar,
  AvatarGroup,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Td,
  Tr,
} from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";
import { BiRupee } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import EditSalesOrder from "./EditSalesOrder";

type SaleOrder = {
  name: string
  date: string
  price: string
  paid:boolean
};
interface OrderType {
  order: SaleOrder
  ID: number
  TabEdit: boolean
}

function TableRow({ order, ID, TabEdit }: OrderType) {
  const now = new Date();
  const formattedDate = now.toLocaleString("en-US", { timeStyle: "short" });
  // console.log(formattedDate);

  return (
    <Tr>
      <Td>
        <p>{ID}</p>
      </Td>
      <Td>
        <div className="flex items-center">
          <AvatarGroup size="sm" spacing="1rem">
            <Avatar bg="green.400" icon={<AiOutlineUser fontSize="1rem" />} />
          </AvatarGroup>
          <p className="mx-2">{order.name}</p>
          <div className="bg-slate-200 w-fit rounded-lg p-1 text-xs">
            <p className="dark:text-black">ap2000</p>
          </div>
        </div>
      </Td>
      <Td>
        <div className="flex items-center">
          <p>
            <BiRupee />
          </p>
          <p>{order.price}</p>
        </div>
      </Td>
      <Td>
        <div>
          <p>{order.date} ( {formattedDate} ) </p>
        </div>
      </Td>
      <Td>
        <div>
          <Menu>
            <MenuButton>
              <BsThreeDots />
            </MenuButton>
            <MenuList minWidth="140px">
              {TabEdit && <MenuItem>
                {/* Edit */}
                <EditSalesOrder menuButton="Edit" readonly={true} order={order} ID={ID}/>
              </MenuItem>}
              <MenuItem>
              {/* View */}
              <EditSalesOrder menuButton="View" readonly={false} order={order} ID={ID}/>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Td>
    </Tr>
  );
}

export default TableRow;
