import { atom, selector } from "recoil";

type SaleOrder = {
  paid: any;
  name: string;
  date: string;
  price: string;
};

export const SaleOrders = atom<SaleOrder[]>({
    key: "SaleOrderAtom",
    default: []
});

export const totalSaleOrderSelector = selector({
    key: "totalSaleOrderSelector",
    get: ({get}) => {
        const allorder = get(SaleOrders);
        return allorder
    }
        
})