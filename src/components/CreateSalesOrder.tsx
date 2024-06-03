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
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
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

type FormData = {
  username: string;
  invoice_date: string;
  total_price: string;
  invoice_no: string;
  products: any[];
  paid: boolean;
};

function CreateSalesOrder() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const { colorMode } = useColorMode();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<FormData>();

  const setOrders = useSetRecoilState(SaleOrders);

  const onSubmit = (values: any) => {

    // console.log(values);
    const newOrder = {
      name: values.username,
      date: values.invoice_date,
      price: values.total_price,
      paid: values.paid,
      products: values.products,
      invoice_no: values.invoice_no
    };

    setOrders((orders) => [...orders, newOrder]);
    reset();
    onClose();
  };

  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );
  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  return (
    <>
      <Button
        colorScheme="teal"
        variant="outline"
        onClick={() => {
          setOverlay(<OverlayOne />);
          reset();
          onOpen();
        }}
        color={colorMode === "dark" ? "white" : "black"}
      >
        + Sale Order
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        {overlay}
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                control={control}
                name="products"
                rules={{ required: "Please select at least one product." }}
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
                    />
                    <FormErrorMessage>
                      {error && error.message}
                    </FormErrorMessage>
                  </FormControl>
                )}
              />

              <FormControl isInvalid={!!errors.username}>
                <FormLabel htmlFor="username">Your Name</FormLabel>
                <Input
                  id="username"
                  placeholder="your name"
                  {...register("username", { required: "Enter your name" })}
                />
                <FormErrorMessage>
                  {errors.username && errors.username?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.invoice_no}>
                <FormLabel htmlFor="invoice_no">Invoice Number</FormLabel>
                <Input
                  id="invoice_no"
                  type="number"
                  placeholder="invoice number"
                  {...register("invoice_no", { required: "Cannot be empty" })}
                />
                <FormErrorMessage>
                  {errors.invoice_no && errors.invoice_no?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.invoice_date}>
                <FormLabel htmlFor="invoice_date">Invoice Date</FormLabel>
                <Input
                  id="invoice_date"
                  type="date"
                  placeholder="invoice date"
                  {...register("invoice_date", { required: "Cannot be empty" })}
                />
                <FormErrorMessage>
                  {errors.invoice_date && errors.invoice_date?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.total_price}>
                <FormLabel htmlFor="total_price">Total Price</FormLabel>
                <Input
                  id="total_price"
                  type="number"
                  placeholder="total price"
                  {...register("total_price", { required: "Cannot be empty" })}
                />
                <FormErrorMessage>
                  {errors.total_price && errors.total_price?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl mb={4}>
                <FormLabel htmlFor="paid">Paid</FormLabel>
                <Controller
                  name="paid"
                  control={control}
                  render={({ field: { value } }) => (
                    <Checkbox id="paid" isChecked={value} 
                    {...register("paid")}

                    >
                      Paid
                    </Checkbox>
                  )}
                />
              </FormControl>

              <div className="flex items-center justify-evenly">
                <Button
                  mt={4}
                  colorScheme="teal"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Submit
                </Button>
                <Button className="mt-4" onClick={onClose}>
                  Cancel
                </Button>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateSalesOrder;
