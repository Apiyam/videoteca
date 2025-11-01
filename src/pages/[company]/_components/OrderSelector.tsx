import * as React from 'react';
import MenuButton from '@mui/joy/MenuButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import Dropdown from '@mui/joy/Dropdown';

export default function OrderSelector() {
  return (
    <Dropdown >
      <MenuButton 
        variant="plain"
        color="primary"
        endDecorator={<ArrowDropDown />}
        sx={{ whiteSpace: 'nowrap', marginTop: "-50px" }}
      >
        Ordenar por
      </MenuButton>
      <Menu sx={{ minWidth: 120 }}>
        <MenuItem>Precio</MenuItem>
        <MenuItem>Peso</MenuItem>
      </Menu>
    </Dropdown>
  );
}
