import React from 'react';
import clsx from 'clsx';
import ColorPicker from './ColorPicker';
import Box from './Box';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const drawerWidth = 350;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
        margin: theme.spacing(1),
      },
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  errorMessage:{
    backgroundColor:'#f6afaf',
    width:"90%",
    margin:"5px auto",
    color:"red",
    padding:"10px",
    fontSize:"18px",
    borderRadius:"15px"

  }


}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [boxes, setBoxes] = React.useState([]);
  const [boxname, setBoxname] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState('');
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

const generate = () => {
   return ( boxes.map((e,index)=>{
        return (
            <Box background={e} name={boxname[index]} key={`${e}-${index}`}/>
        )
     }));
};

  const makeBoxes = (color, colorname) => {

    if(!(colorname)){
      setErrorMessage("Please write the colorname");
      setTimeout(()=>{
        setErrorMessage("");
       },3000)
    }
    else if(boxes.includes(color)){
      setErrorMessage("This color exists");
      setTimeout(()=>{
        setErrorMessage("");
       },3000)
    }
    else if(boxname.includes(colorname)){
      setErrorMessage("This colorname exists");
      setTimeout(()=>{
        setErrorMessage("");
       },3000)
    }
    else{

      if(boxes.length<10){
        const colors=[...boxes];
        colors.push(color);
        const names=[...boxname];
        names.push(colorname);
        setBoxes(colors);
        setBoxname(names);
        generate();
      }
      else {
        setErrorMessage("You can only add 10 colors.");
        setTimeout(()=>{
          setErrorMessage("");
         },3000)
      }

    }

   };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
          Color Picker
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <div>{errorMessage? <div className={classes.errorMessage} >
        <i class="fa fa-exclamation-circle" style={{marginRight:"7px"}} aria-hidden="true"></i>
          {errorMessage}</div> : null}</div>
       
        <Divider />
        <ColorPicker makeBoxes={makeBoxes}/>
        <Divider />

      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />

         {generate()}

      </main>
    </div>
  );
}