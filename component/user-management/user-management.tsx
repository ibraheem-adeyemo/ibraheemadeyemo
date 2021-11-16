import { VStack } from "@chakra-ui/layout";
import dynamic from "next/dynamic";
import React, { useCallback, useContext, useEffect } from "react";
import { UserManagementStats } from ".";
import { userManagementTabsName } from "../../constants";
import { UserManagementTabProviderContext } from "../../provider/user-management-tab-provider";
import UserManagementTabAndSearch from "./user-management-tab-and-search";

const Bank = dynamic(() => import("./bank"))
const BankAdmin = dynamic(() => import("./bank-admin"))
const ISWAdmin = dynamic(() => import("./isw-admin"))

export default function UserManagement(_props: any) {
    const { tabs, handleTabSelection } = useContext(UserManagementTabProviderContext)
    useEffect(() => {
        handleTabSelection(0)
    }, [])
    const SelectedTable = useCallback(() => {
        const selectedIndex = tabs.findIndex((x, i) => x.isSelected)
        if (selectedIndex > -1) {
            switch (tabs[selectedIndex].name) {
                case userManagementTabsName.bank:
                    return <Bank />
                case userManagementTabsName.bankAdmin:
                    return <BankAdmin />
                case userManagementTabsName.iSWAdmin:
                    return <ISWAdmin />
                default:
                    return <></>
            }
        }
        return <></>
    }, [tabs])
    return (
        <VStack spacing="21px">
            <UserManagementStats />
            <VStack spacing="36px" w="100%">
                <UserManagementTabAndSearch />
                <SelectedTable />
            </VStack>
        </VStack>
    )
}