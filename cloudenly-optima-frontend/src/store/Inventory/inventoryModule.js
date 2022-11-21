
import stock from  "./stock";
import materialRequest from "./materialRequest";
import materialReturn from "./materialReturn";
import grn from './grn'



export default {
    namespaced: true,
    modules : {
      stock : stock,
      materialRequest: materialRequest,
      materialReturn: materialReturn,
      grn: grn
    }
};


