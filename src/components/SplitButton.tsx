import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

interface mySearch{
    len: number
    value: string
    opc: string
}

interface PropSplitButton{
    options: string[]
    name: string
    handle: (newSelect: mySearch) => void
}

export default function SplitButton(prop: PropSplitButton) {
  let {options, handle, name} = prop
  options = [(name)].concat(options)

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleClick = () => {
    // console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number,
  ) => {
    handle({len: options[index].length, value: options[index], opc: name})
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button"
      sx={{
        border:"none",
        padding:"10px 20px",
        borderRadius:"100px",
        boxShadow:"none",
      }}
      
      >
        <Button onClick={handleClick} 
        sx={{
            display:"block",                        
            padding:"10px 20px",
            borderRadius:"100px",
            color:"#fff",
            border:"none",
            background:"black",
            cursor:"pointer",
            transition:".3s ease all",
            boxShadow:"none",
            ":hover": {
                background:"DarkGrey",
            }
        }}
        >{options[selectedIndex]}</Button>
        <Button
            sx={{
              display:"block",
              padding:"10px 10px",
              borderRadius:"100px",
              color:"#fff",
              border:"none",
              background:"black",
              cursor:"pointer",
              // marginLeft:"20px",
              transition:".3s ease all",
              ":hover": {
                  background:"DarkGrey",
              }
          }}
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      // disabled={index === 2 || index === 3}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}