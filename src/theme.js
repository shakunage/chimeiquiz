import { createTheme } from '@material-ui/core/'

const theme = createTheme({
    typography: {
        subtitle1: {
            fontFamily: [
                'ヒラギノ明朝 ProN', 
                'Hiragino Mincho ProN', 
                '游明朝',
                '游明朝体',
                'YuMincho',
                'Yu Mincho', 
                'ＭＳ 明朝',
                'MS Mincho',
                'Droid Sans Japanese'
            ].join(','),
            fontSize: 32
        }
      },
    palette: {
        background: {
            default: "#f8f1db"
        },
        primary: {
            main:'#b20000'
        },
        secondary: {
            main: '#7cd1cd'
        },
        warning: {
            main: '#b20000'
        }
    },
  });

export default theme;