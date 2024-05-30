export interface NgTableRow {
    // colName: Identificador de la columna
    colName: string;
    // type: Tipo de columna.
    //     checkbox col a 5% width
    //     text: col automatica | textxSmall: col a 15% width | textSmall: col a 20% width
    //     textMedium: col a 40% width | textLarge: col a 60% width
    //     date con formato 'dd/MM/YYY' | currency | icon-link | icon
    type:    string;
    // icon: Nombre del icono a mostrar
    icon?:    string;
    // data: Valor a mostrar
    data:    string; 
    // align: Alineación del texto. 
    //     left | center | right
    align:   string; 
}