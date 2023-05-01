import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FavoriteList.css";
import { GrFormView, GrEdit } from "react-icons/gr";
import { AiFillDelete } from "react-icons/ai";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function FavoriteList() {
  const myPackages = JSON.parse(localStorage.getItem("listData"));
 
  const [list, setList] = useState(myPackages);
  const [view, setView] = useState("");
  // const [textArea, setTextArea] = useState('')
  const [hide, setHide] = useState(true);
  const [disabled, setDisabled] = useState(true);

  const navigate = useNavigate();
  // console.log(list.name);

  /*   MUI  */
console.log(list);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function handleDelete(name) {
    if (myPackages.length !== 1) {
      const deleted = list.filter((item) => name !== item);
      localStorage.setItem("listData", JSON.stringify(deleted));
      setOpen(false);
      setList(deleted);
    } else {
      const deleted = list.filter((item) => name !== item);
      setOpen(false);
      setList(deleted);

      localStorage.removeItem("listData");
    }
  }

  function handleView(name) {
    setView(name.message);
  }

  function handleEdit() {
    setHide(false);
  }

  function handleTextArea(e,name) {
    setView(e.target.value);
    setDisabled(false);
    console.log(name);
  }

  function handleEditeSave(view) {
   
    // const packagename = myPackages.find(user => user.message === view )
    setView(list.message)
    
    // console.log(packagename.name);
    // console.log(view);
    // alert('Your message has been updated')
    // setView('')
    // setHide(true)
    
  }

  return (
    <div className="main_div_list">
      <div className="head">
        <h1>Welcome to Favorite NPM Packages</h1>
        {list && (
          <button className="addbtn" onClick={() => navigate("/")}>
            Add more
          </button>
        )}
      </div>
      {list ? (
        <div className="mapTable">
          <table>
            <thead>
              <tr>
                <th>Package Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((name, index) => {
                return (
                  <tr key={index}>
                    <td>{name.name}</td>

                    <td>
                      <div className="icn">
                        <GrFormView
                          className="icons"
                          onClick={() => handleView(name)}
                        />
                        <GrEdit className="icons" onClick={handleEdit} />

                        <AiFillDelete
                          className="icons"
                          onClick={handleClickOpen}
                        />

                        <Dialog
                          fullScreen={false}
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="responsive-dialog-title"
                        >
                          <DialogTitle id="responsive-dialog-title">
                            {"Are you sure you want to delete?"}
                          </DialogTitle>

                          <DialogActions>
                            <Button
                              sx={{
                                backgroundColor: "red",
                                color: "white",
                                ":hover": { backgroundColor: "red" },
                              }}
                              onClick={handleClose}
                            >
                              Cancle
                            </Button>
                            <Button
                              sx={{
                                backgroundColor: "green",
                                color: "white",
                                ":hover": { backgroundColor: "green" },
                              }}
                              onClick={() => handleDelete(name)}
                            >
                              yes
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="noList">
          <p>You don't have any favorite package yet. Please add</p> <br />
          <div>
            <button className="addbtn" onClick={() => navigate("/")}>
              Add
            </button>
          </div>
        </div>
      )}

      {view && (
        <div className="mapTable">
          <h4> favorite..</h4>
        
          <textarea 
            value={view}
            name={list.name}
            cols="70"
            rows="5"
            disabled={hide}
            onChange={handleTextArea}
          ></textarea>
          <div>
            <Button
              sx={{ display: hide ? "none" : "unset" }}
              disabled={disabled}
              variant="contained"
              onClick={()=>handleEditeSave(view)}
            >
              Save
            </Button>
           
          </div>
        
        </div>
      )}
    </div>
  );
}
