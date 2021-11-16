import _ from "lodash";
import React, { useContext, useEffect, useMemo } from "react";
import useSWR from "swr";
import { TenantView, Paginate } from "../../models";
import { TableProvider } from "../../provider";
import { TableContext } from "../../provider/table-provider";
import { AppTable } from "../app";


function BankTable(_props: any) {
    // console.log({pageNumber})

    const { pageNumber, countPerPage, setPaginationProps } = useContext(TableContext)
    const { data: bankAdmin, mutate, error } = useSWR<Paginate<TenantView, string>>(`/api/get-banks?page=${pageNumber}&countPerPage=${countPerPage}`)
    const data = useMemo(() => ({
        columns: [
            {
                name: "Bank Logo",
                key: "bankLogo",
                ele: "image"
            }, {
                name: "Bank name",
                key: "name"
            }, {
                name: "Bank ID",
                key: "bankId"
            }, {
                name: "Address",
                key: "address"
            }, {
                name: "Date Created",
                key: "dateCreated"
            }, {
                name: "Bank Super Admin",
                key: "babnkSuperAdmin"
            }, {
                name: "Status",
                key: "status"
            }
        ],
        actions: [
            {
                name: "Edit",
                icons: {
                    use: true
                },
                method: () => {
                    alert("Edit")
                }
            },
            {
                name: "Delete",
                icons: {
                    use: true,
                },
                method: () => {
                    alert("Delete")
                }
            },
            {
                name: "View",
                icons: {
                    use: true
                },
                method: () => {
                    alert("View")
                }
            },
        ],
        data: bankAdmin?.data as TenantView[]
    }), [bankAdmin])

    useEffect(() => {
        if(typeof bankAdmin !== "undefined") {
            setPaginationProps(bankAdmin.totalData )
        }
    }, [bankAdmin])

    return (<AppTable<TenantView, string> columns={data?.columns} rows={data.data as TenantView[]} actions={data.actions} />)

}

export default function Bank(_props: any) {
    return (

        <TableProvider>
            <BankTable />
        </TableProvider>
    )
}