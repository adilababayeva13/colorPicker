import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import copy from 'copy-to-clipboard';
const useStyles = makeStyles ({
    box: {
    display: 'flex',
    float: 'left',
    width: '210px',
    height: '210px',
    cursor: 'pointer',
    display: "flex",
    margin:"5px",
    justifyContent: "center",
    alignItems: "center",
    boxShadow:"10px 20px 20px gray",
    borderRadius:"10px"
    },
  });
function Box(props){
    const classes = useStyles();
    const [copiedVal ,setCopiedVal] =useState(false);
const copied = () =>{
    setCopiedVal(true);
    copy(props.background);
    setTimeout(() => {
        setCopiedVal(false)
    }, 1000);

}
 return (
        <React.Fragment>
        <div>
{(copiedVal)?<div className={classes.box}><h1 style={{color:props.background}}>Copied</h1></div>:<div onClick={copied} className={classes.box} style={{backgroundColor:props.background}}><h2>{props.name}</h2></div>}
       </div>
      
        </React.Fragment>
        )

}

export default Box;