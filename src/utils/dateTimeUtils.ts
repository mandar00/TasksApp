import moment from "moment";

export const formattedDate=(dateString:string,format:string = 'MM-DD-YYYY')=>{
  return moment(dateString).format(format);

}