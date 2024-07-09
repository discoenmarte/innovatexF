'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../card'
import TablePagination from './pagination'
import { ModelTable } from '@/types/table'
import TableBodyC from './body'
import { Table, TableBody, TableCell, TableRow } from '.'
import TableHeaderC from './header'
import RefresDataButton from './refresh'
import { TableSkeleton } from '../skeletons'
import { useState } from 'react'
import BuildDialog from '../dialog/build'
import React from 'react'
import BuildCard from '../card/build'
import DownloadCsvButton from '../download-buttton'
import BuildTooltip from '../tooltip/build'
import { Button } from '../button'
import { Database } from 'lucide-react'
import SearchInput from './search'
import DownloadDB from './download-db'

interface ModalChildComponentProps {
    data: any
    fetchItems: () => Promise<void>
    showModal: (open: boolean) => void
}

export function BuildModelTable({
    columns,
    responsePagination,
    setResponsePagination,
    apiURL,
    detailModal,
    fetchItems,
    loading,
    loader = <TableSkeleton />,
    metadata,
    exportFileName,
}: ModelTable) {
    const [selectedRow, setSelectedRow] = useState<any>()
    const [modal, setModal] = useState(false)

    /**
     * Sets the selected row and opens the product modal.
     *
     * @param {any} row - The selected row.
     * @return {void} This function does not return anything.
     */
    const handlerSelectedRow = (row: any) => {
        setSelectedRow(row)
        setModal(true)
    }

    /**
     * Updates the state of the product modal and fetches products
     *  if the modal is closed.
     *
     * @param {boolean} open - Indicates whether the modal is open or closed.
     * @return {void} This function does not return anything.
     */
    const modalOpenChange = (open: boolean) => {
        setModal(open)
        !open && fetchItems && fetchItems()
    }

    /**
     * Clones the detail modal element and passes the selected row data as a prop.
     *
     * @returns {React.ReactElement} The cloned detail modal element.
     */
    const updatedDetailModal = React.isValidElement(detailModal.children)
        ? React.cloneElement(
              detailModal.children as React.ReactElement<ModalChildComponentProps>,
              { data: selectedRow, fetchItems, showModal: setModal }
          )
        : detailModal.children

    return loading ? (
        <div className="h-full w-full flex items-center justify-center">
            {loader}
        </div>
    ) : (
        <>
            {selectedRow && (
                <BuildDialog
                    className="w-[90%] md:max-w-[60%] max-h-[95%] overflow-y-auto"
                    open={modal}
                    onOpenChange={modalOpenChange}
                    title={detailModal.title}
                    content={updatedDetailModal}
                />
            )}
            <BuildCard
                title={metadata?.title}
                description={metadata?.description}
                content={
                    <>
                        <span className="flex justify-between">
                            <SearchInput
                                urlBase={apiURL}
                                setResponsePagination={setResponsePagination}
                                fetchItems={fetchItems}
                            />
                            <span className="flex gap-2">
                                <RefresDataButton
                                    apiURL={apiURL}
                                    setResponsePagination={
                                        setResponsePagination
                                    }
                                />
                                <DownloadCsvButton
                                    jsonData={responsePagination.results}
                                    filename={exportFileName}
                                    tooltipContent="Descargar datos pag. actual"
                                />
                                <BuildDialog
                                    title="Descargar todos los datos"
                                    trigger={
                                        <Button
                                            className="flex gap-2 items-center"
                                            variant="outline"
                                            size="icon"
                                        >
                                            <Database size={20} />
                                        </Button>
                                    }
                                    content={
                                        <DownloadDB
                                            apiURL={apiURL}
                                            filename={exportFileName}
                                        />
                                    }
                                />
                            </span>
                        </span>

                        <Table>
                            <TableHeaderC columns={columns} />
                            {responsePagination.count === 0 ? (
                                <TableBody>
                                    <TableRow>
                                        <TableCell colSpan={columns.length}>
                                            No hay datos
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            ) : (
                                <TableBodyC
                                    columns={columns}
                                    responsePagination={responsePagination}
                                    onSelectedRow={handlerSelectedRow}
                                />
                            )}
                        </Table>
                    </>
                }
                footer={
                    <div className="grid justify-center w-full">
                        <TablePagination
                            responsePagination={responsePagination}
                            setResponsePagination={setResponsePagination}
                            apiURL={apiURL}
                            label={metadata?.modelNamePlural}
                        />
                    </div>
                }
            />
        </>
    )
}
