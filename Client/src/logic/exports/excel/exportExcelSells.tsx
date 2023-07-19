import ExcelJS from 'exceljs';
import { IParams } from '../../../types/Params';
import { DateSell, ISell, ISells } from '../../../types/Sells';
import { IProducts } from '../../../types/Products';
import { IStores } from '../../../types/Stores';
import { product } from '../../RecieveProduct';
import { sellRecieve } from '../../RecieveSell';
import { GetDate } from '../../GetDate';
import { store } from '../../RecieveStore';
let j = 0
export const exportExcelFileSells = (sell: ISells[], products: IProducts[], stores: IStores[], sellTotalPrice: ISell[], sellDate: DateSell[]) => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("My Sheet");
    sheet.properties.defaultRowHeight = 20;

    for (let i = 1; i <= 6; i++) {
        const cell = sheet.getCell(1, i);
        cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "D14D72" },
        }
        cell.font = {
            bold: true,
            size: 16,
            color: { argb: "FFFFFF" }
        }
    }

    sheet.columns = [
        {
            header: "Nº",
            key: 'N',
            width: 5
        },
        {
            header: "Producto",
            key: 'producto',
            width: 25
        },
        {
            header: "Cantidad",
            key: 'cantidad',
            width: 15
        },
        {
            header: "Precio Total",
            key: 'precioTotal',
            width: 17
        },
        {
            header: "Fecha Hora",
            key: 'fechaHora',
            width: 25
        },
        {
            header: "Tienda",
            key: 'tienda',
            width: 15
        },
    ];

    sell.map(sells_sing => {
        sheet.addRow({
            N: j,
            producto: product(sells_sing.product_id, products),
            cantidad: sells_sing.quantity,
            precioTotal: `S/.${sellRecieve(sells_sing.sell_id, sellTotalPrice)?.toFixed(2)}`,
            fechaHora: GetDate(sellDate, sells_sing.sell_id),
            tienda: store(sells_sing.store_id, stores)
        })
        j++;
    });

    sheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            cell.alignment = { horizontal: 'left' };
            cell.border = {
                top: { style: 'thin', color: { argb: '000000' } },
                left: { style: 'thin', color: { argb: '000000' } },
                bottom: { style: 'thin', color: { argb: '000000' } },
                right: { style: 'thin', color: { argb: '000000' } }
            }
        });
    });

    workbook.xlsx.writeBuffer().then((data: ArrayBuffer) => {
        const blob = new Blob([data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet",
        });
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = 'report ventas.xlsx';
        anchor.click();
        window.URL.revokeObjectURL(url);
    })
}