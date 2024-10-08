import { AddBuildModal } from './AddBuildModal'
import { BuildModalType, BuildingProps, OfficeProps } from '../../../utils'
import { AddOfficeClassroom } from './AddOfficeClassroom'
import { DeleteModal } from '../../../ui/components/DeleteModal'
import { DevicesListModal } from '../DevicePageContent/DevicesList'

import style from '../../style/modal.module.css'

interface Props {
    isOpen: boolean
    type?: BuildModalType
    buildingId?: string
    buildingData?: BuildingProps
    deleteName?: string
    locationId?: string
    officeData?: OfficeProps
    onClose: () => void
    deleteFunction: () => void
}

export const BuildModal = ({
    isOpen,
    type,
    deleteName,
    buildingId,
    buildingData,
    locationId,
    officeData,
    deleteFunction,
    onClose,
}: Props) => {
    return (
        <>
            {isOpen && (
                <div className={style.container}>
                    <div onClick={onClose} className={style.overlay}></div>
                    <section className={style.modalInfoContainer}>
                        {type === 'AddBuild' && <AddBuildModal onClose={onClose} />}
                        {type === 'AddOfficeClass' && <AddOfficeClassroom onClose={onClose} buildingId={buildingId} />}
                        {type === 'EditBuild' && <AddBuildModal onClose={onClose} buildingData={buildingData} />}
                        {type === 'EditOfficeClass' && <AddOfficeClassroom onClose={onClose} officeData={officeData} />}
                        {(type === 'DeleteBuild' || type === 'DeleteOfficeClass') && (
                            <DeleteModal onClose={onClose} name={deleteName} deleteFunction={deleteFunction} />
                        )}
                        {type === 'DevicesList' && <DevicesListModal locationId={locationId} onClose={onClose} />}
                    </section>
                </div>
            )}
        </>
    )
}
