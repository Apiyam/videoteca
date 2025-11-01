import { listItemButtonClasses } from "@mui/joy";

export const  listPalette = (theme: any) => {
    return {
        // Gatsby colors
        '--joy-palette-primary-plainColor': '#8a4baf',
        '--joy-palette-neutral-plainHoverBg': 'transparent',
        '--joy-palette-neutral-plainActiveBg': 'transparent',
        '--joy-palette-primary-plainHoverBg': 'transparent',
        '--joy-palette-primary-plainActiveBg': 'transparent',
        [theme.getColorSchemeSelector('dark')]: {
          '--joy-palette-text-secondary': '#fff',
          '--joy-palette-primary-plainColor': '#fff',
        },
        '--List-insetStart': '32px',
        '--ListItem-paddingY': '0px',
        '--ListItem-paddingRight': '16px',
        '--ListItem-paddingLeft': '21px',
        '--ListItem-startActionWidth': '0px',
        '--ListItem-startActionTranslateX': '-50%',
        [`& .${listItemButtonClasses.root}`]: {
          borderLeftColor: 'divider',
        },
        [`& .${listItemButtonClasses.root}.${listItemButtonClasses.selected}`]: {
          borderLeftColor: 'currentColor',
        },
      }
}