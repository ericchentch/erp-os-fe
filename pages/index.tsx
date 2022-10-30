import {
  bodyExample,
  CustomTable,
  DefaultLayout,
  headerExample,
  ltstACtionExample,
} from "@/components";
import { apiRoute } from "@/constants/apiRoutes";
import axiosInstance from "@/lib/axios/request";
import { ExampleRowType } from "@/types";
import { Switch, useTheme } from "@nextui-org/react";
import type { NextPage } from "next";
import { useTheme as useNextTheme } from "next-themes";

const Home: NextPage = () => {
  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();

  const getData = () => {
    const a = axiosInstance.get("apiRoute.user.getListUser");
    console.log(a);
  };
  getData();

  return (
    <DefaultLayout>
      Darkmode:
      <Switch
        css={{ marginLeft: 10 }}
        checked={isDark}
        onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
      />
      <CustomTable<ExampleRowType>
        header={headerExample}
        body={bodyExample}
        listActions={ltstACtionExample}
        selectionMode="multiple"
      >
        <></>
      </CustomTable>
      <CustomTable<ExampleRowType>
        header={headerExample}
        body={bodyExample}
        selectionMode="multiple"
      >
        <></>
      </CustomTable>
    </DefaultLayout>
  );
};

export default Home;
