import React, { useRef,useState } from 'react';
import { ChromePicker } from 'react-color';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles ({
    colorpicker: {
     margin:"20px auto"
    },
    inpt:{
        width:"70%",
        margin:"20px auto"
    },
    btn:{
        width:"70%",
        margin:"15px auto"
    }
  });
function ColorPicker(props){
    const {colorpicker,inpt,btn} = useStyles();
    const [backgroundColor, setBackgroundColor] = useState('#fff');
    const refInput = useRef();

   const handleChangeComplete = (color) => {
        setBackgroundColor(color.hex);
      };
 const handleBtn = () => {
     var val=refInput.current.value;
    props.makeBoxes(backgroundColor,val);
    refInput.current.value="";
 }
    return (
        <React.Fragment>
            <ChromePicker
            color={ backgroundColor }
            onChangeComplete={ handleChangeComplete }
            className={ colorpicker}
            />
            
       <Input 
      inputRef={refInput}
       className={inpt}
       placeholder="Color Name"
      
       />

       
       <Button onClick={handleBtn} className={btn} variant="contained" style={{backgroundColor:backgroundColor}}>Add color 💀</Button>
        </React.Fragment>
    )

}

export default ColorPicker;