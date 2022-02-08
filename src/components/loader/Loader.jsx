import { Circles } from "react-loader-spinner";
import { Container } from "./Loader.styled";

const Loader = () => {
  return (
    <Container>
      <Circles ariaLabel="loading-indicator" height={200} width={200} />
    </Container>
  );
};

export default Loader;
