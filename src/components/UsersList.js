import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import MaterialTable from 'material-table';
import {Alert} from "@material-ui/lab";
import {Button} from "@material-ui/core";
import Collapse from '@material-ui/core/Collapse';
import {deleteAllUsers, removeUserById} from "../redux/actions";
import UserInfo from "./UserInfo";
import UserCreationForm from "./UserCreationForm";
import {userBinder} from "../Objects/User";
import {tableIcons} from '../MaterialTable/tableIcons';
import {makeColumns} from '../MaterialTable/makeColumns';

export function UsersList() {
    const dispatch = useDispatch();

    const users = useSelector(state => state.users);

    const [openInCreate, setOpenInCreate] = useState(false);

    const [openImportantAlert, setOpenImportantAlert] = useState(false);
    const [lockDelete, setLockDelete] = useState(!users.length);

    const [openInfoAlert, setOpenInfoAlert] = useState(false);
    const [infoAlert, setInfoAlert] = useState(null);

    function closeCreationForm() {
        setOpenInCreate(false);
    }

    function onUserCreated() {
        setInfoAlert(
            <Alert severity="info" className="p-2 font-weight-bold">
                User successfully created!
            </Alert>
        );
        setOpenInfoAlert(true);
        setTimeout(() => {
            setOpenInfoAlert(false);
        }, 3000);
    }

    function onUserEdited() {
        setInfoAlert(
            <Alert severity="info" className="p-2 font-weight-bold">
                User successfully edited!
            </Alert>
        );
        setOpenInfoAlert(true);
        setTimeout(() => {
            setOpenInfoAlert(false);
        }, 3000);
    }

    return (
        <div className={"users_list mt-3"}>
            <div className="alert_container mb-2">
                <div className="alert_important_container">
                    <Collapse in={openImportantAlert}>
                        <Alert severity={"error"}>
                            Are you sure you want to delete ALL USERS?
                            <div className="alert_button_container d-flex mt-2">
                                <Button className="mr-3" variant="outlined" color="primary"
                                        onClick={() => {
                                            setOpenImportantAlert(false);
                                            dispatch(deleteAllUsers());
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
            <div className="user_creation_container">
                <Collapse in={openInCreate}>
                    <UserCreationForm onFormSubmit={onUserCreated} onFormCancel={closeCreationForm}/>
                </Collapse>
            </div>
            <MaterialTable
                title="User List"
                columns={makeColumns(userBinder.materialTableFields)}
                data={users}
                icons={tableIcons}
                onRowClick={(event, rowData, toggleDetailPanel) => toggleDetailPanel()}
                detailPanel={[
                    {
                        tooltip: "Show details",
                        render: rowData => {
                            const id = rowData.tableData.id;
                            const user = users[id];
                            return (
                                <div>
                                    <UserInfo user={user} id={id} handleUserEdit={onUserEdited}/>
                                </div>
                            );
                        }
                    }
                ]}
                actions={[
                    {
                        tooltip: 'Add User',
                        icon: tableIcons.Add,
                        isFreeAction: true,
                        onClick: () => {
                            openInCreate ? setOpenInCreate(false) : setOpenInCreate(true);
                        }
                    },
                    {
                        tooltip: 'Remove All Users',
                        icon: tableIcons.Delete,
                        isFreeAction: true,
                        disabled: lockDelete,
                        onClick: () => {
                            if (!users.length) {
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
                            dispatch(removeUserById(oldData.tableData.id))
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