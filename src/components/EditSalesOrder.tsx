import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { SaleOrders } from "../store/atom";

const productOptions = [
  {
    label: "product1",
    value: "product 1",
  },
  {
    label: "product2",
    value: "product 2",
  },
  {
    label: "product3",
    value: "product 3",
  },
  {
    label: "product4",
    value: "product 4",
  },
  {
    label: "product5",
    value: "product 5",
  },
];

interface Props{
  menuButton: string
  readonly: boolean
  order: any
  ID:number
}

function EditSalesOrder({menuButton, readonly, order, ID}:Props) {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
    reset,
    control,
  } = useForm();

  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );
  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  const [orders, setOrders] = useRecoilState(SaleOrders);

  const onSubmit = (values: any) => {
    console.log("values",values);
    const updateOrder = {
      name: values.username,
      date: values.invoice_date,
      price: values.total_price,
      paid: values.paid,
      products: order.products,
      invoice_no: values.invoice_no
    };
    console.log(orders);
    
    const updatedOrders = orders.map((o, index) => {
      if (index === ID) {
        console.log(o);
        
        return { ...o, ...updateOrder };
      }
      return o;
    });

    setOrders(updatedOrders);
    console.log("update", orders);
    reset();
    onClose(); // Close the modal after updating


  };

  return (
    <>
      <div
        onClick={() => {
          setOverlay(<OverlayOne />);
          onOpen();
        }}
      >
        {menuButton}
      </div>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        {overlay}
        {/* <ModalOverlay /> */}
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                control={control}
                name="products"
                
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { error },
                }) => (
                  <FormControl py={4} isInvalid={!!error} id="products">
                    <FormLabel>All Products</FormLabel>

                    <Select
                      isMulti
                      name={name}
                      ref={ref}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      options={productOptions}
                      placeholder="Select products"
                      closeMenuOnSelect={false}
                      isDisabled={!readonly}
                      defaultValue={order?.products}
                
                    />

                    {/* <FormErrorMessage>
                      {error && error.message}
                    </FormErrorMessage> */}
                  </FormControl>
                )}
              />

              <FormControl>
                <FormLabel htmlFor="username">Your Name</FormLabel>
                <Input
                  id="username"
                  placeholder="your name"
                  defaultValue={order.name}
                  isDisabled={!readonly}
                  {...register("username")}
                />
                <FormErrorMessage>
                  {/* {errors.username && errors.username.message} */}
                </FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="invoice_no">Invoice Number</FormLabel>
                <Input
                  id="invoice_no"
                  type="number"
                  placeholder="invoice number"
                  defaultValue={order.invoice_no}
                  isDisabled={!readonly}
                  {...register("invoice_no")}
                />
                <FormErrorMessage>
                  {/* {errors.invoice_no && errors.invoice_no.message} */}
                </FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="invoice_date">Invoice Date</FormLabel>
                <Input
                  id="invoice_date"
                  type="date"
                  placeholder="invoice date"
                  defaultValue={order.date}
                  isDisabled={!readonly}
                  {...register("invoice_date")}
                />
                <FormErrorMessage>
                  {/* {errors.invoice_date && errors.invoice_date.message} */}
                </FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="total_price">Total Price</FormLabel>
                <Input
                  id="total_price"
                  type="number"
                  placeholder="total price"
                  defaultValue={order.price}
                  isDisabled={!readonly}
                  {...register("total_price")}
                />
                <FormErrorMessage>
                  {/* {errors.total_price && errors.total_price.message} */}
                </FormErrorMessage>
              </FormControl>

              <FormControl mb={4}>
                <FormLabel htmlFor="paid">Paid</FormLabel>
                <Controller
                  name="paid"
                  control={control}
                  defaultValue={order.paid}
                  
                  render={({ field }) => (
                    <Checkbox id="paid" {...field} isChecked={field.value} isDisabled={!readonly}>
                      Paid
                    </Checkbox>
                  )}
                />
              </FormControl>
              <div className="flex items-center justify-evenly">
                {readonly && <Button
                  mt={4}
                  colorScheme="teal"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Update
                </Button>}
                <Button className="mt-4" onClick={onClose}>
                  Cancel
                </Button>
              </div>
            </form>
          </ModalBody>

          {/* <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditSalesOrder;
