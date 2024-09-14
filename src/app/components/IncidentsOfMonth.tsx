import { CircleAlert, RotateCwSquare } from "lucide-react";
import style from "../style/cardContainer.module.css";

export const IncidentsOfMonth = () => {
    const toolIcon = "/assets/toolIcon.png";
    const maintenanceIcon = "/assets/maintanceIcon.png";

    return (
        <div className={`${style.containerCards}`}>
            <div className={`${style.tinyCard}`}>
                <CircleAlert color="#c84242" size={64} />
                <h2>15</h2>
                <h4>Incidencias</h4>
                <p className={`${style.p1}`}>+1 incidencia con respecto al mes pasado</p>
            </div>

            <div className={`${style.tinyCard}`}>
                <img src={toolIcon} alt="" />
                <h2>2</h2>
                <h4>Reparaciones</h4>
                <p className={`${style.p2}`}>+1 reparación con respecto al mes pasado</p>
            </div>

            <div className={`${style.tinyCard}`}>
                <RotateCwSquare color="#f2c8ed" size={64} />
                <h2>3</h2>
                <h4>Reparaciones en curso</h4>
                <p className={`${style.p3}`}>+2 reparaciones en curso al mismo tiempo</p>
            </div>

            <div className={`${style.tinyCard}`}>
                <img src={maintenanceIcon} alt="" />
                <h2>15</h2>
                <h4>Mantenimientos</h4>
                <p className={`${style.p4}`}>+4 mantenimientos completados con respecto al mes pasado</p>
            </div>
        </div>
    );
};
