import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
} from "@nextui-org/react";
import { VerticalDotsIcon } from "./components/VerticalDotIcon";
import TopContent from "./components/TopContent";
import { Data } from "./interfaces/dataInterface";

function App() {
  const [page, setPage] = React.useState(1);
  const [data, setdata] = useState<Data[]>([]);

  const rowsPerPage = 10;

  const addData = (values: any) => {
    setdata((data) => [...data, values]);
  };

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data.slice(start, end);
  }, [page, data]);

  const renderCell = React.useCallback((user: Data, columnKey: string) => {
    switch (columnKey) {
      case "name":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{user.name}</p>
            <p className="text-bold text-tiny capitalize text-default-400">
              {user.email}
            </p>
          </div>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{user.role}</p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-labelledby="aria-labelledby">
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return user;
    }
  }, []);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-end items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={data.length > 5 ? Math.ceil(data.length / rowsPerPage) : 1}
          onChange={setPage}
        />
      </div>
    );
  }, [data.length, page]);

  return (
    <div className="bg-slate-800">
      <div className="h-screen lg:w-2/4 container mx-auto">
        <Table
          aria-label="aria-label"
          isHeaderSticky
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          classNames={{
            wrapper: "max-h-[764px]",
          }}
          topContent={<TopContent addData={addData} />}
          topContentPlacement="outside"
        >
          <TableHeader>
            <TableColumn key="name">Name</TableColumn>
            <TableColumn key="role">Role</TableColumn>
            <TableColumn key="actions">Actions</TableColumn>
          </TableHeader>
          <TableBody emptyContent={"No users found"} items={items}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey: string) => (
                  <TableCell>{renderCell(item, columnKey) as any}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default App;
