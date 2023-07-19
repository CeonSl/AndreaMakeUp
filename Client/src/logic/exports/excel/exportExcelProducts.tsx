import ExcelJS from 'exceljs';
import { IProducts } from '../../../types/Products';
import { category } from '../../RecieveCategory';
import { store } from '../../RecieveStore';
import { IStores } from '../../../types/Stores';
import { IParams } from '../../../types/Params';
const baseUrlServer = import.meta.env.VITE_LARAVEL_SERVER_BASE_URL
let j = 0
export const exportExcelFileProducts = (products: IProducts[], stores: IStores[], categories: IParams[]) => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("My Sheet");
    sheet.properties.defaultRowHeight = 20;

    for (let i = 1; i <= 7; i++) {
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
            header: "Nombre",
            key: 'nombre',
            width: 25
        },
        {
            header: "Categoria",
            key: 'categoria',
            width: 15
        },
        {
            header: "Precio",
            key: 'precio',
            width: 15
        },
        {
            header: "Cantidad",
            key: 'cantidad',
            width: 15
        },
        {
            header: "Tienda",
            key: 'tienda',
            width: 20
        },
        {
            header: "Imagen",
            key: 'imagen',
            width: 90
        },
    ];



    products.map(product => {
        sheet.addRow({
            N: j,
            nombre: product.name,
            categoria: category(product.category_id, categories),
            precio: `S/.${product.price.toFixed(2)}`,
            cantidad: product.stock,
            tienda: store(product.store_id, stores),
            imagen: {
                text: product.img.split('.').shift()?.split('/').pop(),
                hyperlink: `${baseUrlServer}/${product.img}`
            }
        })
        j++;
    });

    for (let i = 2; i <= j+1; i++) {
        const cell = sheet.getCell(i, 7);
        cell.font = {
            bold: true,
            color: { argb: "3366cc" },
            underline: true
        }
    }

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
        anchor.download = 'report productos.xlsx';
        anchor.click();
        window.URL.revokeObjectURL(url);
    })
}