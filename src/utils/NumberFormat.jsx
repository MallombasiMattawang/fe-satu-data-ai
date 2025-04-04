//money thousands
export default function numberFormat(number) {
  let val = (number / 1).toFixed(2).replace(".", ",");
  
  // Cek apakah angka tersebut adalah bilangan bulat
  if (number % 1 === 0) {
    val = (number / 1).toFixed(0).replace(".", ",");
  }

  return "" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
