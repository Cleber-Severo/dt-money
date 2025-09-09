import { HeaderContainer, HeaderContent, NewTrasactionButton } from "./styles";
import * as Dialog from "@radix-ui/react-dialog";

import logoImg from "../../assets/logo.svg";
import NewTransactionModal from "../NewTransactionModal";

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />

        <Dialog.Root>
          <Dialog.DialogTrigger asChild>
            <NewTrasactionButton>Nova transação</NewTrasactionButton>
          </Dialog.DialogTrigger>
          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
