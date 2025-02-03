import moment from "moment";

export const formattedDate=(dateString:string,format:string = 'DD-MM-YYYY')=>{
  return moment(dateString).format(format);

}