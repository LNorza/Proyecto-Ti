import React, { useEffect, useState, useCallback, useRef } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { ColDef, ICellRendererParams, CellClassParams } from 'ag-grid-community'
import { Trash2, Pencil } from 'lucide-react'
import { myTheme } from '../../../utils'
import API_BASE_URL from '../../../utils/api/apiConfig'
import { getUserDepartment } from '../../../utils/api/userData'
import Actions from '../../../ui/components/Actions'

interface DeviceTableProps {
    refresh: boolean
    building: string
    editDevice: (deviceId: string) => void
    deleteDevice: (deviceId: string, deleteName: string) => void
}

interface DeviceData {
    _id: string
    name: string
    type: string
    brand: string
    user: string
    location: string
    status: string
}

export const DeviceTable: React.FC<DeviceTableProps> = ({ refresh, building, editDevice, deleteDevice }) => {
    const [rowData, setRowData] = useState<DeviceData[]>([])
    const [departmentId, setDepartmentId] = useState<string | null>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const parentRef = useRef<HTMLDivElement>(null)

    const handleEditClick = useCallback((row: DeviceData) => {
        editDevice(row._id)
    }, [])

    const handleDeleteClick = useCallback((row: DeviceData) => {
        deleteDevice(row._id, row.name)
    }, [])

    const fetchDevices = useCallback(async () => {
        if (!departmentId) return
        console.log('fetching devices', building)
        try {
            const response = await fetch(
                `${API_BASE_URL}/devices-by-department-search?department_id=${departmentId}&building_id=${building}`,
                {
                    credentials: 'include',
                },
            )
            const data = await response.json()

            const formattedData = data.map(({ _id, name, type, brand, specs, location_id, status }: any) => ({
                _id,
                name,
                type,
                brand,
                user: specs.user_id || 'Compartido',
                location: location_id.name,
                status,
            }))
            setRowData(formattedData)
        } catch (err) {
            console.error(err)
        }
    }, [departmentId, building])

    useEffect(() => {
        const fetchDepartment = async () => {
            try {
                const id = await getUserDepartment()
                setDepartmentId(id)
            } catch (err) {
                console.error(err)
            }
        }
        fetchDepartment()
    }, [])

    useEffect(() => {
        fetchDevices()
    }, [departmentId, refresh, fetchDevices, building])

    const colDefs: ColDef[] = [
        { field: 'name', headerName: 'Nombre de equipo', sortable: true, width: 270 }, // Usa flex
        {
            field: 'type',
            headerName: 'Tipo',
            sortable: true,
            flex: 1,
            cellRenderer: (params: ICellRendererParams) => {
                switch (params.value) {
                    case 'LAPTOP':
                        return 'Laptop'
                    case 'PC':
                        return 'Escritorio'
                    case 'PRINTER':
                        return 'Impresora'
                    case 'SWITCH':
                        return 'Switch'
                    case 'ROUTER':
                        return 'Router'
                    case 'PROJECTOR':
                        return 'Proyector'
                    case 'VOLTAGE-REGULATOR':
                        return 'Regulador de voltaje'
                    case 'NO-BREAK':
                        return 'No-break'
                    default:
                        return 'Desconocido'
                }
            },
        },
        {
            field: 'brand',
            headerName: 'Marca',
            sortable: true,
            flex: 1,
            cellRenderer: (params: ICellRendererParams) => {
                switch (params.value) {
                    case 'HP':
                        return 'HP'
                    case 'DELL':
                        return 'Dell'
                    case 'LENOVO':
                        return 'Lenovo'
                    case 'ACER':
                        return 'Acer'
                    case 'ASUS':
                        return 'Asus'
                    case 'APPLE':
                        return 'Apple'
                    case 'SAMSUNG':
                        return 'Samsung'
                    case 'EPSON':
                        return 'Epson'
                    case 'CISCO':
                        return 'Cisco'
                    case 'LINKSYS':
                        return 'Linksys'
                    case 'KOBLENZ':
                        return 'Koblenz'
                    case 'OTHER':
                        return 'Otra'
                    default:
                        return 'Desconocida'
                }
            },
        },
        { field: 'user', headerName: 'Usuario', sortable: true, flex: 1 },
        { field: 'location', headerName: 'Locación', sortable: true, flex: 1 },
        {
            field: 'status',
            headerName: 'Status',
            sortable: true,
            cellRenderer: (params: ICellRendererParams) => {
                switch (params.value) {
                    case 'ACTIVE':
                        return 'Activo'
                    case 'INACTIVE':
                        return 'Inactivo'
                    default:
                        return 'En reparación'
                }
            },
            cellStyle: (params: CellClassParams) => {
                switch (params.value) {
                    case 'ACTIVE':
                        return { color: '#A9DFD8' }
                    case 'INACTIVE':
                        return { color: '#C84242' }
                    default:
                        return { color: '#FEAF5A' }
                }
            },
            flex: 1,
        },
        {
            field: 'actions',
            headerName: 'Acciones',
            cellRenderer: Actions,
            cellRendererParams: (params: ICellRendererParams) => ({
                row: params.data,
                table: true,
                parentRef: contentRef,
                actions: [
                    {
                        text: 'Editar',
                        icon: Pencil,
                        onClick: (row: DeviceData, e: React.MouseEvent<HTMLDivElement>) => {
                            e.stopPropagation()
                            handleEditClick(row)
                        },
                    },
                    {
                        text: 'Borrar',
                        icon: Trash2,
                        onClick: (row: DeviceData, e: React.MouseEvent<HTMLDivElement>) => {
                            e.stopPropagation()
                            handleDeleteClick(row)
                        },
                    },
                ],
            }),
            autoHeight: true,
            flex: 1, // Usa flex para las acciones
        },
    ]

    return (
        <div className="ag-theme-quartz-dark" style={{ height: 440, width: '100%' }} ref={parentRef}>
            <AgGridReact rowData={rowData} columnDefs={colDefs} theme={myTheme} rowHeight={50} />
        </div>
    )
}
