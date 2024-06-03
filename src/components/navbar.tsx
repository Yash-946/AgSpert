import { Box, Button, Container, Flex, Stack, useColorMode } from "@chakra-ui/react";
import { IoLogOut } from "react-icons/io5";
import { RiSunFill, RiMoonClearFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const logout = () => {
    // toggleColorMode
    localStorage.setItem("chakra-ui-color-mode","light");
    localStorage.removeItem("name")
    navigate("/");
  }

  return (
    <Box bg="gray.900" px={4}>
      <Container maxW={"container.2xl"}>
        {/* right side */}
        <Flex py={4} alignItems="center" justifyContent="space-between">
          <Box>
            <h1 className="font-bold text-lg italic text-white">AgSpert</h1>
          </Box>

          {/* left side */}
          <Stack direction="row" spacing={4}>
            <Button
              onClick={() => logout()}
              rightIcon={<IoLogOut />}
              colorScheme="teal"
            >
              Logout
            </Button>
            <Button onClick={toggleColorMode} colorScheme="teal">
              {colorMode === "dark" ? <RiSunFill /> : <RiMoonClearFill />}
            </Button>
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
