import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {deleteAllCars, removeCarById} from "../redux/actions";
import CarCreationForm from "./CarCreationForm";
import Collapse from "@material-ui/core/Collapse";
import {Alert} from "@material-ui/lab";
import {Button} from "@material-ui/core";
import MaterialTable from "material-table";
import {makeColumns} from "../MaterialTable/makeColumns";
import {tableIcons} from "../MaterialTable/tableIcons";
import {carBinder} from "../Objects/Car";
import CarInfo from "./CarInfo";

export function CarsList() {
    const dispatch = useDispatch();

    const cars = useSelector(state => state.cars);

    const [openInCreate, setOpenInCreate] = useState(false);

    const [openImportantAlert, setOpenImportantAlert] = useState(false);
    const [lockDelete, setLockDelete] = useState(!cars.length);

    const [openInfoAlert, setOpenInfoAlert] = useState(false);
    const [infoAlert, setInfoAlert] = useState(null);

    function closeCreationForm() {
        setOpenInCreate(false);
    }

    function onCarCreated() {
        setInfoAlert(
            <Alert severity="info" className="p-2 font-weight-bold">
                Car successfully created!
            </Alert>
        );
        setOpenInfoAlert(true);
        setTimeout(() => {
            setOpenInfoAlert(false);
        }, 3000);
    }

    function onCarEdited() {
        setInfoAlert(
            <Alert severity="info" className="p-2 font-weight-bold">
                Car successfully edited!
            </Alert>
        );
        setOpenInfoAlert(true);
        setTimeout(() => {
            setOpenInfoAlert(false);
        }, 3000);
    }

    return (
        <div className={"cars_list mt-3"}>
            <div className="alert_container mb-2">
                <div className="alert_important_container">
                    <Collapse in={openImportantAlert}>
                        <Alert severity={"error"}>
                            Are you sure you want to delete ALL CARS?
                            <div className="alert_button_container d-flex mt-2">
                                <Button className="mr-3" variant="outlined" color="primary"
                                        onClick={() => {
                                            setOpenImportantAlert(false);
                                            dispatch(deleteAllCars());
                                        }}>
                                    Confirm
                                </Button>
                                <Button variant="outlined" color="secondary"
                                        onClick={() => setOpenImportantAlert(false)}>
                                    Cancel
                                </Button>
                            </div>
                        </Alert>
                    </Collapse>
                </div>
                <div className="alert_info_container">
                    <Collapse in={openInfoAlert}>
                        {infoAlert ? infoAlert : null}
                    </Collapse>
                </div>
            </div>
            <div className="car_creation_container">
                <Collapse in={openInCreate}>
                    <CarCreationForm onFormSubmit={onCarCreated} onFormCancel={closeCreationForm}/>
                </Collapse>
            </div>
            <MaterialTable
                title="Cars List"
                columns={makeColumns(carBinder.materialTableFields)}
                data={cars}
                icons={tableIcons}
                onRowClick={(event, rowData, toggleDetailPanel) => toggleDetailPanel()}
                detailPanel={[
                    {
                        tooltip: "Show details",
                        render: rowData => {
                            const id = rowData.tableData.id;
                            const car = cars[id];
                            return (
                                <div>
                                    <CarInfo car={car} id={id} handleCarEdit={onCarEdited}/>
                                </div>
                            );
                        }
                    }
                ]}
                actions={[
                    {
                        tooltip: 'Add Car',
                        icon: tableIcons.Add,
                        isFreeAction: true,
                        onClick: () => {
                            openInCreate ? setOpenInCreate(false) : setOpenInCreate(true);
                        }
                    },
                    {
                        tooltip: 'Remove All Cars',
                        icon: tableIcons.Delete,
                        isFreeAction: true,
                        disabled: lockDelete,
                        onClick: () => {
                            if (!cars.length) {
                                return;
                            }
                            setOpenImportantAlert(true);
                            setLockDelete(true);
                            setTimeout(() => {
                                setOpenImportantAlert(false);
                                setLockDelete(false);
                            }, 3000);
                        }
                    }
                ]}
                editable={{
                    onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            dispatch(removeCarById(oldData.tableData.id))
                            resolve();
                        }),
                }}
                options={{
                    draggable: false,
                }}
            />
        </div>
    );
}