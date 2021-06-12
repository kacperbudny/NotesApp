import React from 'react'
import ChangeColorButton from './ChangeColorButton'
import colors from '../../utils/colors'

const ColorPalette = () => {
    return (
        <div className="color-palette">
          <ChangeColorButton/>
          <ChangeColorButton color={colors.red}/>
          <ChangeColorButton color={colors.orange}/>
          <ChangeColorButton color={colors.yellow}/>
          <ChangeColorButton color={colors.green}/>
          <ChangeColorButton color={colors.blue}/>
          <ChangeColorButton color={colors.purple}/>
          <ChangeColorButton color={colors.pink}/>
        </div>
    )
}

export default ColorPalette
