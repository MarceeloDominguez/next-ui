import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { PlusIcon } from "./PlusIcon";
import { Data } from "../interfaces/dataInterface";

type Prop = {
  addData: (values: Data) => void;
};

export default function TopContent({ addData }: Prop) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inputValue, setInputValue] = useState({
    email: "",
    name: "",
    role: "",
  });

  const handleOpen = () => {
    onOpen();
  };

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!inputValue.email || !inputValue.name || !inputValue.role) return;

    addData({ ...inputValue, id: new Date().getTime() });
    setInputValue({
      email: "",
      name: "",
      role: "",
    });
    onClose();
  };

  return (
    <>
      <div className="mt-10">
        <div className="flex justify-between gap-3 items-end">
          <div className="flex gap-3">
            <Button
              onPress={() => handleOpen()}
              color="primary"
              endContent={<PlusIcon />}
            >
              Add New
            </Button>
          </div>
        </div>
      </div>
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <div>
                  <Input
                    size="md"
                    type="email"
                    label="Email"
                    className="mb-3"
                    name="email"
                    value={inputValue.email}
                    onChange={handleChangeText}
                  />
                  <Input
                    size="md"
                    type="text"
                    label="Name"
                    className="mb-3"
                    name="name"
                    value={inputValue.name}
                    onChange={handleChangeText}
                  />
                  <Input
                    size="md"
                    type="text"
                    label="Role"
                    className="mb-3"
                    name="role"
                    value={inputValue.role}
                    onChange={handleChangeText}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleSubmit}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
