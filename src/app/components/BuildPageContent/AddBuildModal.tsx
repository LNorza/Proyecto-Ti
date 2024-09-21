import { useState } from "react";
import { CustomCheckBox, CustomInput, CustomSelect } from "../../../ui";
import { useForm } from "../../../hooks";
import { Building } from "lucide-react";
import style from "../../style/modal.module.css";

interface Props {
    onClose: () => void;
}

export const AddBuildModal = ({ onClose }: Props) => {
    const { onInputChange } = useForm({});
    const [shareBuilding, setShareBuilding] = useState(false);

    return (
        <>
            <div className={style.titleModal}>
                <Building size={30} />
                <h2>Agregar edificio</h2>
            </div>
            <div className={style.modalDetail}>
                <section>
                    ¿El edificio comparte departamento?
                    <CustomCheckBox
                        checked={shareBuilding} // Controla el estado
                        setChecked={setShareBuilding} // Actualiza el estado
                    />
                </section>

                {shareBuilding != false && (
                    <>
                        <section>
                            Edificio
                            <CustomSelect />
                        </section>

                        <section>
                            ¿El edificio se encuentra en las opciones?
                            <CustomCheckBox />
                        </section>
                    </>
                )}

                <section>
                    Nombre
                    <CustomInput
                        name="name"
                        placeholder="Escribe nombre aqui..."
                        type="text"
                        onChange={onInputChange}
                        autoComplete="nameBuilding"
                    />
                </section>

                <div className={style.modalButtonContainer}>
                    <button onClick={onClose} className={style.cancelButton}>
                        Cancelar
                    </button>

                    <button className={style.saveButton}>Guardar</button>
                </div>
            </div>
        </>
    );
};
